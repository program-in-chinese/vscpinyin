

import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import * as 进程 from './进程'
import { 读消息 } from './消息连接池'
import { window, CancellationToken, MessageItem, EventEmitter, Event, commands } from 'vscode'
import 日志 from './日志'
import * as is from './工具'
import { 进程通信 } from "./进程"

export interface 库内词 {
    文本: string
    频率: number
    拼音: string
}
interface 声母{
    文本:string
}

interface 韵母 {
    文本: string
}
interface 三拼无音韵母 extends 韵母 { }

interface 三拼韵母 extends 韵母 { }

export interface 拼音 {
    文本: string
    声母?: 声母
    韵母?: 韵母 | [三拼无音韵母, 三拼韵母]
    可分割?: boolean
    可拆分?: number
}

export interface 拼音验证结果 {
    py1: 拼音[]
    py2: 拼音[]
    包含简拼: boolean
    全为简拼: boolean
}

export type 拼音输入法请求参数 = string
export type 取汉字拼音参数 = string
export type 保存用户词典参数 = string
export type 拼音输入法输出 = 库内词[]
export type 取汉字拼音输出 = string
export type 保存用户词典输出 = boolean

export interface 请求对象 {
    序号: number
    类型: string
    命令: string | "拼音输入法" | "取汉字拼音" | "保存用户词典"|"验证拼音"
    参数?: 拼音输入法请求参数 | 取汉字拼音参数 | 保存用户词典参数
}
export interface 节点映射<T> {
    [x: string]: T
}


export interface 数据结果 {
    内容?: 节点映射<string> | boolean | 库内词[]|拼音验证结果
    消息?: string
    命令?: string
    请求序号?: number
    成功?: boolean

}

interface 请求项 {
    请求: 请求对象
    预设: Promise<any> | null
    回调: 回调项 | null
}

interface 回调项 {
    成功: (值: any) => void
    失败: (错误: any) => void
    开始: number
}

class 回调映射 {
    private readonly 回调集: Map<number, 回调项> = new Map()
    public 等待数量: number = 0

    public 清除(错误: any): void {
        for (const 回调 of this.回调集.values()) {
            回调.失败(错误)
        }
        this.回调集.clear()
        this.等待数量 = 0
    }

    public 添加(序号: number, 回调: 回调项) {
        this.回调集.set(序号, 回调)
        ++this.等待数量
    }

    public 消耗(序号: number): 回调项 | undefined {
        const 回调 = this.回调集.get(序号)
        this.删除(序号)
        return 回调
    }

    private 删除(序号: number) {
        if (this.回调集.delete(序号)) {
            --this.等待数量
        }
    }

}

interface 请求项 {
    请求: 请求对象
    预设: Promise<any> | null
    回调: 回调项 | null
}

class 请求队列 {
    private 请求组: 请求项[] = []
    private 总序号数: number = 0

    public get 长度(): number {
        return this.请求组.length
    }

    public 压入(项: 请求项): void {
        this.请求组.push(项)
    }

    public 挤出(): 请求项 | undefined {
        return this.请求组.shift()
    }

    public 尝试取消挂起请求(序号: number): boolean {
        for (let i = 0; i < this.请求组.length; i++) {
            if (this.请求组[i].请求.序号 === 序号) {
                this.请求组.splice(i, 1)
                return true
            }
        }
        return false
    }

    public 创建请求(命令: string, 参数集: any): 请求对象 {
        return {
            序号: this.总序号数++,
            类型: 'request',
            命令: 命令,
            参数: 参数集
        }
    }

}

export class 拼音输入法客户端 {

    public readonly 服务日志: 日志 = new 日志()
    private 服务预设: Thenable<SocketIOClient.Socket> | null
    private 第一个错误: Error | null
    private 最后启动时间: number
    private 启动重复数量: number
    private 是正在重启: boolean = false

    private 请求队列: 请求队列
    private 回调集: 回调映射

    private readonly _正在启动服务 = new EventEmitter<void>()

    constructor(private 模块路径: string) {

        this.最后启动时间 = Date.now()
        this.服务预设 = null
        this.第一个错误 = null
        this.启动重复数量 = 0

        this.请求队列 = new 请求队列()
        this.回调集 = new 回调映射()

        this.开始运行服务()

    }

    public dispose() {
        if (this.服务预设) {
            this.服务预设.then(s => {
                s.close()
            })
        }
        return
    }

    get 正在启动服务(): Event<void> {
        return this._正在启动服务.event
    }

    private 信息(消息: string, 数据?: any): void {
        this.服务日志.消息(消息, 数据)
    }

    public 警告(消息: string, 数据?: any): void {
        this.服务日志.警告(消息, 数据)
    }

    private 错误处理(消息: string, 数据?: any): void {
        this.服务日志.错误(消息, 数据)
    }

    private 服务(): Thenable<SocketIOClient.Socket> {
        if (this.服务预设) {
            return this.服务预设
        }
        if (this.第一个错误) {
            return Promise.reject<SocketIOClient.Socket>(this.第一个错误)
        }
        this.开始运行服务()
        
        if (this.服务预设) {
            return this.服务预设
        }

        return Promise.reject<SocketIOClient.Socket>(new Error('未能创建拼音输入法服务. '))
    }

    private 开始运行服务(发送模式: boolean = false): Thenable<SocketIOClient.Socket> {

        return this.服务预设 = new Promise<SocketIOClient.Socket>((成功, 失败) => {

            this.请求队列 = new 请求队列()
            this.回调集 = new 回调映射()
            this.第一个错误 = null

            try {
                const 选项集: 进程.进程选项 = {
                    execArgv: [] // [`--debug-brk=5859`]
                }

                进程.创建进程(this.模块路径, [], 选项集, this.服务日志, (错误: any, 子进程: SocketIOClient.Socket | null) => {

                    if (错误 || !子进程) {
                        this.第一个错误 = 错误
                        this.错误处理('拼音服务器启动失败. ', 错误)
                        window.showErrorMessage('拼音扩展服务器启动失败. ')
                        return
                    }

                    this.信息('拼音扩展服务器成功启动. ')
                    this.最后启动时间 = Date.now()
                    子进程.on("接收结果", (data: 数据结果) => {
                        this.处理消息(data)

                    })
                    成功(子进程)

                    this._正在启动服务.fire()

                })
            } catch (err) {
                失败(err)
            }
        })

    }

    public 执行命令(命令: string, 参数集: any, 执行结果或取消令牌?: boolean | CancellationToken): Promise<any> {
        let 取消令牌: CancellationToken | undefined = undefined
        let 执行结果 = true
        if (typeof 执行结果或取消令牌 === 'boolean') {
            执行结果 = 执行结果或取消令牌
        } else {
            取消令牌 = 执行结果或取消令牌
        }

        const 请求实例 = this.请求队列.创建请求(命令, 参数集)
        
        const 请求信息: 请求项 = {
            请求: 请求实例,
            预设: null,
            回调: null
        }

        let 结果: Promise<any> = Promise.resolve(null)
        if (执行结果) {
            let 取消了 = false
            结果 = new Promise<any>((成功, 失败) => {
                请求信息.回调 = { 成功, 失败, 开始: Date.now() }
                if (取消令牌) {
                    取消令牌.onCancellationRequested(() => {
                        取消了 = true
                        this.尝试取消请求(请求实例.序号)
                    })
                }
            }).catch((err: any) => {
                if (!取消了) {
                    this.错误处理(`'${命令}' 请求失败,错误消息为:${JSON.stringify(err)}`)
                }
                throw err
            })
        }

        请求信息.预设 = 结果
        this.请求队列.压入(请求信息)
        this.发送下个请求()

        return 结果
    }
    
    private 发送下个请求(): void {
        while (this.回调集.等待数量 === 0 && this.请求队列.长度 > 0) {
            const 项 = this.请求队列.挤出()
            if (项) {
                this.发送请求(项)
            }
        }
    }

    private 发送请求(请求: 请求项): void {
        const 服务请求 = 请求.请求

        if (请求.回调) {
            this.回调集.添加(服务请求.序号, 请求.回调)
        }
        this.服务()
            .then((子进程) => {
                子进程.emit(服务请求.命令, 服务请求)
            })
            .then(undefined, err => {
                const 回调 = this.回调集.消耗(服务请求.序号)
                if (回调) {
                    回调.失败(err)
                }
            })
    }

    private 尝试取消请求(序号: number): boolean {
        try {
            if (this.请求队列.尝试取消挂起请求(序号)) {
                return true
            }
            return false
        } finally {
            const p = this.回调集.消耗(序号)
            if (p) {
                p.失败(new Error(`取消请求 ${序号}`))
            }
        }
    }

    private 处理消息(消息: 数据结果): void {
        try {
            const 响应结果: 数据结果 = 消息
            const p = this.回调集.消耗(响应结果.请求序号)
            if (p) {
                if (响应结果.成功) {
                    p.成功(响应结果)
                } else {
                    p.失败(响应结果)
                }
            }

        } finally {
            this.发送下个请求()

        }

    }

}
