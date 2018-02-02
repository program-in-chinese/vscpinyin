

import { 系统 } from "./系统";

let 启用日志 = true;

let 写日志 = (function () {
    if (!启用日志) {
        return function () { }
    }
    let 开始 = true
    let 文件名 = 系统.结合路径(系统.临时目录(), "cts_扩展", "cts_拼音输入法日志.log")
    return function log(日志内容: string) {
        if (开始) {
            开始 = false
            系统.写文件(文件名, 格式化现在时间() + " : " + 日志内容 + 系统.新行)
            return
        }
        系统.追写文件(文件名, 格式化现在时间() + " : " + 日志内容 + 系统.新行)
    }
})()

function 格式化现在时间() {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

export =写日志