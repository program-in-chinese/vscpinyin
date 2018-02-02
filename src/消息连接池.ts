/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as stream from 'stream';
import * as rl from "readline"


export interface 回调接口<T> {
	(data: T): void;
}

export class 读消息<T> {
	private 读一行: rl.ReadLine
	public constructor(
		private readonly 进程标准输入: stream.Readable,
		private readonly 回调: 回调接口<T>,
		private readonly 发生错误: (错误: any) => void = () => ({})
	) {
		this.读一行 = rl.createInterface({
			input: this.进程标准输入
		})
		try {
			this.读一行.on("line", input => {
				const json = JSON.parse(input);
				this.回调(json)
			})
		} catch (e) {
			this.发生错误(e);
		}

	}

}
