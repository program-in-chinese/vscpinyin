
import { 拼音输入法客户端,  数据结果, 库内词, 拼音验证结果, 节点映射 } from "./客户端"

export class 拼音输入法命令 {
    readonly 命令id = 'vsc.拼音输入法'
    constructor(
        private readonly 客户端: 拼音输入法客户端
    ) { }

    public async 执行命令(参数文本: string) {
        if (!参数文本) {
            return
        }
        let 词组 = await this.客户端.执行命令("拼音输入法", 参数文本)
        return <库内词[]>(<数据结果>词组).内容
    }

}

export class 取汉字拼音命令 {
    readonly 命令id = 'vsc.取汉字拼音'
    constructor(
        private readonly 客户端: 拼音输入法客户端
    ) { }

    public async 执行命令(参数文本: string[]) {
        if (!参数文本) {
            return
        }
        let 拼音 = await this.客户端.执行命令("取汉字拼音", 参数文本)
        return <节点映射<string>>(<数据结果>拼音).内容
    }

}

export class 保存用户词典命令 {
    readonly 命令id = 'vsc.保存用户词典'

    constructor(
        private readonly 客户端: 拼音输入法客户端
    ) { }
    public async 执行命令(参数词组: string) {
        if (!参数词组) {
            return
        }
        this.客户端.执行命令("保存用户词典", 参数词组)
        return true
    }

}

export class 验证拼音命令 {
    readonly 命令id = 'vsc.验证拼音'

    constructor(
        private readonly 客户端: 拼音输入法客户端
    ) { }
    public async 执行命令(参数词组:string) {
        if (!参数词组) {
            return
        }
        let 结果 = this.客户端.执行命令("验证拼音", 参数词组)
        return <拼音验证结果>(<数据结果>结果).内容
    }

}



