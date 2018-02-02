import { 系统 } from "./系统";
import { 分割读取, 按文本排序_A } from "./工具";
import { 取汉字拼音对应表 } from "./拼音输入法输出";
import { 创建HMM分词, HMM分词 } from "./HMM分词器";


let _hmm分词: HMM分词
export function 加载hmm分词器() {
    function 加载() {
        let 路径 = 系统.解析路径("../lib/HMM词典.utf8")
        _hmm分词 = 创建HMM分词(路径)
        return _hmm分词
    }
    return _hmm分词 || 加载()
}

export function 词典去重复(路径?: string, 数据?: string, 不写出数据 = false) {
    let 内容: string
    if (数据) {
        内容 = 数据
    } else {
        路径 = 路径 || 系统.解析路径("../lib/基础词库.utf8")
        内容 = 系统.读文件(路径) as string
    }

    let 排序组 = (内容 as string).split(系统.新行)
    let 词组: Map<string, string> = new Map()

    排序组.forEach(v => {
        let 分组 = v.split(":")
        if (词组.has(分组[0] + ":" + 分组[1])) {
            let 存在 = 词组.get(分组[0] + ":" + 分组[1])
            if (+存在 < +分组[2]) {
                词组.set(分组[0] + ":" + 分组[1], 分组[2])
            }
        } else {
            词组.set(分组[0] + ":" + 分组[1], 分组[2])
        }
    })

    let 新内容: string[] = []
    词组.forEach((v, k) => {
        新内容.push(`${k}:${v}`)
    })
    if(!不写出数据){
        系统.写文件(路径, 新内容.join(系统.新行))
    }else{
      return  新内容.join(系统.新行)
    }    

}

export function 词典排序(路径?: string, 数据?: string, 不写出数据 = false) {
    let 内容: string
    if (数据) {
        内容 = 数据
    } else {
        内容 = 系统.读文件(路径) as string
    }
    路径 = 路径 || 系统.解析路径("../lib/基础词库.utf8")

    let 排序组 = (内容 as string).split(系统.新行)
    let 词组 :{ 文本: string, 其他:string}[]= []
    排序组.forEach(v => {
        let 分组 = v.split(":")
        let 小数点 = 分组[2].indexOf(".")
        if (小数点 !== -1) {
            分组[2] = 分组[2].slice(0, 小数点 + 5)
        }
        词组.push({ 文本: 分组[0], 其他: 分组[1] + ":" + 分组[2] })
    })
    词组 = 词组.sort(按文本排序_A)
    let 新内容: string[] = []
    词组.forEach(v => {
        新内容.push(`${v.文本}:${v.其他}`)
    })
    if(!不写出数据){
        系统.写文件(路径, 新内容.join(系统.新行))
    }else{
        return 新内容.join(系统.新行)
    }

}

/**
 * 本函数用来加载包含拼音的用户自定义词库,词库文件必须为utf8编码,每个词独立一行.
 * 
 * **行内容格式如下:**
 * ```
 *     自定义词 zi ding yi ci 2
 *     自定义词文本 zi ding yi ci wen ben 1.5
 * ``` 
 * 词文本与拼音间为 1个空格 拼音间用1个空格分割, 拼音与频率间为 1个空格的间隔.
 * 
 */

export function 加载有拼音词库(路径: string) {
    let 新路径 = 系统.解析路径("../lib/基础词库.utf8")
    let 内容 = 系统.读文件(路径)
    let 读一行 = 分割读取(内容 as string, "\n")
    let 词组: string[] = []
    while (true) {
        let 行文本 = 读一行()
        if (!行文本) {
            break
        } else {
            let 分割 = 行文本.split(" ")
            let 文本 = 分割.shift()
            let 频率 = 计算词频(文本)
            分割.pop()
            let 拼音 = 分割.join("'")
            词组.push(`${拼音}:${文本}:${频率}`)
        }
    }
    if (系统.文件存在(新路径)) {
        系统.追写文件(新路径, 系统.新行 + 词组.join(系统.新行))
    } else {
        系统.写文件(新路径, 词组.join(系统.新行))
    }
}

/**
 * 本函数用来加载用户自定义词库,词库文件必须为utf8编码,每个词独立一行.
 * 
 * **行内容格式如下:**
 * ```
 *     自定义词 2
 *     自定义词文本 1.5
 * ``` 
 * 词文本与频率间为 1个空格的 间隔
 * 
 */
export function 加载无拼音词库(路径: string) {

    let 新路径 = 系统.解析路径("../lib/基础词库.utf8")
    let 内容 = 系统.读文件(路径)
    let 读一行 = 分割读取(内容 as string, "\n")
    let 词组: string[] = []
    while (true) {
        let 行文本 = 读一行()
        if (!行文本) {
            break
        } else {
            let 分割 = 行文本.split(" ")
            if (分割 && 分割[0]) {
                let 拼音组 = 加载汉字拼音(分割[0])
                if (拼音组) {
                    if (拼音组.length === 1) {
                        let 拼音 = 拼音组[0], 文本 = 分割[0], 频率 = 0
                        if (分割[1]) {
                            频率 = +分割[1]
                        } else {
                            频率 = 计算词频(文本)
                        }
                        词组.push(`${拼音}:${文本}:${频率}`)
                    } else {
                        拼音组.forEach((v, ii) => {
                            let 文本 = 分割[0], 频率 = 0
                            if (分割[1]) {
                                频率 = +分割[1]
                            } else {
                                频率 = 计算词频(文本)
                            }

                            词组.push(`${v}:${文本}:${频率 / (ii + 1)}`)
                        })
                    }

                }
            }

        }
    }
    if (系统.文件存在(新路径)) {
        系统.追写文件(新路径, 系统.新行 + 词组.join(系统.新行))
    } else {
        系统.写文件(新路径, 词组.join(系统.新行))
    }
}

export function 加载停止词词典(路径:string){
    let 新路径 = 系统.解析路径("../lib/停止词词典.utf8")
    let 内容 = 系统.读文件(路径)
    let 读一行 = 分割读取(内容 as string, "\n")
    let 词组: string[] = []
    while (true) {
        let 行文本 = 读一行()
        if (!行文本) {
            break
        } else {
            行文本=行文本.trim()
            let 拼音组 = 加载汉字拼音(行文本)
            if (拼音组) {
                if (拼音组.length === 1) {
                    let 拼音 = 拼音组[0], 文本 = 行文本
                    词组.push(`${拼音}:${文本}`)
                } else {
                    拼音组.forEach((v, ii) => {
                        let 文本 = 行文本
                        词组.push(`${v}:${文本}`)
                    })
                }
            }
        }
    }
    if (系统.文件存在(新路径)) {
        系统.追写文件(新路径, 系统.新行 + 词组.join(系统.新行))
    } else {
        系统.写文件(新路径, 词组.join(系统.新行))
    }
    
}

function 计算词频(词文本: string): number {
    let hmm = 加载hmm分词器()
    let 长度 = 词文本.length
    let 头频率 = Math.abs(hmm.模型.频率统计信息[0].最小 + -1 - hmm.模型.取输出概率(hmm.模型.输出概率表[0], 词文本.charCodeAt(0), hmm.模型.频率统计信息[0].最小))

    let 尾频率 = Math.abs(hmm.模型.频率统计信息[1].最小 + -1 - hmm.模型.取输出概率(hmm.模型.输出概率表[1], 词文本.charCodeAt(长度 - 1), hmm.模型.频率统计信息[1].最小))

    let 中间频率 = 0
    let 中间基数 = hmm.模型.频率统计信息[2].最小 + -1
    for (let i = 1; i < 长度 - 1; i++) {
        中间频率 += Math.abs(中间基数 - hmm.模型.取输出概率(hmm.模型.输出概率表[2], 词文本.charCodeAt(i), 中间基数 + 1))
    }
    if (isNaN(头频率 + 尾频率 + 中间频率)) {
        return 0.1
    } else {
        return ((头频率 + 尾频率 + 中间频率) / 长度) * .2
    }

}

export function 加载汉字拼音(文本: string): string[] {
    let 多音拼音组: string[][] = []
    let 不含多音字组: string[] = []

    let 包含多音 = false
    let 没有拼音 = false

    for (let i = 0; i < 文本.length; i++) {
        let 拼音 = 取汉字拼音对应表()[文本.charCodeAt(i)]
        let 拼音组: string[] = []
        if (!拼音 && 文本[i].charCodeAt(0) < 127) {
            拼音 = 文本[i]
        }
        if (拼音) {
            if (拼音.indexOf("'") !== -1) {
                包含多音 = true
                拼音组 = 拼音.split("'")

            } else {
                不含多音字组.push(拼音)
                拼音组 = [拼音]
            }

            多音拼音组.push(拼音组)

        } else {
            没有拼音 = true
        }
    }
    if (没有拼音) {
        return
    }
    if (包含多音) {
        return 分割多音字(多音拼音组)
    } else {
        return [不含多音字组.join("'")]
    }

}

function 分割多音字(多音字拼音数组: string[][]): string[] {
    let 结果数组: string[] = []
    let 临时: string[] = []
    function 多音词分裂组合(多音字拼音数组: string[][], 过度: string[] = [], 当前层: number = 0) {
        if (多音字拼音数组.length === 当前层 + 1) {
            for (let i = 0; i < 多音字拼音数组[当前层].length; i++) {
                临时 = 过度.slice(0);
                临时.push(多音字拼音数组[当前层][i])
                结果数组.push(临时.join("'"))
            }
        } else {
            for (let i = 0; i < 多音字拼音数组[当前层].length; i++) {
                临时 = 过度.slice(0)
                临时.push(多音字拼音数组[当前层][i])

                多音词分裂组合(多音字拼音数组, 临时, 当前层 + 1, )
            }
        }
    }
    多音词分裂组合(多音字拼音数组)
    临时 = undefined
    return 结果数组

}