
import { 创建对象 } from "./工具"
import { 节点映射 } from "./类型枚举"
import { 系统 } from "./系统"

export enum 位置码 {
    B = 0,
    E = 1,
    M = 2,
    S = 3,
    Sum = 4
}

interface 频率统计 {
    最大: number
    平均: number
    最小: number
    总数: number
    总和: number
}

/* @internal */
export interface HMM模型 {
    开始概率: Array<number>
    反向概率: Array<Array<number>>
    输出概率表: Array<节点映射<number>>
    取输出概率(映射: 节点映射<number>, 键: number, 最小数?: number): number
    频率统计信息: 频率统计[]
}

let 频率统计信息: 频率统计[] = []


/* @internal */
export function 创建HMM模型(HMM词典路径: string): HMM模型 {
    try {
        if (!当前内容) {
            当前内容 = (系统.读文件(HMM词典路径) as string).replace(/(\n\r|\n)/g, "\n").split("\n")
        }

    } catch (e) {
        throw ("HMM词典数据内容丢失")
    }

    if (!当前内容) {
        throw ("HMM词典数据内容丢失")
    }

    加载模块()

    return {
        开始概率,
        反向概率,
        输出概率表,
        取输出概率,
        频率统计信息
    }

}


let 当前内容: string[]
let i = 0
let 行文本: string = ""

function 下行() {

    function 取行() {
        行文本 = 当前内容[i]
        i++
        return 行文本

    }

    while (取行()) {

        行文本 = 行文本.trim()

        if (!行文本) {
            continue
        }

        if (行文本.indexOf("#") !== -1) {
            continue
        }

        return true

    }

    return false
}

const 开始概率: Array<number> = []
const 反向概率: Array<Array<number>> = []
const 输出概率B: 节点映射<number> = 创建对象()
const 输出概率E: 节点映射<number> = 创建对象()
const 输出概率M: 节点映射<number> = 创建对象()
const 输出概率S: 节点映射<number> = 创建对象()
const 输出概率表: Array<节点映射<number>> = [输出概率B, 输出概率E, 输出概率M, 输出概率S]

function 加载模块() {

    let 临时: string[]
    if (!下行()) {
        throw ("HMM词典数据内容加载,出现错误. ")
    }

    临时 = 行文本.split(" ")

    if (临时.length !== 位置码.Sum) {
        throw ("HMM词典数据内容加载,出现错误. ")

    }

    for (let j = 0; j < 临时.length; j++) {

        if (isNaN(+临时[j])) {
            throw ("HMM词典数据内容出现错误. ")

        }
        开始概率[j] = +临时[j]

    }

    for (let i = 0; i < 位置码.Sum; i++) {

        if (!下行()) {

            throw ("HMM词典数据内容加载,出现错误. ")

        }
        临时 = 行文本.split(" ")
        if (临时.length !== 位置码.Sum) {

            throw ("HMM词典数据内容加载,出现错误. ")

        }

        反向概率[i] = []
        for (let j = 0; j < 位置码.Sum; j++) {

            if (isNaN(+临时[j])) {
                throw ("HMM词典数据内容出现错误. ")

            }

            反向概率[i][j] = +临时[j]
        }
    }

    if (!下行()) {
        throw ("HMM词典数据内容加载,出现错误. ")

    }

    加载输出概率(行文本, 输出概率B, 位置码.B)

    if (!下行()) {

        throw ("HMM词典数据内容加载,出现错误. ")

    }

    加载输出概率(行文本, 输出概率E, 位置码.E)

    if (!下行()) {

        throw ("HMM词典数据内容加载,出现错误. ")

    }

    加载输出概率(行文本, 输出概率M, 位置码.M)

    if (!下行()) {
        throw ("HMM词典数据内容加载,出现错误. ")

    }

    加载输出概率(行文本, 输出概率S, 位置码.S)

    if (!(开始概率 && 开始概率.length || 反向概率 && 反向概率.length
        || 输出概率B || 输出概率E || 输出概率M || 输出概率S)) {
        throw ("HMM词典数据内容加载,出现错误. ")

    }
}

function 加载输出概率(行文本: string, 映射: 节点映射<number>, 编号 = 位置码.B) {
    if (!行文本) {
        return false
    }
    let 统计: 频率统计 = 创建对象()

    统计.总和 = 0
    统计.最大 = _最小数字
    统计.最小 = 0

    let 临时 = 行文本.split(",")
    统计.总数 = 临时.length

    for (let i = 0; i < 临时.length; i++) {

        let 临时1 = 临时[i].split(":")

        if (临时1.length !== 2) {
            return false
        }
        let 频率 = +临时1[1]

        映射[临时1[0].charCodeAt(0)] = 频率
        if (频率 > 统计.最大) {
            统计.最大 = 频率
        } else if (频率 < 统计.最小) {
            统计.最小 = 频率
        }
        if (频率 != _最小数字) 统计.总和 += 频率

    }

    统计.总和 = Math.abs(统计.总和)
    统计.平均 = 统计.总和 / 统计.总数
    频率统计信息[编号] = 统计
    return true
}

const _最小数字 = -3.14e+100

function 取输出概率(当前映射: 节点映射<number>, 键: number, 最小数 = _最小数字) {
    return 当前映射["" + 键] || 最小数
}
