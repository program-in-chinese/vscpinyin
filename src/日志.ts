/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { OutputChannel, window } from 'vscode';
import * as is from "./工具"

export default class 日志类 {
	private _输出: OutputChannel;
	
	private get 输出(): OutputChannel {
		if (!this._输出) {
			this._输出 = window.createOutputChannel('拼音输入法');
		}
		return this._输出;
	}

	private 数据转文本(数据: any): string {
		if (数据 instanceof Error) {
			if (is.string(数据.stack)) {
				return 数据.stack;
			}
			return (数据 as Error).message;
		}
		if (is.boolean(数据.success) && !数据.success && is.string(数据.message)) {
			return 数据.message;
		}
		if (is.string(数据)) {
			return 数据;
		}
		return 数据.toString();
	}

	public 消息(消息: string, 数据?: any): void {
		this.日志级别('信息', 消息, 数据);
	}

	public 警告(消息: string, 数据?: any): void {
		this.日志级别('警告', 消息, 数据);
	}

	public 错误(消息: string, 数据?: any): void {
		// See https://github.com/Microsoft/TypeScript/issues/10496
		if (数据 && 数据.message === '没有处理结果.') {
			return;
		}
		this.日志级别('错误', 消息, 数据);
	}

	public 日志级别(级别: string, 消息: string, 数据?: any): void {
		this.输出.appendLine(`[${级别} - ${(new Date().toLocaleTimeString())}] ${消息}`);
		if (数据) {
			this.输出.appendLine(this.数据转文本(数据));
		}
	}
}