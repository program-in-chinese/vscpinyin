import { 系统 } from "./系统"
import { 创建对象, 按系数排序_V, 分割读取 } from "./工具"
import { 库内词, 拼音评估结果, 拼音验证结果, 节点映射 } from "./类型枚举"
import { 编译拼音, 重组拼音, 拼音, 取拼音组拼音, 取全拼索引, 中间有分割符, 取拼音索引简拼, 拼音是相等的, PY标记, 是三拼韵母组, Py } from "./编译拼音"
import { 查询拼音数据库 } from "./数据库读取";
import { 是数组 } from "./\u6838\u5FC3";

let 汉字拼音对应表: string[]
let 拼音汉字对应表: Map<string, string>
let 全部拼音组合 = new Set(["a", "ai", "an", "ang", "ao", "b", "ba", "bai", "ban", "bang", "bao", "bei", "ben", "beng", "bi", "bian", "biao", "bie", "bin", "bing", "bo", "bu", "c", "ca", "cai", "can", "cang", "cao", "ce", "cen", "ceng", "ch", "cha", "chai", "chan", "chang", "chao", "che", "chen", "cheng", "chi", "chong", "chou", "chu", "chuai", "chuan", "chuang", "chui", "chun", "chuo", "ci", "cong", "cou", "cu", "cuan", "cui", "cun", "cuo", "d", "da", "dai", "dan", "dang", "dao", "de", "dei", "deng", "di", "dia", "dian", "diao", "die", "ding", "diu", "dong", "dou", "du", "duan", "dui", "dun", "duo", "e", "ei", "en", "er", "f", "fa", "fan", "fang", "fei", "fen", "feng", "fo", "fou", "fu", "g", "ga", "gai", "gan", "gang", "gao", "ge", "gei", "gen", "geng", "gong", "gou", "gu", "gua", "guai", "guan", "guang", "gui", "gun", "guo", "h", "ha", "hai", "han", "hang", "hao", "he", "hei", "hen", "heng", "hong", "hou", "hu", "hua", "huai", "huan", "huang", "hui", "hun", "huo", "j", "ji", "jia", "jian", "jiang", "jiao", "jie", "jin", "jing", "jiong", "jiu", "ju", "juan", "jue", "jun", "k", "ka", "kai", "kan", "kang", "kao", "ke", "ken", "keng", "kong", "kou", "ku", "kua", "kuai", "kuan", "kuang", "kui", "kun", "kuo", "l", "la", "lai", "lan", "lang", "lao", "le", "lei", "leng", "li", "lia", "lian", "liang", "liao", "lie", "lin", "ling", "liu", "long", "lou", "lu", "luan", "lun", "luo", "lv", "lve", "m", "ma", "mai", "man", "mang", "mao", "me", "mei", "men", "meng", "mi", "mian", "miao", "mie", "min", "ming",
    "miu", "mo", "mou", "mu", "n", "na", "nai", "nan", "nang", "nao", "ne", "nei", "nen", "neng", "ni", "nian", "niang", "niao", "nie", "nin", "ning", "niu", "nong", "nou", "nu", "nuan", "nuo", "nv", "nve", "o", "ou", "p", "pa", "pai", "pan", "pang", "pao", "pei", "pen", "peng", "pi", "pian", "piao", "pie", "pin", "ping", "po", "pou", "pu", "q", "qi", "qia", "qian", "qiang", "qiao", "qie", "qin", "qing", "qiong", "qiu", "qu", "quan", "que", "qun", "r", "ran", "rang", "rao", "re", "ren", "reng", "ri", "rong", "rou", "ru", "ruan", "rui", "run", "ruo", "s", "sa", "sai", "san", "sang", "sao", "se", "sen", "seng", "sh", "sha", "shai", "shan", "shang", "shao", "she", "shen", "sheng", "shi", "shou", "shu", "shua", "shuai", "shuan", "shuang", "shui", "shun", "shuo", "si", "song", "sou", "su", "suan", "sui", "sun", "suo", "t", "ta", "tai", "tan", "tang", "tao", "te", "teng", "ti", "tian", "tiao", "tie", "ting", "tong", "tou", "tu", "tuan", "tui", "tun", "tuo", "w", "wa", "wai", "wan", "wang", "wei", "wen", "weng", "wo", "wu", "x", "xi", "xia", "xian", "xiang", "xiao", "xie", "xin", "xing", "xiong", "xiu", "xu", "xuan", "xue", "xun", "y", "ya", "yan", "yang", "yao", "ye", "yi", "yin", "ying", "yo", "yong", "you", "yu", "yuan", "yue", "yun", "z", "za", "zai", "zan", "zang", "zao", "ze", "zei", "zen", "zeng", "zh", "zha", "zhai", "zhan", "zhang", "zhao", "zhe", "zhei", "zhen", "zheng", "zhi", "zhong", "zhou", "zhu", "zhua", "zhuai", "zhuan", "zhuang", "zhui", "zhun", "zhuo", "zi", "zong", "zou", "zu", "zuan",
    "zui", "zun", "zuo"])

function 评估拼音(pyz: 拼音[]): 拼音评估结果 {
    let 可以重组 = false
    let 必须重组 = false
    let 包含简拼 = false
    let 全为简拼 = false
    let 全为全拼 = false

    let 简拼输入: number[] = []
    for (let i = 0; i < pyz.length; i++) {
        let p = pyz[i]
        if (是简拼拼音(p)) {
            简拼输入.push(i)
        }
        if (!p.声母 && i !== 0 && !中间有分割符(p, pyz[i - 1])) {
            可以重组 = true
        } if (!全部拼音组合.has(p.文本)) {
            必须重组 = true
        }
    }
    return { 可以重组, 必须重组, 包含简拼: !!简拼输入.length, 全为简拼: 简拼输入.length === pyz.length, 全为全拼: !简拼输入.length }
}

function 是简拼拼音(p: 拼音) {
    if (p.声母 && p.韵母) {
        return false
    }

    if (!p.声母) {
        if (是三拼韵母组(p.韵母)) {
            return true
        }
        if (p.韵母.标记 === PY标记.韵母_a || p.韵母.标记 === PY标记.韵母_o || p.韵母.标记 === PY标记.韵母_e) {
            return false
        }
    }
    return true

}


function 验证拼音(py: 拼音[]): 拼音验证结果 {
    let py1: 拼音[]
    let py2: 拼音[]
    let { 可以重组, 必须重组, 包含简拼, 全为简拼, 全为全拼 } = 评估拼音(py)

    if (必须重组) {
        py1 = 重组拼音(py)
        if (py1 === py) {

            let ls: 拼音[] = []

            for (let i = 0; i < py.length; i++) {
                let p = py[i]
                let 重组后评估结果 = 评估拼音([p])
                if (!重组后评估结果.必须重组) {
                    包含简拼 = 重组后评估结果.包含简拼
                    全为简拼 = 重组后评估结果.全为简拼
                    全为全拼 = 重组后评估结果.全为全拼
                    ls.push(p)
                } else {
                    break

                }
            }

            if (ls && ls.length) {
                py = ls
                py1 = undefined
            }

        } else {
            let 重组后评估结果 = 评估拼音(py1)
            if (重组后评估结果.必须重组) {
                return
            } else {
                包含简拼 = 重组后评估结果.包含简拼
                全为简拼 = 重组后评估结果.全为简拼
                全为全拼 = 重组后评估结果.全为全拼
            }
        }

    } if (可以重组) {
        py2 = 重组拼音(py)
        let 重组后评估结果 = 评估拼音(py2)
        if (重组后评估结果.必须重组) {
            py2 = undefined
        } else {
            包含简拼 = 重组后评估结果.包含简拼
            全为简拼 = 重组后评估结果.全为简拼
            全为全拼 = 重组后评估结果.全为全拼
        }

    }

    if (!py1) {
        py1 = py
    }

    if (拼音是相等的(py1, py2)) {
        py2 = undefined
    }

    return { py1, py2, 包含简拼, 全为简拼, 全为全拼 }

}

export function 取汉字拼音(文本: string | string[], 分割符 = "'", 忽略不存在: boolean = false) {

    function 取拼音组(文本1: string) {

        let 拼音组: string[] = []
        for (let i = 0; i < 文本1.length; i++) {
            let 拼音 = 取汉字拼音对应表()[文本1.charCodeAt(i)]
            if (!拼音) {
                if (忽略不存在) {
                    拼音 = 文本1[i]
                } else {
                    throw new Error("包含无拼音文字")
                }
            }
            if (拼音.indexOf("'") !== -1) {
                拼音 = 拼音.split("'")[0]
            }

            拼音组.push(拼音)

        }

        return 拼音组.join(分割符)

    }
    if (typeof 文本 === "string") {
        文本 = [文本]
    }
    let 返回值: 节点映射<string> = 创建对象()
    文本.forEach(v => {
        返回值[v] = 取拼音组(v)
    })
    return 返回值
}

export function 取汉字拼音对应表() {
    function 生成汉字拼音对应表() {
        汉字拼音对应表 = []
        const 汉字拼音对应表路径 = 系统.解析路径("../lib/汉字拼音对应词典.utf8")
        let 汉字拼音对应内容 = 系统.读文件(汉字拼音对应表路径) as string
        let 汉字拼音对应组 = 汉字拼音对应内容.split(";")
        汉字拼音对应组.forEach(v => {
            const z = v.split(":")
            const hz = z[0]
            const py = z[1]
            汉字拼音对应表[hz.charCodeAt(0)] = py

        })
        return 汉字拼音对应表

    }
    if (汉字拼音对应表) {
        return 汉字拼音对应表
    } else {
        return 生成汉字拼音对应表()
    }

}

export function 取拼音汉字对应表() {
    function 生成拼音汉字对应表() {
        拼音汉字对应表 = new Map()
        const 拼音汉字对应表路径 = 系统.解析路径("../lib/拼音汉字对应词典.utf8")
        let 内容 = 系统.读文件(拼音汉字对应表路径) as string
        let 读一行 = 分割读取(内容, "\n")
        while (true) {
            let 一行 = 读一行()
            if (!一行) {
                break
            } else {
                let 分割 = 一行.split(":")
                拼音汉字对应表.set(分割[0], 分割[1])
            }
        }
        return 拼音汉字对应表
    }
    return 拼音汉字对应表 || 生成拼音汉字对应表()
}

export function 编译拼音组(py: string): 拼音验证结果 {
    let PY = 编译拼音(py)
    if (!PY) {
        return
    }
    return 验证拼音(PY)
}
let 上次结果:库内词[]
export function 拼音查词(py: string): 库内词[] {
    let 命令字符: string=""    
    let 原始命令:string[]=[]

    let 加号数量 = 0
    let 减号数量 = 0
    for (let i = py.length - 1; i !== 0; i--) {
        if (py[i] === "+") {
            原始命令.unshift("+")
            加号数量++
        } else if (py[i] === "-") {
            原始命令.unshift("-")
            减号数量++
        } else {
            if (i !== py.length) {
                py = py.substr(0, ++i)
                break
            }
            break
        }
    }
    let 开始 = -1
    if (加号数量 === 减号数量 && 加号数量 !== 0) {
        开始 = 0
    } else if (加号数量 < 减号数量) {
        开始 = 0
    } else if (加号数量 > 减号数量) {
        开始 = 0
        for (let i = 0; i < 加号数量 - 减号数量; i++) {
            命令字符 += "+"
        }
    }

    if (开始 !== -1 && 上次结果) {
        let 开始 = 命令字符.length * 5
        if (上次结果.length < 开始) {
            if (上次结果.length > 5) {
                开始 = 上次结果.length - 5
            } else {
                开始 = 0
            }
        }
        let 长度1 = 上次结果.length - 开始 > 5 ? 5 : 上次结果.length
        let 返回的 = 长度1 ? 上次结果.slice(开始, 开始 + 长度1) : undefined
        let 值: 库内词[] = []
        if (返回的) {
            返回的.forEach(v => {
                v.剩余输入 = 原始命令.join("")
                值.push(v)
            })
        }
        return 值
    }

    if (!py) {
        return [{ 拼音: "", 文本: "", 频率: 1 }]
    }

    let 拼音 = 编译拼音(py)
    if (!拼音) {
        return [{ 拼音: py.replace("'",""), 文本: py, 频率: 1 }]
    }
    let 验证 = 验证拼音(拼音)
    if (验证) {
        let 结果1: 库内词[], 结果2: 库内词[]
        let 词组: 库内词[] = []
        if (验证.py1) {
            结果1 = 数据库内查找(生成数据库查询键(验证.py1, 验证.全为简拼), 验证.全为全拼, 验证.全为简拼)
            if (结果1) {
                词组.push(...结果1)
            }

        } if (验证.py2) {
            结果2 = 数据库内查找(生成数据库查询键(验证.py2, 验证.全为简拼), 验证.全为全拼, 验证.全为简拼)
            if (结果2) {
                词组.push(...结果2)
            }

        }

        if (词组.length > 1) {
            上次结果 = 词组
        }

        let 长度 = 词组.length > 5 ? 5 : undefined

        return 长度 ? 词组.slice(0, 长度) : 词组 ? 词组 : [{ 拼音: py.replace("'",""), 文本: py, 频率: 0 }]

    }

    return [{ 拼音: py, 文本: py, 频率: 0 }]

    function 数据库内查找(pysy: { 键: string[], 拼音: string }, 为全拼: boolean, 为简拼: boolean) {
        return 查询拼音数据库(pysy.键, pysy.拼音, 为全拼, 为简拼)
    }

}

function 生成数据库查询键(pyz: 拼音[], 全为简拼: boolean) {
    if (全为简拼) {
        let 键组 = pyz.map(p => p.文本)
        return { 键: 键组, 拼音: 键组.join("'") }
    }

    let 键组: string[] = []
    for (let i = 0; i < pyz.length; i++) {
        let 键 = pyz[i].声母 && pyz[i].声母.文本 || 取拼音索引简拼(pyz[i].文本)
        键组.push(键)
    }

    if (键组.length) {
        return { 键: 键组, 拼音: pyz.map(v => v.文本).join("'") }
    }

}
