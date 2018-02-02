
import * as io from "socket.io"

import { 取汉字拼音, 拼音查词, 编译拼音组 } from "./拼音输入法输出";
import { 系统 } from "./系统";
import * as 写日志 from "./写日志";
import { 拼音验证结果, 库内词, 节点映射 } from "./类型枚举";
import { 存入用户输出记录索引, 加载输入记录索引, 加载词库索引, 保存输入记录, 加载停止词索引 } from "./数据库读取";

let 管道文件全名 = 系统.结合路径(系统.临时目录(), "cts_扩展", "cts_管道交互文件.sock");

process.title = "vsc_拼音输入法服务器"

interface 请求对象 {
    序号: number
    命令: string
    参数: any
}

interface 回复信息 {
    内容?: 节点映射<string> | boolean | 库内词[] | 拼音验证结果
    消息?: string
    命令?: string
    请求序号?: number
    成功?: boolean
}

function 退出(err:any) {
    if (err && err.message) {
        写日志("[错误]--" + err.message)
    } else if (err) {
        写日志("[退出]--进程退出了" + err.toString())
    } else {
        写日志("[退出]--进程退出了")
    }
    系统.写文件(管道文件全名, "")
    保存输入记录()
    process.exit(0)

}

async function 查找端口(端口: number): Promise<number> {

    function 循环检测(p: number) {
        return new Promise<boolean>((r, e) => {
            let 临时服务器 = 系统.创建服务().listen(p)

            临时服务器.on('listening', function () {
                临时服务器.close()
                r(true)
            })
            临时服务器.on('error', function (err:any) {
                e(err)
            })

        })
    }
    try {
        let 返回值 = await 循环检测(端口)
        if (返回值) {
            return 端口
        } else {
            端口++
            return 查找端口(端口)
        }
    } catch (e) {
        端口++
        return 查找端口(端口)
    }

}

let 连接 = io()

let 端口 = 查找端口(8896)

端口.then(p => {
    加载输入记录索引()
    加载词库索引()
    加载停止词索引()
    连接.listen(p)
    系统.写文件(管道文件全名, JSON.stringify({ 端口: p, PID: process.pid }))
    写日志("系统运行了")
    process.stdout.write("" + p)

}).catch(e => {
    退出(e)

})


连接.on('connection', (soc) => {

    写日志("连接进入了: " + soc.id)

    soc.on("取汉字拼音", (请求: 请求对象) => {

        const 回复: 回复信息 = {
            内容: null,
            命令: 请求.命令,
            请求序号: 请求.序号,
            成功: false,
        }
        try {
            let 结果 = 取汉字拼音(请求.参数, "",true)
            if (结果) {
                回复.内容 = 结果
                回复.成功 = true
            }
            
        } catch (err) {

        }
        soc.compress(false).emit("接收结果", 回复)

    })

    soc.on("拼音输入法", (请求: 请求对象) => {

        const 回复: 回复信息 = {
            内容: null,
            命令: 请求.命令,
            请求序号: 请求.序号,
            成功: false,
        }
        try {
            let 结果 = 拼音查词(请求.参数)
            if (结果) {
                回复.内容 = 结果
                回复.成功 = true
            } else {
                回复.内容 = null
                回复.成功 = true
            }
            soc.compress(false).emit("接收结果", 回复)

        } catch (err) {
            if (err && err.message) {
                回复.内容 = err.message
            }
            soc.compress(false).emit("接收结果", 回复)

        }

    })

    soc.on("保存用户词典", (请求: 请求对象) => {
        const 回复: 回复信息 = {
            内容: true,
            命令: 请求.命令,
            请求序号: 请求.序号,
            成功: true,
        }
        try {
            存入用户输出记录索引(请求.参数)
            回复.内容 = true
            回复.成功 = true
            soc.compress(false).emit("接收结果", 回复)
        } catch (err) {
            回复.内容 = false
            回复.成功 = false
            soc.compress(false).emit("接收结果", 回复)
        }
    })

    soc.on("验证拼音", (请求: 请求对象) => {
        const 回复: 回复信息 = {
            内容: null,
            命令: 请求.命令,
            请求序号: 请求.序号,
            成功: false,
        }

        let 结果 = 编译拼音组(请求.参数)
        if (结果) {
            回复.内容 = 结果
            回复.成功 = true
        }
        soc.compress(false).emit("接收结果", 回复)

    })

    soc.on("进程自杀", () => {
        退出(new Error("进程自杀"))

    })

    soc.on("error", (err) => {
        连接.local.compress(false).emit("error", err)
        退出(err)

    })

    soc.on("disconnect", () => {
        保存输入记录()
        写日志("连接离开了: " + soc.id)
    })

})

process.on("uncaughtException", (err) => {
    退出(err)

})

连接.on("error", (err:any) => {
    连接.local.compress(false).emit("error", err)
    退出(err)

})

process.on("exit", (code) => {
    退出(code)

})