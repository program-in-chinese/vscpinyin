'use strict'
import * as path from 'path'

import { ExtensionContext, commands } from 'vscode'

import { 拼音输入法客户端 } from './客户端'
import { 拼音输入法命令, 保存用户词典命令, 取汉字拼音命令, 验证拼音命令 } from './拼音输入法命令'

export function activate(上下文: ExtensionContext) {

	let 服务模块文件名 = 上下文.asAbsolutePath(path.join("vsc_pyserver\\lib\\pinyinserver"))
	const 客户端 = new 拼音输入法客户端(服务模块文件名);
	上下文.subscriptions.push(客户端)

	const 拼音输入法 = new 拼音输入法命令(客户端)

	上下文.subscriptions.push(commands.registerCommand(拼音输入法.命令id, 拼音输入法.执行命令, 拼音输入法))

	const 取汉字拼音 = new 取汉字拼音命令(客户端)
	上下文.subscriptions.push(commands.registerCommand(取汉字拼音.命令id, 取汉字拼音.执行命令, 取汉字拼音))

	const 保存用户词典 = new 保存用户词典命令(客户端)
	上下文.subscriptions.push(commands.registerCommand(保存用户词典.命令id, 保存用户词典.执行命令, 保存用户词典))	
	
	const 验证拼音 = new 验证拼音命令(客户端)
	上下文.subscriptions.push(commands.registerCommand(验证拼音.命令id, 验证拼音.执行命令, 验证拼音))	

}