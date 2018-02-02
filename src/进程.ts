/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path = require('path')
import os = require('os')
import fs = require("fs")
import net = require('net')
import cp = require('child_process')
import stream = require("stream")
import ioc = require("socket.io-client")
import enc = require("encoding")

export interface 进程选项 {
	cwd?: string
	execArgv?: string[]
}

let 管道文件目录 = path.join(os.tmpdir(), "cts_扩展");
let 管道文件全名 = path.join(os.tmpdir(), "cts_扩展", "cts_管道交互文件.sock");

function 清空端口号交换文件内容() {
	if (!目录存在(管道文件目录)) {
		fs.mkdirSync(管道文件目录)
	}
	写文件(管道文件全名, "")
}

function 目录存在(路径: string) {
	try {
		const stat = fs.statSync(路径);
		return stat.isDirectory()

	} catch (e) {
		return false;
	}

}

function 文件存在(路径: string) {
	try {
		const stat = fs.statSync(路径);
		return stat.isFile()

	} catch (e) {
		return false;
	}

}

function 写文件(fileName: string, data: string, writeByteOrderMark?: boolean): void {
	// If a BOM is required, emit one
	if (writeByteOrderMark) {
		data = "\uFEFF" + data;
	}
	let fd: number;
	try {
		fd = fs.openSync(fileName, "w");
		fs.writeSync(fd, data, /*position*/ undefined, "utf8");
	}
	finally {
		if (fd !== undefined) {
			fs.closeSync(fd);
		}
	}
}

function 读管道交互文件(文件名: string) {
	if (!文件存在(文件名)) {
		return undefined;
	}
	const buffer = fs.readFileSync(文件名);
	return buffer.toString("utf8");
}

interface 管道交互文件 {
	端口: string,
	PID: string,
}

export interface 进程通信 {
	stdin: stream.Writable
	stdout: stream.Readable
	stderr: stream.Readable
	once(event: string, listener: Function): void
}

export function 创建进程(
	模块路径: string,
	参数: string[],
	选项: 进程选项,
	日志: any,
	回调: (错误: any, scoket: SocketIOClient.Socket | null) => void,
): void {

	let 取消回调 = false
	const 成功 = (结果: SocketIOClient.Socket) => {
		if (取消回调) {
			return
		}
		取消回调 = true
		回调(null, 结果)
	}

	const 失败 = (err: any) => {
		if (取消回调) {
			return
		}
		取消回调 = true
		回调(err, null)
	}

	let 子进程: 进程通信

	let 管道交互文件内容 = 读管道交互文件(管道文件全名)

	let soc:SocketIOClient.Socket

	function 服务已经启动() {
		if (管道交互文件内容) {
			let { 端口, PID } = <管道交互文件>JSON.parse(管道交互文件内容)
			try {
				let 命令 = process.platform == 'win32' ? 'tasklist' : 'ps aux'

				let 进程 = cp.execSync(命令)

				if (进程) {
					let 编码后 = enc.convert(进程, "utf8", "gbk").toString()

					let 分割 = 编码后.split('\n')
					for (let 分行 of 分割) {

						if (!分行.trim()) {
							continue
						}

						let p = 分行.trim().split(/\s+/)
						if (p.length < 2) {
							失败(true)
						}
						let pid = process.platform == 'win32' ? +p[1] : +p.shift()

						if (pid === +PID) {
							let { 端口 } = <管道交互文件>JSON.parse(管道交互文件内容)
							soc = ioc.connect(`http://localhost:${端口}`)
							return
						}
					}

				} else {
					失败(true)
				}
			} catch (err) {
				失败(err)
			}

		}
		清空端口号交换文件内容()		
		return

	}

	服务已经启动()

	if(!soc){
		子进程 = cp.spawn("node", [模块路径], {
			detached: true
		})

		子进程.stdout.once("data", (回传端口) => {

			soc = ioc.connect(`http://localhost:${回传端口}`)

			soc.on("error", (err) => {
				失败(err)
			})
			soc.on("connect", () => {
				成功(soc)
			})
			soc.on('disconnect', () => {
				失败(soc)
			})

		})

		子进程.once('error', (err) => {
			失败(err)
		})

	}else{

		soc.on("error", (err) => {
			失败(err)
		})
		soc.on("connect", () => {
			成功(soc)
		})
		soc.on('disconnect', () => {
			失败(soc)
		})

	}

}
