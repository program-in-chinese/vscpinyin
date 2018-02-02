
import { 是数组 } from "./核心";
import { 可排序 } from "./类型枚举";
import { 创建对象 } from "./工具";

export enum Py {
    nullCharacter = 0,
    _0 = 0x30,
    _1 = 0x31,
    _2 = 0x32,
    _3 = 0x33,
    _4 = 0x34,
    _5 = 0x35,
    _6 = 0x36,
    _7 = 0x37,
    _8 = 0x38,
    _9 = 0x39,
    a = 0x61,
    a1 = 0x101,
    a2 = 0xe1,
    a3 = 0x1ce,
    a4 = 0xe0,
    b = 0x62,
    c = 0x63,
    d = 0x64,
    e = 0x65,
    e1 = 0x113,
    e2 = 0xe9,
    e3 = 0x11b,
    e4 = 0xe8,
    f = 0x66,
    g = 0x67,
    h = 0x68,
    i = 0x69,
    i1 = 0x12b,
    i2 = 0xed,
    i3 = 0x1d0,
    i4 = 0xec,
    j = 0x6A,
    k = 0x6B,
    l = 0x6C,
    m = 0x6D,
    n = 0x6E,
    o = 0x6F,
    o1 = 0x14d,
    o2 = 0xf3,
    o3 = 0x1d2,
    o4 = 0xf2,
    p = 0x70,
    q = 0x71,
    r = 0x72,
    s = 0x73,
    t = 0x74,
    u = 0x75,
    u1 = 0x16b,
    u2 = 0xfa,
    u3 = 0x1d4,
    u4 = 0xf9,
    v = 0x76,
    v0 = 0xfc,
    v1 = 0x1d6,
    v2 = 0x1d8,
    v3 = 0x1da,
    v4 = 0x1dc,
    w = 0x77,
    x = 0x78,
    y = 0x79,
    z = 0x7A,
    逗号 = 0x2C,  // 编译九宫格使用
    单引号 = 0x27
}

export interface 文本跨度 {
    开始?: number
    结尾?: number
}

export type 韵母类型 = 韵母_a | 韵母_o | 韵母_e | 韵母_i | 韵母_u | 韵母_v | 韵母_ai | 韵母_ei | 韵母_ui |
    韵母_ao | 韵母_ou | 韵母_an | 韵母_en | 韵母_in | 韵母_ie | 韵母_iu | 韵母_ue | 韵母_ve | 韵母_er | 韵母_un | 韵母_vn |
    韵母_ang | 韵母_eng | 韵母_ing | 韵母_ong

export interface 韵母 extends 拼音节点 {
    标记: 韵母类型["标记"]
    声调?: number
}


export type 声母类型 = 声母_b | 声母_p | 声母_m | 声母_f | 声母_d | 声母_t | 声母_n | 声母_l | 声母_g |
    声母_k | 声母_h | 声母_j | 声母_q | 声母_x | 声母_zh | 声母_ch | 声母_sh | 声母_r |
    声母_z | 声母_c | 声母_s | 声母_y | 声母_w

export type 三拼韵母组=[三拼无音韵母, 三拼韵母]

export interface 声母 extends 拼音节点 {
    标记: 声母类型["标记"]
    可双拼韵母?: 韵母
    可三拼韵母?: 三拼韵母组
}


export interface 拼音 extends 拼音节点 {
    声母?: 声母
    韵母?: 韵母 | 三拼韵母组
    可分割?: boolean
    可拆分?: number
}

export interface 拼音节点 extends 文本跨度, 可排序 {
    标记: PY标记
    文本?: string
}

export type 三拼无音韵母 = 韵母_i | 韵母_u
export type 三拼韵母 = 韵母_a | 韵母_an | 韵母_ai | 韵母_ao | 韵母_ang | 韵母_o | 韵母_e | 韵母_ong


export type b可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_o | 韵母_u
export type b可三双拼韵母 = [韵母_i, 韵母_an] | [韵母_i, 韵母_ao]
export interface 声母_b extends 声母 {
    标记: PY标记.声母_b
    // B: ["ba", "bai", "ban", "bang", "bao", "bei", "ben", "beng", "bi", "bie", "bin", "bing", "bo", "bu"],
    可双拼韵母?: b可双拼韵母
    // B: [ "bian", "biao"],
    可三拼韵母?: b可三双拼韵母
}

export type p可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_o | 韵母_ou | 韵母_u
export type p可三双拼韵母 = b可三双拼韵母
export interface 声母_p extends 声母 {
    标记: PY标记.声母_p
    // P: ["pa", "pai", "pan", "pang", "pao", "pei", "pen", "peng", "pi", "pie", "pin", "ping", "po", "pou", "pu"],
    可双拼韵母: p可双拼韵母
    // P: ["pian", "piao"],
    可三拼韵母: p可三双拼韵母
}

export type m可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_o | 韵母_ou | 韵母_u
export type m可三双拼韵母 = b可三双拼韵母
export interface 声母_m extends 声母 {
    标记: PY标记.声母_m
    // M: ["ma", "mai", "man", "mang", "mao", "me", "mei", "men", "meng", "mi","mie", "min", "ming", "miu", "mo", "mou", "mu"],
    可双拼韵母: m可双拼韵母
    // M: ["mian", "miao"],
    可三拼韵母: m可三双拼韵母
}


export type f可双拼韵母 = 韵母_a | 韵母_an | 韵母_ang | 韵母_ei | 韵母_en | 韵母_eng | 韵母_o | 韵母_ou | 韵母_u
export interface 声母_f extends 声母 {
    标记: PY标记.声母_f
    // F: ["fa", "fan", "fang", "fei", "fen", "feng", "fo", "fou", "fu"],
    可双拼韵母: f可双拼韵母
}


export type d可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_ing | 韵母_iu | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type d可三双拼韵母 = b可三双拼韵母 | [韵母_u, 韵母_an] | [韵母_u, 韵母_o]

export interface 声母_d extends 声母 {
    标记: PY标记.声母_d
    // D: ["da", "dai", "dan", "dang","dao","de","den", "dei", "deng", "di", "dia","die", "ding", "diu", "dong", "dou", "du",  "dui", "dun" ],
    可双拼韵母: d可双拼韵母
    // D: ["dian", "diao","duan","duo" ]
    可三拼韵母: d可三双拼韵母
}


export type t可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_eng | 韵母_i | 韵母_ie | 韵母_ing | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type t可三双拼韵母 = d可三双拼韵母

export interface 声母_t extends 声母 {
    标记: PY标记.声母_t
    // T: ["ta", "tai", "tan", "tang", "tao", "te", "teng", "ti", "tie", "ting", "tong", "tou", "tu", "tui", "tun"],
    可双拼韵母: t可双拼韵母
    // T: ["tian", "tiao","tuan", "tuo"]
    可三拼韵母: t可三双拼韵母
}


export type n可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_ing | 韵母_ie | 韵母_in | 韵母_iu | 韵母_i | 韵母_ong | 韵母_ou | 韵母_u | 韵母_v | 韵母_ve | 韵母_ue | 韵母_un
export type n可三双拼韵母 = [韵母_i, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ao] | [韵母_u, 韵母_an] | [韵母_u, 韵母_o]

export interface 声母_n extends 声母 {
    标记: PY标记.声母_n
    // N: ["na", "nai", "nan", "nang", "nao", "ne", "nei", "nen", "neng"                        , "ning",  "nie", "nin", "niu",            "nong", "nou", "nu", "nü", "nüe", "nun"],
    可双拼韵母: n可双拼韵母
    //"nian", "niang", "niao", "nuan","nuo",
    可三拼韵母: n可三双拼韵母
}


export type l可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_ong | 韵母_ou | 韵母_u | 韵母_v | 韵母_ve | 韵母_ue | 韵母_un
export type l可三双拼韵母 = [韵母_i, 韵母_a] | [韵母_i, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ao] | [韵母_u, 韵母_an] | [韵母_u, 韵母_e] | [韵母_u, 韵母_o]

export interface 声母_l extends 声母 {
    标记: PY标记.声母_l
    // L: ["la", "lai", "lan", "lang", "lao", "le", "lei", "leng", "li", "lia", "lian", "liang", "liao", "lie", "lin", "ling", "liu", "long", "lou", "lu", "lü", "luan", "lue", "lüe", "lun", "luo"],
    可双拼韵母: l可双拼韵母
    可三拼韵母: l可三双拼韵母
}


export type g可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type g可三双拼韵母 = [韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_u, 韵母_ang] | [韵母_u, 韵母_o]

export interface 声母_g extends 声母 {
    标记: PY标记.声母_g
    //G: ["ga", "gai", "gan", "gang", "gao", "ge", "gei", "gen", "geng", "gong", "gou", "gu", "gua", "guai", "guan", "guang", "gui", "gun", "guo"],
    可双拼韵母: g可双拼韵母
    可三拼韵母: g可三双拼韵母
}

export type k可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type k可三双拼韵母 = g可三双拼韵母

export interface 声母_k extends 声母 {
    标记: PY标记.声母_k
    // K: ["ka", "kai", "kan", "kang", "kao", "ke", "ken", "keng", "kong", "kou", "ku", "kua", "kuai", "kuan", "kuang", "kui", "kun", "kuo"],
    可双拼韵母: k可双拼韵母
    可三拼韵母: k可三双拼韵母
}

export type h可双拼韵母 = g可双拼韵母
export type h可三双拼韵母 = g可三双拼韵母
export interface 声母_h extends 声母 {
    标记: PY标记.声母_h
    // H: ["ha", "hai", "han", "hang", "hao", "he", "hei", "hen", "heng", "hong", "hou", "hu", "hua", "huai", "huan", "huang", "hui", "hun", "huo"],
    可双拼韵母: h可双拼韵母
    可三拼韵母: h可三双拼韵母
}


export type j可双拼韵母 = 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_u | 韵母_un
export type j可三双拼韵母 = [韵母_i, 韵母_a] | [韵母_i, 韵母_ai] | [韵母_i, 韵母_an]| [韵母_i, 韵母_ao] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ong] | [韵母_u, 韵母_an] | [韵母_u, 韵母_e]
export interface 声母_j extends 声母 {
    标记: PY标记.声母_j
    //J: ["ji", "jia", "jian", "jiang", "jiao", "jie", "jin", "jing", "jiong", "jiu", "ju", "juan", "jue", "jun"],
    可双拼韵母: j可双拼韵母
    可三拼韵母: j可三双拼韵母
}

export type q可双拼韵母 = j可双拼韵母
export type q可三双拼韵母 = j可三双拼韵母
export interface 声母_q extends 声母 {
    标记: PY标记.声母_q
    // Q: ["qi", "qia", "qian", "qiang", "qiao", "qie", "qin", "qing", "qiong", "qiu", "qu", "quan", "que", "qun"],
    可双拼韵母: q可双拼韵母
    可三拼韵母: q可三双拼韵母
}

export type x可双拼韵母 = q可双拼韵母
export type x可三双拼韵母 = q可三双拼韵母
export interface 声母_x extends 声母 {
    标记: PY标记.声母_x
    //X: ["xi", "xia", "xian", "xiang", "xiao", "xie", "xin", "xing", "xiong", "xiu", "xu", "xuan", "xue", "xun"],
    可双拼韵母: x可双拼韵母
    可三拼韵母: x可三双拼韵母
}

export type zh可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type zh可三双拼韵母 = [韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_u, 韵母_o]
export interface 声母_zh extends 声母 {
    标记: PY标记.声母_zh
    //Zh: ["zha", "zhai", "zhan", "zhang", "zhao", "zhe", "zhei", "zhen", "zheng", "zhi", "zhong", "zhou", "zhu", "zhua", "zhuai", "zhuan", "zhuang", "zhui", "zhun", "zhuo"],
    可双拼韵母: zh可双拼韵母
    可三拼韵母: zh可三双拼韵母
}

export type ch可双拼韵母 = 韵母_a | 韵母_ai | r可双拼韵母
export type ch可三双拼韵母 = zh可三双拼韵母

export interface 声母_ch extends 声母 {
    标记: PY标记.声母_ch
    //Ch: ["cha", "chai", "chan", "chang", "chao", "che", "chen", "cheng", "chi", "chong", "chou", "chu", "chua", "chuai", "chuan", "chuang", "chui", "chun", "chuo"],
    可双拼韵母: ch可双拼韵母
    可三拼韵母: ch可三双拼韵母
}


export type sh可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type sh可三双拼韵母 = zh可三双拼韵母

export interface 声母_sh extends 声母 {
    标记: PY标记.声母_sh
    // Sh: ["sha", "shai", "shan", "shang", "shao", "she", "shei", "shen", "sheng", "shi", "shou", "shu", "shua", "shuai", "shuan", "shuang", "shui", "shun", "shuo"],
    可双拼韵母: sh可双拼韵母
    可三拼韵母: sh可三双拼韵母
}

export type r可双拼韵母 = 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_en | 韵母_eng | 韵母_i | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
export type r可三双拼韵母 = [韵母_u, 韵母_an] | [韵母_u, 韵母_o]

export interface 声母_r extends 声母 {
    标记: PY标记.声母_r
    // R: ["ran", "rang", "rao", "re", "ren", "reng", "ri", "rong", "rou", "ru", "ruan", "rui", "run", "ruo"],
    可双拼韵母: r可双拼韵母
    可三拼韵母: r可三双拼韵母
}


export type z可双拼韵母 = g可双拼韵母 | 韵母_i
export type z可三双拼韵母 = r可三双拼韵母
export interface 声母_z extends 声母 {
    标记: PY标记.声母_z
    // Z: ["za", "zai", "zan", "zang", "zao", "ze", "zei", "zen", "zeng", "zong", "zou", "zu", "zuan", "zui", "zun", "zuo", "zi"],
    可双拼韵母: z可双拼韵母
    可三拼韵母: z可三双拼韵母
}

export type c可双拼韵母 = ch可双拼韵母
export type c可三双拼韵母 = r可三双拼韵母
export interface 声母_c extends 声母 {
    标记: PY标记.声母_c
    //  C: ["ca", "cai", "can", "cang", "cao", "ce", "cen", "ceng", "ci", "cong", "cou", "cu", "cuan", "cui", "cun", "cuo"],
    可双拼韵母: c可双拼韵母
    可三拼韵母: c可三双拼韵母
}

export type s可双拼韵母 = c可双拼韵母
export type s可三双拼韵母 = r可三双拼韵母
export interface 声母_s extends 声母 {
    标记: PY标记.声母_s
    //  S: ["sa", "sai", "san", "sang", "sao", "se", "sen", "seng", "si", "song", "sou", "su", "suan", "sui", "sun", "suo"],
    可双拼韵母: s可双拼韵母
    可三拼韵母: s可三双拼韵母

}

export type y可双拼韵母 = 韵母_a | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_i | 韵母_in | 韵母_ing | 韵母_ong | 韵母_ou | 韵母_u | 韵母_un
export type y可三双拼韵母 = [韵母_u, 韵母_an] | [韵母_u, 韵母_e]

export interface 声母_y extends 声母 {
    标记: PY标记.声母_y //
    // Y: ["ya", "yan", "yang", "yao", "ye", "yi", "yin", "ying", "yo", "yong", "you", "yu", "yuan", "yue", "yun"],
    可双拼韵母: y可双拼韵母
    可三拼韵母: y可三双拼韵母
}


export type w可双拼韵母 = 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ei | 韵母_en | 韵母_eng | 韵母_o | 韵母_u

export interface 声母_w extends 声母 {
    标记: PY标记.声母_w
    // W: ["wa", "wai", "wan", "wang", "wei", "wen", "weng", "wo", "wu"],
    可双拼韵母: w可双拼韵母
}

export interface 单引号 extends 拼音节点 {
    标记: PY标记.单引号
}

export interface 韵母_a extends 韵母 {
    标记: PY标记.韵母_a
    可标声调: boolean
}

export interface 韵母_o extends 韵母 {
    标记: PY标记.韵母_o
    可标声调: boolean
}

export interface 韵母_e extends 韵母 {
    标记: PY标记.韵母_e
    可标声调: boolean
}

export interface 韵母_i extends 韵母 {
    标记: PY标记.韵母_i
    可标声调: boolean
}

export interface 韵母_u extends 韵母 {
    标记: PY标记.韵母_u
    可标声调: boolean
}

export interface 韵母_v extends 韵母 {
    标记: PY标记.韵母_v
    可标声调: boolean
}

export interface 韵母_ai extends 韵母 {
    标记: PY标记.韵母_ai
}

export interface 韵母_ei extends 韵母 {
    标记: PY标记.韵母_ei
}

export interface 韵母_iu extends 韵母 {
    标记: PY标记.韵母_iu
}

export interface 韵母_ao extends 韵母 {
    标记: PY标记.韵母_ao
}

export interface 韵母_ou extends 韵母 {
    标记: PY标记.韵母_ou
}

export interface 韵母_ui extends 韵母 {
    标记: PY标记.韵母_ui
}

export interface 韵母_an extends 韵母 {
    标记: PY标记.韵母_an
}

export interface 韵母_en extends 韵母 {
    标记: PY标记.韵母_en
}

export interface 韵母_in extends 韵母 {
    标记: PY标记.韵母_in
}

export interface 韵母_ang extends 韵母 {
    标记: PY标记.韵母_ang
}

export interface 韵母_eng extends 韵母 {
    标记: PY标记.韵母_eng
}

export interface 韵母_ing extends 韵母 {
    标记: PY标记.韵母_ing
}

export interface 韵母_ong extends 韵母 {
    标记: PY标记.韵母_ong
}

export interface 韵母_un extends 韵母 {
    标记: PY标记.韵母_un
}

export interface 韵母_ie extends 韵母 {
    标记: PY标记.韵母_ie
}

export interface 韵母_ve extends 韵母 {
    标记: PY标记.韵母_ve
}

export interface 韵母_ue extends 韵母 {
    标记: PY标记.韵母_ue
}

export interface 韵母_vn extends 韵母 {
    标记: PY标记.韵母_vn
}

export interface 韵母_er extends 韵母 {
    标记: PY标记.韵母_er
}

export interface 拼音组 extends 拼音节点 {
    内容组: Array<拼音节点>
}

export enum PY标记 {
    结尾,
    单引号,
    逗号,
    声母_b,
    声母_p,
    声母_m,
    声母_f,
    声母_d,
    声母_t,
    声母_n,
    声母_l,
    声母_g,
    声母_k,
    声母_h,
    声母_j,
    声母_q,
    声母_x,
    声母_r,
    声母_z,
    声母_c,
    声母_s,
    声母_y,
    声母_w,
    声母_zh,
    声母_ch,
    声母_sh,
    韵母_a,
    韵母_o,
    韵母_e,
    韵母_i,
    韵母_u,
    韵母_v,
    韵母_an,
    韵母_en,
    韵母_vn,
    韵母_in,
    韵母_un,
    韵母_ao,
    韵母_ou,
    韵母_iu,
    韵母_ai,
    韵母_ei,
    韵母_ui,
    韵母_ie,
    韵母_ue,
    韵母_ve,
    韵母_er,
    韵母_ang,
    韵母_eng,
    韵母_ing,
    韵母_ong,
}

export interface 九宫1 {
    文本: ["1"]
}
export interface 九宫0 {
    文本: ["0"]
}
export interface 九宫ABC {
    文本: ["abc,ABC2"]
}
export interface 九宫DEF {
    文本: ["def,DEF3"]
}
export interface 九宫GHI {
    文本: ["ghi,GHI4"]
}
export interface 九宫JKL {
    文本: ["jkl,JKL5"]
}
export interface 九宫MNO {
    文本: ["mno,MNO6"]
}
export interface 九宫PQRS {
    文本: ["pqrs,PQRS7"]
}
export interface 九宫TUV {
    文本: ["tuv,TUV8"]
}
export interface 九宫WXYZ {
    文本: ["wxyz,WXYZ9"]
}

export function 转为文本(标记: PY标记) {
    return 标记转文本[标记]
}

export const 拼音正则 = /^[bpmfdtnlgkhjqxzcsrywaāáǎàoōóǒòeēéěèiīíǐìuūúǔùǖǘǚǜüv']+$/

export function 是拼音字符串(参数: string) {
    return 拼音正则.test(参数)
}

export function 取拼音组拼音(拼音组: 拼音[]) {
    let 结果: string[] = []
    if (!拼音组 || !拼音组.length) {
        return ""
    }
    拼音组.forEach(v => {
        结果.push(v.文本)
    })
    if (结果.length > 0) {
        return 结果.join("'")
    }
    return ""
}

export function 取全拼索引(拼音组: 拼音[]) {
    let 结果: string[] = []
    if (!拼音组 || !拼音组.length) {
        return []
    }
    拼音组.forEach(v => {
        结果.push(v.文本)
    })
    if (结果.length > 0) {
        return 结果
    }
    return []
}


export function 取拼音组拼音去重(拼音组: 拼音[]) {
    let 结果 = ""
    if (!拼音组 || !拼音组.length) {
        return 结果
    }
    拼音组.forEach(v => {
        if (结果.indexOf(v.文本) === -1) 结果 += "'" + v.文本
    })
    return 结果.substr(1)
}

export function 是韵母(p: 拼音节点): p is 韵母类型 {
    switch (p.标记) {
        case PY标记.韵母_a:
        case PY标记.韵母_o:
        case PY标记.韵母_e:
        case PY标记.韵母_i:
        case PY标记.韵母_u:
        case PY标记.韵母_v:
        case PY标记.韵母_ai:
        case PY标记.韵母_ei:
        case PY标记.韵母_ui:
        case PY标记.韵母_ao:
        case PY标记.韵母_ou:
        case PY标记.韵母_an:
        case PY标记.韵母_en:
        case PY标记.韵母_in:
        case PY标记.韵母_ie:
        case PY标记.韵母_ue:
        case PY标记.韵母_iu:
        case PY标记.韵母_ve:
        case PY标记.韵母_er:
        case PY标记.韵母_un:
        case PY标记.韵母_vn:
        case PY标记.韵母_ang:
        case PY标记.韵母_eng:
        case PY标记.韵母_ing:
        case PY标记.韵母_ong:
            return true
        default:
            return false
    }
}

export function 是声母(p: 拼音节点): p is 声母类型 {
    switch (p.标记) {
        case PY标记.声母_b:
        case PY标记.声母_p:
        case PY标记.声母_m:
        case PY标记.声母_f:
        case PY标记.声母_d:
        case PY标记.声母_t:
        case PY标记.声母_n:
        case PY标记.声母_l:
        case PY标记.声母_g:
        case PY标记.声母_k:
        case PY标记.声母_h:
        case PY标记.声母_j:
        case PY标记.声母_q:
        case PY标记.声母_x:
        case PY标记.声母_zh:
        case PY标记.声母_ch:
        case PY标记.声母_sh:
        case PY标记.声母_r:
        case PY标记.声母_z:
        case PY标记.声母_c:
        case PY标记.声母_s:
        case PY标记.声母_y:
        case PY标记.声母_w:
            return true
        default:
            return false
    }
}

export function 是声母双拼韵母(p1: 声母, p2: 韵母) {
    switch (p1.标记) {
        case PY标记.声母_b:
            return 是声母b双拼韵母(p2)
        case PY标记.声母_p:
            return 是声母p双拼韵母(p2)
        case PY标记.声母_m:
            return 是声母m双拼韵母(p2)
        case PY标记.声母_f:
            return 是声母f双拼韵母(p2)
        case PY标记.声母_d:
            return 是声母d双拼韵母(p2)
        case PY标记.声母_t:
            return 是声母t双拼韵母(p2)
        case PY标记.声母_n:
            return 是声母n双拼韵母(p2)
        case PY标记.声母_l:
            return 是声母l双拼韵母(p2)
        case PY标记.声母_g:
            return 是声母g双拼韵母(p2)
        case PY标记.声母_k:
            return 是声母k双拼韵母(p2)
        case PY标记.声母_h:
            return 是声母h双拼韵母(p2)
        case PY标记.声母_j:
            return 是声母j双拼韵母(p2)
        case PY标记.声母_q:
            return 是声母q双拼韵母(p2)
        case PY标记.声母_x:
            return 是声母x双拼韵母(p2)
        case PY标记.声母_zh:
            return 是声母zh双拼韵母(p2)
        case PY标记.声母_ch:
            return 是声母ch双拼韵母(p2)
        case PY标记.声母_sh:
            return 是声母sh双拼韵母(p2)
        case PY标记.声母_r:
            return 是声母r双拼韵母(p2)
        case PY标记.声母_z:
            return 是声母z双拼韵母(p2)
        case PY标记.声母_c:
            return 是声母c双拼韵母(p2)
        case PY标记.声母_s:
            return 是声母s双拼韵母(p2)
        case PY标记.声母_y:
            return 是声母y双拼韵母(p2)
        case PY标记.声母_w:
            return 是声母w双拼韵母(p2)
        default:
            return false
    }
}

export function 是声母三拼韵母(p1: 声母, ps2: 三拼韵母组) {
    switch (p1.标记) {
        case PY标记.声母_b:
            return 是声母b三拼韵母(ps2)
        case PY标记.声母_p:
            return 是声母p三拼韵母(ps2)
        case PY标记.声母_m:
            return 是声母m三拼韵母(ps2)
        case PY标记.声母_f:
            return false
        case PY标记.声母_d:
            return 是声母d三拼韵母(ps2)
        case PY标记.声母_t:
            return 是声母t三拼韵母(ps2)
        case PY标记.声母_n:
            return 是声母n三拼韵母(ps2)
        case PY标记.声母_l:
            return 是声母l三拼韵母(ps2)
        case PY标记.声母_g:
            return 是声母g三拼韵母(ps2)
        case PY标记.声母_k:
            return 是声母g三拼韵母(ps2)
        case PY标记.声母_h:
            return 是声母h三拼韵母(ps2)
        case PY标记.声母_j:
            return 是声母j三拼韵母(ps2)
        case PY标记.声母_q:
            return 是声母q三拼韵母(ps2)
        case PY标记.声母_x:
            return 是声母x三拼韵母(ps2)
        case PY标记.声母_zh:
            return 是声母zh三拼韵母(ps2)
        case PY标记.声母_ch:
            return 是声母ch三拼韵母(ps2)
        case PY标记.声母_sh:
            return 是声母sh三拼韵母(ps2)
        case PY标记.声母_r:
            return 是声母r三拼韵母(ps2)
        case PY标记.声母_z:
            return 是声母z三拼韵母(ps2)
        case PY标记.声母_c:
            return 是声母c三拼韵母(ps2)
        case PY标记.声母_s:
            return 是声母s三拼韵母(ps2)
        case PY标记.声母_y:
            return 是声母y三拼韵母(ps2)
        case PY标记.声母_w:
            return false
        default:
            return false
    }
}

export function 是三拼无音韵母(p: 韵母): p is 三拼无音韵母 {
    return p.标记 === PY标记.韵母_i || p.标记 === PY标记.韵母_u
}

export function 是三拼韵母(p: 韵母): p is 三拼韵母 {
    switch (p.标记) {
        case PY标记.韵母_a:
        case PY标记.韵母_an:
        case PY标记.韵母_ai:
        case PY标记.韵母_ao:
        case PY标记.韵母_ang:
        case PY标记.韵母_o:
        case PY标记.韵母_e:
        case PY标记.韵母_ong:
            return true
        default:
            return false
    }
}

export function 是声母b(p: 拼音节点): p is 声母_b {
    return p.标记 === PY标记.声母_b
}
export function 是声母b双拼韵母(p: 拼音节点): p is b可双拼韵母 {
    switch (p.标记) {
        //韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_o | 韵母_u
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:
        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_ing:
        case PY标记.韵母_o:
        case PY标记.韵母_u:
            return true
        default:
            return false
    }
}

export function 是声母b三拼韵母(p: 三拼韵母组): p is b可三双拼韵母 {
    return p[0].标记 === PY标记.韵母_i && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ao)
}


export function 是声母p(p: 拼音节点): p is 声母_p {
    return p.标记 === PY标记.声母_p
}

export function 是声母p双拼韵母(p: 拼音节点): p is p可双拼韵母 {
    switch (p.标记) {
        // 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_o | 韵母_ou | 韵母_u
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_ing:

        case PY标记.韵母_o:
        case PY标记.韵母_ou:
        case PY标记.韵母_u:
            return true
        default:
            return false
    }
}

export function 是声母p三拼韵母(p: 三拼韵母组): p is p可三双拼韵母 {
    return 是声母b三拼韵母(p)
}


export function 是声母m(p: 拼音节点): p is 声母_m {
    return p.标记 === PY标记.声母_m
}
export function 是声母m双拼韵母(p: 拼音节点): p is m可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_o | 韵母_ou | 韵母_u
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_ing:
        case PY标记.韵母_iu:

        case PY标记.韵母_o:
        case PY标记.韵母_ou:
        case PY标记.韵母_u:
            return true
        default:
            return false
    }
}

export function 是声母m三拼韵母(p: 三拼韵母组): p is m可三双拼韵母 {
    return 是声母b三拼韵母(p)
}

export function 是声母f(p: 拼音节点): p is 声母_f {
    return p.标记 === PY标记.声母_f
}

export function 是声母f双拼韵母(p: 拼音节点): p is f可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_an | 韵母_ang | 韵母_ei | 韵母_en | 韵母_eng | 韵母_o | 韵母_ou | 韵母_u
        case PY标记.韵母_a:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:

        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_o:
        case PY标记.韵母_ou:
        case PY标记.韵母_u:
            return true
        default:
            return false
    }
}

export function 是声母d(p: 拼音节点): p is 声母_d {
    return p.标记 === PY标记.声母_d
}
export function 是声母d双拼韵母(p: 拼音节点): p is d可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ie | 韵母_ing | 韵母_iu | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_ing:
        case PY标记.韵母_iu:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母d三拼韵母(p: 三拼韵母组): p is d可三双拼韵母 {
    return 是声母b三拼韵母(p) || p[0].标记 == PY标记.韵母_u && (p[1].标记 === PY标记.韵母_o || p[1].标记 === PY标记.韵母_an)
}

export function 是声母t(p: 拼音节点): p is 声母_t {
    return p.标记 === PY标记.声母_t
}

export function 是声母t双拼韵母(p: 拼音节点): p is t可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_eng | 韵母_i | 韵母_ie | 韵母_ing | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_ing:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母t三拼韵母(p: 三拼韵母组): p is t可三双拼韵母 {
    return 是声母d三拼韵母(p)
}

export function 是声母n(p: 拼音节点): p is 声母_n {
    return p.标记 === PY标记.声母_n
}
export function 是声母n双拼韵母(p: 拼音节点): p is n可双拼韵母 {
    switch (p.标记) {
        //   韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei| 韵母_i | 韵母_en | 韵母_eng 
        // | 韵母_ing | 韵母_ie | 韵母_in | 韵母_iu | 韵母_ong | 韵母_ou | 韵母_u | 韵母_v | 韵母_ve | 韵母_ue | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_iu:
        case PY标记.韵母_ing:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_v:
        case PY标记.韵母_ve:

        case PY标记.韵母_u:
        case PY标记.韵母_ue:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母n三拼韵母(p: 三拼韵母组): p is n可三双拼韵母 {
    // [韵母_i, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ao] | [韵母_u, 韵母_an] | [韵母_u, 韵母_o]
    return (p[0].标记 === PY标记.韵母_i && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ang || p[1].标记 === PY标记.韵母_ao)) || (p[0].标记 === PY标记.韵母_u && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_o))
}

export function 是声母l(p: 拼音节点): p is 声母_l {
    return p.标记 === PY标记.声母_l
}
export function 是声母l双拼韵母(p: 拼音节点): p is l可双拼韵母 {
    switch (p.标记) {
        // 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_eng 
        // | 韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_ong | 韵母_ou | 韵母_u | 韵母_v | 韵母_ve | 韵母_ue | 韵母_un

        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_iu:
        case PY标记.韵母_ing:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_v:
        case PY标记.韵母_ve:

        case PY标记.韵母_u:
        case PY标记.韵母_ue:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母l三拼韵母(p: 三拼韵母组): p is l可三双拼韵母 {
    // [韵母_i, 韵母_a] | [韵母_i, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ao] | [韵母_u, 韵母_an] | [韵母_u, 韵母_e] | [韵母_u, 韵母_o]
    return (p[0].标记 === PY标记.韵母_i && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ang || p[1].标记 === PY标记.韵母_ao))
        || (p[0].标记 === PY标记.韵母_u && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_e || p[1].标记 === PY标记.韵母_o))
}

export function 是声母g(p: 拼音节点): p is 声母_g {
    return p.标记 === PY标记.声母_g
}
export function 是声母g双拼韵母(p: 拼音节点): p is g可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng 
        // | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un 
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母g三拼韵母(p: 三拼韵母组): p is g可三双拼韵母 {
    //[韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_u, 韵母_ang] | [韵母_u, 韵母_o]
    return (p[0].标记 === PY标记.韵母_u &&
        (p[1].标记 === PY标记.韵母_a || p[1].标记 === PY标记.韵母_ai || p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ang || p[1].标记 === PY标记.韵母_o))
}

export function 是声母k(p: 拼音节点): p is 声母_k {
    return p.标记 === PY标记.声母_k
}

export function 是声母k双拼韵母(p: 拼音节点): p is k可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_en | 韵母_eng | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:
        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:
        case PY标记.韵母_ou:
        case PY标记.韵母_ong:
        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}

export function 是声母k三拼韵母(p: 三拼韵母组): p is k可三双拼韵母 {
    return 是声母g三拼韵母(p)
}

export function 是声母h(p: 拼音节点): p is 声母_h {
    return p.标记 === PY标记.声母_h
}

export function 是声母h双拼韵母(p: 拼音节点): p is h可双拼韵母 {
    return 是声母g双拼韵母(p)
}
export function 是声母h三拼韵母(p: 三拼韵母组): p is h可三双拼韵母 {
    return 是声母g三拼韵母(p)
}

export function 是声母j(p: 拼音节点): p is 声母_j {
    return p.标记 === PY标记.声母_j
}
export function 是声母j双拼韵母(p: 拼音节点): p is j可双拼韵母 {
    switch (p.标记) {
        //   韵母_i | 韵母_ie | 韵母_in | 韵母_ing | 韵母_iu | 韵母_u | 韵母_un | 韵母_ue
        case PY标记.韵母_i:
        case PY标记.韵母_ie:
        case PY标记.韵母_in:
        case PY标记.韵母_iu:
        case PY标记.韵母_ing:
        case PY标记.韵母_u:
        case PY标记.韵母_ue:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母j三拼韵母(p: 三拼韵母组): p is j可三双拼韵母 {
    // [韵母_i, 韵母_a] | [韵母_i, 韵母_ai] | [韵母_i, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_i, 韵母_ong] | [韵母_u, 韵母_an] | [韵母_u, 韵母_e]
    return p[0].标记 === PY标记.韵母_i && (p[1].标记 === PY标记.韵母_a || p[1].标记 === PY标记.韵母_ai || p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ao || p[1].标记 === PY标记.韵母_ang || p[1].标记 === PY标记.韵母_ong)
        || p[0].标记 === PY标记.韵母_u && (p[1].标记 === PY标记.韵母_an)
}


export function 是声母q(p: 拼音节点): p is 声母_q {
    return p.标记 === PY标记.声母_q
}
export function 是声母q双拼韵母(p: 拼音节点): p is q可双拼韵母 {
    return 是声母j双拼韵母(p)
}
export function 是声母q三拼韵母(p: 三拼韵母组): p is q可三双拼韵母 {
    return 是声母j三拼韵母(p)
}


export function 是声母x(p: 拼音节点): p is 声母_x {
    return p.标记 === PY标记.声母_x
}
export function 是声母x双拼韵母(p: 拼音节点): p is x可双拼韵母 {
    return 是声母j双拼韵母(p)
}
export function 是声母x三拼韵母(p: 三拼韵母组): p is x可三双拼韵母 {
    return 是声母j三拼韵母(p)
}


export function 是声母zh(p: 拼音节点): p is 声母_zh {
    return p.标记 === PY标记.声母_zh
}
export function 是声母zh双拼韵母(p: 拼音节点): p is zh可双拼韵母 {
    switch (p.标记) {
        // 韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_iu:
        case PY标记.韵母_ou:
        case PY标记.韵母_ong:
        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母zh三拼韵母(p: 三拼韵母组): p is zh可三双拼韵母 {
    // [韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_u, 韵母_ang] | [韵母_u, 韵母_o]
    return (p[0].标记 === PY标记.韵母_u && (p[1].标记 === PY标记.韵母_a || p[1].标记 === PY标记.韵母_o || p[1].标记 === PY标记.韵母_ai || p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_ang))
}


export function 是声母ch(p: 拼音节点): p is 声母_ch {
    return p.标记 === PY标记.声母_ch
}

export function 是声母ch双拼韵母(p: 拼音节点): p is ch可双拼韵母 {
    return 是声母r双拼韵母(p) || p.标记 === PY标记.韵母_a || p.标记 === PY标记.韵母_ai
}

export function 是声母ch三拼韵母(p: 三拼韵母组): p is ch可三双拼韵母 {
    // [韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_i, 韵母_ang] | [韵母_u, 韵母_o]
    return 是声母zh三拼韵母(p)
}



export function 是声母sh(p: 拼音节点): p is 声母_sh {
    return p.标记 === PY标记.声母_sh
}

export function 是声母sh双拼韵母(p: 拼音节点): p is sh可双拼韵母 {
    switch (p.标记) {
        //韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_ei | 韵母_en | 韵母_eng | 韵母_i | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:
        case PY标记.韵母_ou:
        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}

export function 是声母sh三拼韵母(p: 三拼韵母组): p is ch可三双拼韵母 {
    // [韵母_u, 韵母_a] | [韵母_u, 韵母_ai] | [韵母_u, 韵母_an] | [韵母_u, 韵母_ang] | [韵母_u, 韵母_o]
    return 是声母zh三拼韵母(p)
}

export function 是声母r(p: 拼音节点): p is 声母_r {
    return p.标记 === PY标记.声母_r
}
export function 是声母r双拼韵母(p: 拼音节点): p is r可双拼韵母 {
    switch (p.标记) {
        // 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_en | 韵母_eng | 韵母_i | 韵母_ong | 韵母_ou | 韵母_u | 韵母_ui | 韵母_un
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_i:

        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_u:
        case PY标记.韵母_ui:
        case PY标记.韵母_un:
            return true
        default:
            return false
    }
}
export function 是声母r三拼韵母(p: 三拼韵母组): p is r可三双拼韵母 {
    // [韵母_u, 韵母_an] | [韵母_u, 韵母_o]
    return p[0].标记 === PY标记.韵母_u && (p[1].标记 === PY标记.韵母_an || p[1].标记 === PY标记.韵母_o)
}


export function 是声母z(p: 拼音节点): p is 声母_z {
    return p.标记 === PY标记.声母_z
}
export function 是声母z双拼韵母(p: 拼音节点): p is z可双拼韵母 {
    return 是声母g双拼韵母(p) || p.标记 === PY标记.韵母_i
}
export function 是声母z三拼韵母(p: 三拼韵母组): p is z可三双拼韵母 {
    return 是声母r三拼韵母(p)
}

export function 是声母c(p: 拼音节点): p is 声母_c {
    return p.标记 === PY标记.声母_c
}
export function 是声母c双拼韵母(p: 拼音节点): p is c可双拼韵母 {
    return 是声母ch双拼韵母(p)
}
export function 是声母c三拼韵母(p: 三拼韵母组): p is c可三双拼韵母 {
    return 是声母r三拼韵母(p)
}

export function 是声母s(p: 拼音节点): p is 声母_s {
    return p.标记 === PY标记.声母_s
}
export function 是声母s双拼韵母(p: 拼音节点): p is s可双拼韵母 {
    return 是声母c双拼韵母(p)
}
export function 是声母s三拼韵母(p: 三拼韵母组): p is s可三双拼韵母 {
    return 是声母r三拼韵母(p)
}

export function 是声母y(p: 拼音节点): p is 声母_y {
    return p.标记 === PY标记.声母_y
}

export function 是韵母a(p: 拼音节点): p is 韵母_a {
    return p.标记 === PY标记.韵母_a
}

export function 是韵母o(p: 拼音节点): p is 韵母_o {
    return p.标记 === PY标记.韵母_o
}
export function 是韵母e(p: 拼音节点): p is 韵母_e {
    return p.标记 === PY标记.韵母_e
}
export function 是韵母i(p: 拼音节点): p is 韵母_i {
    return p.标记 === PY标记.韵母_i
}
export function 是韵母u(p: 拼音节点): p is 韵母_u {
    return p.标记 === PY标记.韵母_u
}
export function 是韵母v(p: 拼音节点): p is 韵母_v {
    return p.标记 === PY标记.韵母_v
}

export function 是声母y双拼韵母(p: 拼音节点): p is y可双拼韵母 {
    switch (p.标记) {
        //  韵母_a | 韵母_an | 韵母_ang | 韵母_ao | 韵母_e | 韵母_i | 韵母_in | 韵母_ing |  韵母_ong | 韵母_ou | 韵母_u | 韵母_un | 韵母_ue
        case PY标记.韵母_a:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:
        case PY标记.韵母_ao:

        case PY标记.韵母_e:

        case PY标记.韵母_i:
        case PY标记.韵母_in:
        case PY标记.韵母_ing:

        case PY标记.韵母_o:
        case PY标记.韵母_ou:
        case PY标记.韵母_ong:

        case PY标记.韵母_u:
        case PY标记.韵母_un:
        case PY标记.韵母_ue:
            return true
        default:
            return false
    }
}

export function 是声母y三拼韵母(p: 三拼韵母组): p is y可三双拼韵母 {
    //  [韵母_u, 韵母_an] | [韵母_u, 韵母_e]
    return p[0].标记 === PY标记.韵母_u && p[1].标记 === PY标记.韵母_an
}

export function 是声母w(p: 拼音节点): p is 声母_w {
    return p.标记 === PY标记.声母_w
}

export function 是声母w双拼韵母(p: 拼音节点): p is w可双拼韵母 {
    switch (p.标记) {
        //   韵母_a | 韵母_ai | 韵母_an | 韵母_ang | 韵母_ei | 韵母_en | 韵母_eng | 韵母_o | 韵母_u
        case PY标记.韵母_a:
        case PY标记.韵母_ai:
        case PY标记.韵母_an:
        case PY标记.韵母_ang:

        case PY标记.韵母_ei:
        case PY标记.韵母_en:
        case PY标记.韵母_eng:

        case PY标记.韵母_o:
        case PY标记.韵母_u:
            return true
        default:
            return false
    }
}

export function 是单引号(p: 拼音节点): p is 单引号 {
    return p.标记 === PY标记.单引号
}

export function 是三拼韵母组(p:韵母|三拼韵母组): p is 三拼韵母组{
    return 是数组(p)
}

export const 标记转文本 = {
    [PY标记.结尾]: "",
    [PY标记.单引号]: "'",
    [PY标记.逗号]: ",",
    [PY标记.声母_b]: "b",
    [PY标记.声母_p]: "p",
    [PY标记.声母_m]: "m",
    [PY标记.声母_f]: "f",
    [PY标记.声母_d]: "d",
    [PY标记.声母_t]: "t",
    [PY标记.声母_n]: "n",
    [PY标记.声母_l]: "l",
    [PY标记.声母_g]: "g",
    [PY标记.声母_k]: "k",
    [PY标记.声母_h]: "h",
    [PY标记.声母_j]: "j",
    [PY标记.声母_q]: "q",
    [PY标记.声母_x]: "x",
    [PY标记.声母_zh]: "zh",
    [PY标记.声母_ch]: "ch",
    [PY标记.声母_sh]: "sh",
    [PY标记.声母_r]: "r",
    [PY标记.声母_z]: "z",
    [PY标记.声母_c]: "c",
    [PY标记.声母_s]: "s",
    [PY标记.声母_y]: "y",
    [PY标记.声母_w]: "w",
    [PY标记.韵母_a]: "a",
    [PY标记.韵母_an]: "an",
    [PY标记.韵母_ang]: "ang",
    [PY标记.韵母_ai]: "ai",
    [PY标记.韵母_ao]: "ao",
    [PY标记.韵母_o]: "o",
    [PY标记.韵母_ou]: "ou",
    [PY标记.韵母_ong]: "ong",
    [PY标记.韵母_e]: "e",
    [PY标记.韵母_ei]: "ei",
    [PY标记.韵母_er]: "er",
    [PY标记.韵母_en]: "en",
    [PY标记.韵母_eng]: "eng",
    [PY标记.韵母_i]: "i",
    [PY标记.韵母_ie]: "ie",
    [PY标记.韵母_iu]: "iu",
    [PY标记.韵母_in]: "in",
    [PY标记.韵母_ing]: "ing",
    [PY标记.韵母_u]: "u",
    [PY标记.韵母_ui]: "ui",
    [PY标记.韵母_ue]: "ue",
    [PY标记.韵母_un]: "un",
    [PY标记.韵母_v]: "v",
    [PY标记.韵母_ve]: "ve",
    [PY标记.韵母_vn]: "vn",
}

export function 是双节声母(p: 声母) {
    return p.标记 === PY标记.声母_zh || p.标记 === PY标记.声母_ch || p.标记 === PY标记.声母_sh
}

export function 是双元韵母(p: 拼音节点) {
    return p.标记 >= PY标记.韵母_ao && p.标记 <= PY标记.韵母_er
}
export function 是单元韵母(p: 拼音节点) {
    return p.标记 >= PY标记.韵母_a && p.标记 <= PY标记.韵母_v
}
export function 是三元韵母(p: 拼音节点) {
    return p.标记 >= PY标记.韵母_ang && p.标记 <= PY标记.韵母_ong

}
export function 是三拼连读(p1: 拼音) {
    return p1.声母 && p1.韵母 && 是数组(p1.韵母)
}

export function 是整体音读(p1: 拼音) {
    return p1.文本 === "zhi" || p1.文本 === "chi" || p1.文本 === "shi"
        || p1.文本 === "zi" || p1.文本 === "ci" || p1.文本 === "si"
        || p1.文本 === "ri"
        || p1.文本 === "yi" || p1.文本 === "yu" || p1.文本 === "ye" || p1.文本 === "yue" || p1.文本 === "yin"
        || p1.文本 === "yun" || p1.文本 === "ying" || p1.文本 === "yuan"
        || p1.文本 === "wu"

}

export function 取拼音文本(p1?: 声母, p2?: 韵母, p3?: 三拼无音韵母) {
    if (p1 && p2 && p3) {
        return 转为文本(p1.标记) + 转为文本(p3.标记) + 转为文本(p2.标记)
    } else if (p1 && p2) {
        return 转为文本(p1.标记) + 转为文本(p2.标记)
    } else if (p1) {
        return 转为文本(p1.标记)
    } else if (p2) {
        return 转为文本(p2.标记)
    } else {
        return ""
    }
}

export function 是分割符(py: 拼音) {
    return py.标记 === PY标记.单引号
}

export function 创建分隔符() {
    let 拼音 = 创建对象<拼音>()
    拼音.标记 = PY标记.单引号
    拼音.文本 = "'"
    return 拼音
}

export function 创建拼音(p1?: 声母, p2?: 韵母, p3?: 三拼无音韵母) {
    let 拼音 = 创建对象<拼音>()
    拼音.声母 = p1
    拼音.韵母 = p3 && 是三拼韵母(p2) ? [p3, p2] : p2
    拼音.文本 = 取拼音文本(p1, p2, p3)
    拼音.可分割 = (p1 && (是声母zh(p1) || 是声母ch(p1) || 是声母sh(p1))) || !!p3 || (p2 && p2.文本.length > 1)
    拼音.可拆分 = 拼音.可分割 ? 计算分割系数(p1, p2, p3) : 0
    计算位置(拼音)
    return 拼音
}
export function 计算位置(py: 拼音) {
    if (py.声母) {
        py.开始 = py.声母.开始
    } if (!py.韵母) {
        py.结尾 == py.声母.结尾
        return
    }
    if (py.韵母 && 是数组(py.韵母)) {
        let 尾 = py.韵母[1]
        py.结尾 = 尾.结尾
        if (!py.开始) {
            let 头 = py.韵母[0]
            py.开始 = 头.开始
        }
        return
    } else if (py.韵母 && !是数组(py.韵母)) {
        py.结尾 = py.韵母.结尾
        if (!py.开始) {
            py.开始 = py.韵母.开始
        }
        return
    }
    return
}

export function 重组拼音(ps: 拼音[]) {
    let 插入位置: number[] = []
    let i = ps.length - 1
    while (i >= 0) {
        let p = ps[i - 1]
        let p2 = ps[i]
        if (p2) {
            if (!p2.声母 && p && p.可拆分 & 拼音拆分标记.可分割出声母) {
                if (p.可拆分 & 拼音拆分标记.可分割出声母) {
                    let p2韵母 = p2.韵母
                    let 验证: 韵母 | 三拼韵母组 = p2韵母
                    if (!是数组(p2.韵母)) {
                        if (是韵母i(p2.韵母 as 韵母) || 是韵母u(p2.韵母 as 韵母)) {
                            // 可组 三拼
                            let p3 = ps[i + 1]
                            if (p3 && !p3.声母) {
                                验证 = [p2.韵母, p3.韵母] as 三拼韵母组
                            }
                        }
                    }
                    let 通过验证 = false
                    if (p.可拆分 & 拼音拆分标记.可分割出尾声母g) {
                        if (是数组(验证) && 是声母g三拼韵母(验证)) {
                            通过验证 = true
                        } else if (是声母g双拼韵母(验证 as 韵母)) {
                            通过验证 = true
                        }
                    } else if (p.可拆分 & 拼音拆分标记.可分割出尾声母n) {
                        if (是数组(验证) && 是声母n三拼韵母(验证)) {
                            通过验证 = true
                        } else if (是声母n双拼韵母(验证 as 韵母)) {
                            通过验证 = true
                        }

                    } else if (p.可拆分 & 拼音拆分标记.可分割出尾声母r) {
                        if (是数组(验证) && 是声母r三拼韵母(验证)) {
                            通过验证 = true
                        } else if (是声母r双拼韵母(验证 as 韵母)) {
                            通过验证 = true
                        }
                    }
                    通过验证 ? 插入位置.push(取拼音开始位置(p2) - 1) : undefined
                }
            }
        }
        i--
    }
    let 重新编译 = 插入位置.length ? 插入分隔(取拼音组原始文本(ps), 插入位置) : null
    return 重新编译 ? 编译拼音(重新编译) : ps
}

function 取拼音开始位置(p: 拼音) {
    if (p.声母) {
        return p.声母.开始
    } else if (p.韵母) {
        if (是数组(p.韵母)) {
            return p.韵母[0].开始
        } else {
            return p.韵母.开始
        }
    }
}

export function 插入分隔(拼音组文本: string, 位置: number[]) {
    let 结果: string[] = []
    for (let i = 0, ii = 0, iii: number; i < 位置.length; i++) {
        iii = 位置[i]
        结果.push(拼音组文本.substr(ii, iii))
        if (i === 位置.length - 1) {
            结果.push(拼音组文本.substr(iii))
        }
        ii = iii
    }
    return 结果.join("'")
}

export function 取拼音组原始文本(拼音组: 拼音[]) {
    let 结果 = ""
    拼音组.forEach(v => {
        结果 += v.文本
    })
    return 结果
}


export enum 拼音拆分标记 {
    无 = 0,
    可分割成两部分 = 1,
    可分割成三部分 = 1 << 1,
    可分割出尾单韵母 = 1 << 2,
    可分割出尾声母g = 1 << 3,
    可分割出尾声母n = 1 << 4,
    可分割出尾声母r = 1 << 5,
    可分割出声母 = 可分割出尾声母g | 可分割出尾声母n | 可分割出尾声母r
}

export function 计算分割系数(p1: 声母, p2: 韵母, p3: 韵母) {
    let 结果: number = 拼音拆分标记.无
    if (p1 && p2 && p3) {
        if (是整体音读({ 声母: p1, 韵母: [p3, p2] } as 拼音)) {
            return 拼音拆分标记.无
        }
        结果 |= 拼音拆分标记.可分割成三部分
    }
    if (p1 && p2 && !p3) {
        结果 |= 拼音拆分标记.可分割成两部分
    }
    if (p2) {
        if (是g尾韵母且不是ong(p2)) {
            结果 |= 拼音拆分标记.可分割出尾声母g
        }
        if (是n尾韵母(p2)) {
            结果 |= 拼音拆分标记.可分割出尾声母n
        }
        if (是r尾韵母(p2)) {
            结果 |= 拼音拆分标记.可分割出尾声母r
        }
        if (是双元韵母(p2) && !是r尾韵母(p2)) {
            结果 |= 拼音拆分标记.可分割出尾单韵母
        }
    }
    return 结果
}

function 是n尾韵母(p: 韵母) {
    return p.标记 >= PY标记.韵母_an && p.标记 <= PY标记.韵母_un
}
function 是r尾韵母(p: 韵母) {
    return p.标记 === PY标记.韵母_er
}
function 是g尾韵母且不是ong(p: 韵母) {
    return p.标记 === PY标记.韵母_ang || p.标记 === PY标记.韵母_eng || p.标记 === PY标记.韵母_ing
}

export function 编译拼音(拼音文本: string): 拼音[] {
    try {
        拼音文本 = 拼音文本.replace(/\s+/g, "")
        let 拼音 = 拼音文本扫描(拼音文本)
        let 结果: 拼音[] = []
        if (拼音 && 拼音.内容组.length) {
            let pos = 0
            while (pos < 拼音.内容组.length) {
                let p = 拼音.内容组[pos]
                if (是单引号(p)) {
                    pos++
                } else if (是声母(p)) {
                    let p2 = 拼音.内容组[pos + 1]
                    if (p2 && 是单引号(p2)) {
                        // 分隔符强行分割
                        pos++
                        结果.push(创建拼音(p))
                        continue
                    } else if (p2 && 是韵母(p2)) {
                        if (p2 && 是三拼无音韵母(p2)) {
                            let p3 = 拼音.内容组[pos + 2]
                            if (p3 && 是韵母(p3) && 是三拼韵母(p3) && 是声母三拼韵母(p, [p2, p3])) {
                                // 三拼
                                pos += 3
                                结果.push(创建拼音(p, p3, p2))
                                continue
                            } else if (是声母双拼韵母(p, p2)) {
                                // 与 三拼无音字母 双拼
                                pos += 2
                                结果.push(创建拼音(p, p2))
                                continue
                            }
                        } else if (p2 && 是声母双拼韵母(p, p2)) {
                            // 双拼
                            pos += 2
                            结果.push(创建拼音(p, p2))
                            continue
                        }
                    }
                    // p 是独立声母
                    pos++
                    结果.push(创建拼音(p))
                    continue
                } else if (是韵母(p)) {
                    // 是独立 韵母
                    pos++
                    结果.push(创建拼音(undefined, p))
                    continue
                }
            }
        }
        if (结果 && 结果.length) {
            return 结果
        }
    } catch (err) {
        return
    }
}

export function 拼音文本扫描(p: string): 拼音组 {
    p = p.toLowerCase()
    if (!是拼音字符串(p)) {
        return 
    }

    let pos = 0
    let end = pos
    let 当前语义: PY标记

    return 编译()


    function 创建拼音组(初始组?: Array<拼音节点>) {
        let 拼音组 = 创建对象<拼音组>()
        拼音组.开始 = 0
        拼音组.结尾 = p.length
        拼音组.内容组 = 初始组 || []
        return 拼音组
    }

    function 创建拼音节点<T extends 拼音节点>(标记: T["标记"]): T {
        let 拼音 = 创建对象<T>()
        拼音.标记 = 标记
        拼音.开始 = 取开始()
        拼音.结尾 = 取结尾()
        拼音.文本 = 转为文本(拼音.标记)
        当前语义 = 下个()
        return 拼音
    }

    function 编译() {
        let 拼音组 = 创建拼音组()
        当前语义 = 下个()
        标签: while (true) {
            switch (当前语义) {
                case PY标记.结尾:
                    break 标签
                case PY标记.单引号:
                    拼音组.内容组.push(创建拼音节点<单引号>(PY标记.单引号))
                    break
                case PY标记.声母_b:
                    拼音组.内容组.push(创建拼音节点<声母_b>(PY标记.声母_b))
                    break
                case PY标记.声母_p:
                    拼音组.内容组.push(创建拼音节点<声母_p>(PY标记.声母_p))
                    break
                case PY标记.声母_m:
                    拼音组.内容组.push(创建拼音节点<声母_m>(PY标记.声母_m))
                    break
                case PY标记.声母_f:
                    拼音组.内容组.push(创建拼音节点<声母_f>(PY标记.声母_f))
                    break
                case PY标记.声母_d:
                    拼音组.内容组.push(创建拼音节点<声母_d>(PY标记.声母_d))
                    break
                case PY标记.声母_t:
                    拼音组.内容组.push(创建拼音节点<声母_t>(PY标记.声母_t))
                    break
                case PY标记.声母_n:
                    拼音组.内容组.push(创建拼音节点<声母_n>(PY标记.声母_n))
                    break
                case PY标记.声母_l:
                    拼音组.内容组.push(创建拼音节点<声母_l>(PY标记.声母_l))
                    break
                case PY标记.声母_g:
                    拼音组.内容组.push(创建拼音节点<声母_g>(PY标记.声母_g))
                    break
                case PY标记.声母_k:
                    拼音组.内容组.push(创建拼音节点<声母_k>(PY标记.声母_k))
                    break
                case PY标记.声母_h:
                    拼音组.内容组.push(创建拼音节点<声母_h>(PY标记.声母_h))
                    break
                case PY标记.声母_j:
                    拼音组.内容组.push(创建拼音节点<声母_j>(PY标记.声母_j))
                    break
                case PY标记.声母_q:
                    拼音组.内容组.push(创建拼音节点<声母_q>(PY标记.声母_q))
                    break
                case PY标记.声母_x:
                    拼音组.内容组.push(创建拼音节点<声母_x>(PY标记.声母_x))
                    break
                case PY标记.声母_zh:
                    拼音组.内容组.push(创建拼音节点<声母_zh>(PY标记.声母_zh))
                    break
                case PY标记.声母_ch:
                    拼音组.内容组.push(创建拼音节点<声母_ch>(PY标记.声母_ch))
                    break
                case PY标记.声母_sh:
                    拼音组.内容组.push(创建拼音节点<声母_sh>(PY标记.声母_sh))
                    break
                case PY标记.声母_r:
                    拼音组.内容组.push(创建拼音节点<声母_r>(PY标记.声母_r))
                    break
                case PY标记.声母_z:
                    拼音组.内容组.push(创建拼音节点<声母_z>(PY标记.声母_z))
                    break
                case PY标记.声母_c:
                    拼音组.内容组.push(创建拼音节点<声母_c>(PY标记.声母_c))
                    break
                case PY标记.声母_s:
                    拼音组.内容组.push(创建拼音节点<声母_s>(PY标记.声母_s))
                    break
                case PY标记.声母_y:
                    拼音组.内容组.push(创建拼音节点<声母_y>(PY标记.声母_y))
                    break
                case PY标记.声母_w:
                    拼音组.内容组.push(创建拼音节点<声母_w>(PY标记.声母_w))
                    break
                // 韵母
                case PY标记.韵母_a:
                    拼音组.内容组.push(创建拼音节点<韵母_a>(PY标记.韵母_a))
                    break
                case PY标记.韵母_o:
                    拼音组.内容组.push(创建拼音节点<韵母_o>(PY标记.韵母_o))
                    break
                case PY标记.韵母_e:
                    拼音组.内容组.push(创建拼音节点<韵母_e>(PY标记.韵母_e))
                    break
                case PY标记.韵母_i:
                    拼音组.内容组.push(创建拼音节点<韵母_i>(PY标记.韵母_i))
                    break
                case PY标记.韵母_u:
                    拼音组.内容组.push(创建拼音节点<韵母_u>(PY标记.韵母_u))
                    break
                case PY标记.韵母_v:
                    拼音组.内容组.push(创建拼音节点<韵母_v>(PY标记.韵母_v))
                    break
                case PY标记.韵母_ai:
                    拼音组.内容组.push(创建拼音节点<韵母_ai>(PY标记.韵母_ai))
                    break
                case PY标记.韵母_ei:
                    拼音组.内容组.push(创建拼音节点<韵母_ei>(PY标记.韵母_ei))
                    break
                case PY标记.韵母_ui:
                    拼音组.内容组.push(创建拼音节点<韵母_ui>(PY标记.韵母_ui))
                    break
                case PY标记.韵母_ao:
                    拼音组.内容组.push(创建拼音节点<韵母_ao>(PY标记.韵母_ao))
                    break
                case PY标记.韵母_ou:
                    拼音组.内容组.push(创建拼音节点<韵母_ou>(PY标记.韵母_ou))
                    break
                case PY标记.韵母_iu:
                    拼音组.内容组.push(创建拼音节点<韵母_iu>(PY标记.韵母_iu))
                    break
                case PY标记.韵母_ie:
                    拼音组.内容组.push(创建拼音节点<韵母_ie>(PY标记.韵母_ie))
                    break
                case PY标记.韵母_ve:
                    拼音组.内容组.push(创建拼音节点<韵母_ve>(PY标记.韵母_ve))
                    break
                case PY标记.韵母_ue:
                    拼音组.内容组.push(创建拼音节点<韵母_ue>(PY标记.韵母_ue))
                    break
                case PY标记.韵母_un:
                    拼音组.内容组.push(创建拼音节点<韵母_un>(PY标记.韵母_un))
                    break
                case PY标记.韵母_er:
                    拼音组.内容组.push(创建拼音节点<韵母_er>(PY标记.韵母_er))
                    break
                case PY标记.韵母_an:
                    拼音组.内容组.push(创建拼音节点<韵母_an>(PY标记.韵母_an))
                    break
                case PY标记.韵母_en:
                    拼音组.内容组.push(创建拼音节点<韵母_en>(PY标记.韵母_en))
                    break
                case PY标记.韵母_in:
                    拼音组.内容组.push(创建拼音节点<韵母_in>(PY标记.韵母_in))
                    break
                case PY标记.韵母_ang:
                    拼音组.内容组.push(创建拼音节点<韵母_ang>(PY标记.韵母_ang))
                    break
                case PY标记.韵母_eng:
                    拼音组.内容组.push(创建拼音节点<韵母_eng>(PY标记.韵母_eng))
                    break
                case PY标记.韵母_ing:
                    拼音组.内容组.push(创建拼音节点<韵母_ing>(PY标记.韵母_ing))
                    break
                case PY标记.韵母_ong:
                    拼音组.内容组.push(创建拼音节点<韵母_ong>(PY标记.韵母_ong))
                    break
            }
        }
        return 拼音组
    }

    function 下个() {
        return 扫描()
    }

    function 取开始() {
        return Math.min(end, pos)
    }

    function 取结尾() {
        return Math.max(end, pos)
    }

    function 扫描() {
        end = pos
        while (true) {
            if (pos >= p.length) {
                return PY标记.结尾
            }
            let ch = p.charCodeAt(pos)
            switch (ch) {
                case Py.单引号:
                    pos++
                    return PY标记.单引号
                case Py.b:
                    pos++
                    return PY标记.声母_b
                case Py.p:
                    pos++
                    return PY标记.声母_p
                case Py.m:
                    pos++
                    return PY标记.声母_m
                case Py.f:
                    pos++
                    return PY标记.声母_f
                case Py.d:
                    pos++
                    return PY标记.声母_d
                case Py.t:
                    pos++
                    return PY标记.声母_t
                case Py.j:
                    pos++
                    return PY标记.声母_j
                case Py.q:
                    pos++
                    return PY标记.声母_q
                case Py.x:
                    pos++
                    return PY标记.声母_x
                case Py.l:
                    pos++
                    return PY标记.声母_l
                case Py.k:
                    pos++
                    return PY标记.声母_k
                case Py.w:
                    pos++
                    return PY标记.声母_w
                case Py.y:
                    pos++
                    return PY标记.声母_y
                case Py.n:
                    if (!(p.charCodeAt(pos - 1) === Py.a || p.charCodeAt(pos - 1) === Py.a1 || p.charCodeAt(pos - 1) === Py.a2 || p.charCodeAt(pos - 1) === Py.a3 || p.charCodeAt(pos - 1) === Py.a4
                        || (p.charCodeAt(pos - 1) === Py.o || p.charCodeAt(pos - 1) === Py.o1 || p.charCodeAt(pos - 1) === Py.o2 || p.charCodeAt(pos - 1) === Py.o3 || p.charCodeAt(pos - 1) === Py.o4) && p.charCodeAt(pos + 1) === Py.g
                        || p.charCodeAt(pos - 1) === Py.e || p.charCodeAt(pos - 1) === Py.e1 || p.charCodeAt(pos - 1) === Py.e2 || p.charCodeAt(pos - 1) === Py.e3 || p.charCodeAt(pos - 1) === Py.e4
                        || (p.charCodeAt(pos - 1) === Py.i || p.charCodeAt(pos - 1) === Py.i1 || p.charCodeAt(pos - 1) === Py.i2 || p.charCodeAt(pos - 1) === Py.i3 || p.charCodeAt(pos - 1) === Py.i4) && p.charCodeAt(pos + 1) === Py.g
                        || p.charCodeAt(pos - 1) === Py.u || p.charCodeAt(pos - 1) === Py.u1 || p.charCodeAt(pos - 1) === Py.u2 || p.charCodeAt(pos - 1) === Py.u3 || p.charCodeAt(pos - 1) === Py.u4
                        || p.charCodeAt(pos - 1) === Py.v || p.charCodeAt(pos - 1) === Py.v0 || p.charCodeAt(pos - 1) === Py.v1 || p.charCodeAt(pos - 1) === Py.v2 || p.charCodeAt(pos - 1) === Py.v3 || p.charCodeAt(pos - 1) === Py.v4)) {
                        pos++
                        return PY标记.声母_n
                    }
                    break
                case Py.g:
                    if (!(p.charCodeAt(pos - 1) === Py.n && (p.charCodeAt(pos - 2) === Py.a || p.charCodeAt(pos - 2) === Py.a1 || p.charCodeAt(pos - 2) === Py.a2 || p.charCodeAt(pos - 2) === Py.a3 || p.charCodeAt(pos - 2) === Py.a4
                        || p.charCodeAt(pos - 2) === Py.o || p.charCodeAt(pos - 2) === Py.o1 || p.charCodeAt(pos - 2) === Py.o2 || p.charCodeAt(pos - 2) === Py.o3 || p.charCodeAt(pos - 2) === Py.o4
                        || p.charCodeAt(pos - 2) === Py.e || p.charCodeAt(pos - 2) === Py.e1 || p.charCodeAt(pos - 2) === Py.e2 || p.charCodeAt(pos - 2) === Py.e3 || p.charCodeAt(pos - 2) === Py.e4
                        || p.charCodeAt(pos - 2) === Py.i || p.charCodeAt(pos - 2) === Py.i1 || p.charCodeAt(pos - 2) === Py.i2 || p.charCodeAt(pos - 2) === Py.i3 || p.charCodeAt(pos - 2) === Py.i4))) {
                        pos++
                        return PY标记.声母_g
                    }
                    break
                case Py.h:
                    if (p.charCodeAt(pos - 1) === Py.z) {
                        pos++
                        return PY标记.声母_zh
                    } else if (p.charCodeAt(pos - 1) === Py.c) {
                        pos++
                        return PY标记.声母_ch
                    } if (p.charCodeAt(pos - 1) === Py.s) {
                        pos++
                        return PY标记.声母_sh
                    } else {
                        pos++
                        return PY标记.声母_h
                    }
                case Py.z:
                    if (p.charCodeAt(pos + 1) !== Py.h) {
                        pos++
                        return PY标记.声母_z
                    }
                    break
                case Py.c:

                    if (p.charCodeAt(pos + 1) !== Py.h) {
                        pos++
                        return PY标记.声母_c
                    }
                    break
                case Py.s:
                    if (p.charCodeAt(pos + 1) !== Py.h) {
                        pos++
                        return PY标记.声母_s
                    }
                    break
                case Py.r:
                    if (p.charCodeAt(pos - 1) !== Py.e) {
                        pos++
                        return PY标记.声母_r
                    }
                    break
                default:
                    if (ch === Py.a || ch === Py.a1 || ch === Py.a2 || ch === Py.a3 || ch === Py.a4) {
                        if (p.charCodeAt(pos + 1) === Py.o) {
                            pos += 2
                            return PY标记.韵母_ao
                        } else if (p.charCodeAt(pos + 1) === Py.i) {
                            pos += 2
                            return PY标记.韵母_ai
                        } else if (p.charCodeAt(pos + 1) === Py.n && p.charCodeAt(pos + 2) === Py.g) {
                            pos += 3
                            return PY标记.韵母_ang
                        } else if (p.charCodeAt(pos + 1) === Py.n) {
                            pos++
                            return PY标记.韵母_an
                        } else {
                            pos++
                            return PY标记.韵母_a
                        }
                    } else if (ch === Py.o || ch === Py.o1 || ch === Py.o2 || ch === Py.o3 || ch === Py.o4) {
                        if (p.charCodeAt(pos + 1) === Py.n && p.charCodeAt(pos + 2) === Py.g) {
                            pos += 3
                            return PY标记.韵母_ong
                        } else if (p.charCodeAt(pos + 1) === Py.u) {
                            pos += 2
                            return PY标记.韵母_ou
                        } else {
                            pos++
                            return PY标记.韵母_o
                        }
                    } else if (ch === Py.e || ch === Py.e1 || ch === Py.e2 || ch === Py.e3 || ch === Py.e4) {
                        if (p.charCodeAt(pos + 1) === Py.n && p.charCodeAt(pos + 2) === Py.g) {
                            pos += 3
                            return PY标记.韵母_eng
                        } else if (p.charCodeAt(pos + 1) === Py.n) {
                            pos += 2
                            return PY标记.韵母_en
                        } else if (p.charCodeAt(pos + 1) === Py.r) {
                            pos += 2
                            return PY标记.韵母_er
                        } else if (p.charCodeAt(pos + 1) === Py.i) {
                            pos += 2
                            return PY标记.韵母_ei
                        } else {
                            pos++
                            return PY标记.韵母_e
                        }
                    } else if (ch === Py.i || ch === Py.i1 || ch === Py.i2 || ch === Py.i3 || ch === Py.i4) {
                        if (p.charCodeAt(pos + 1) === Py.n && p.charCodeAt(pos + 2) === Py.g) {
                            pos += 3
                            return PY标记.韵母_ing
                        } else if (p.charCodeAt(pos + 1) === Py.n) {
                            pos += 2
                            return PY标记.韵母_in
                        } else if (p.charCodeAt(pos + 1) === Py.u || p.charCodeAt(pos + 1) === Py.u1 || p.charCodeAt(pos + 1) === Py.u2 || p.charCodeAt(pos + 1) === Py.u3 || p.charCodeAt(pos + 1) === Py.u4) {
                            pos += 2
                            return PY标记.韵母_iu
                        } else if (p.charCodeAt(pos + 1) === Py.e) {
                            pos += 2
                            return PY标记.韵母_ie
                        } else {
                            pos++
                            return PY标记.韵母_i
                        }
                    } else if (ch === Py.u || ch === Py.u1 || ch === Py.u2 || ch === Py.u3 || ch === Py.u4) {
                        if (p.charCodeAt(pos + 1) === Py.n) {
                            pos += 2
                            return PY标记.韵母_un
                        } else if (p.charCodeAt(pos + 1) === Py.i || p.charCodeAt(pos + 1) === Py.i1 || p.charCodeAt(pos + 1) === Py.i2 || p.charCodeAt(pos + 1) === Py.i3 || p.charCodeAt(pos + 1) === Py.i4) {
                            pos += 2
                            return PY标记.韵母_ui
                        } else if (p.charCodeAt(pos + 1) === Py.e) {
                            pos += 2
                            return PY标记.韵母_ue
                        } else {
                            pos++
                            return PY标记.韵母_u
                        }
                    } else if (ch === Py.v || ch === Py.v0 || ch === Py.v1 || ch === Py.v2 || ch === Py.v3 || ch === Py.v4) {
                        if (p.charCodeAt(pos + 1) === Py.n) {
                            pos += 2
                            return PY标记.韵母_vn
                        } else if (p.charCodeAt(pos + 1) === Py.e) {
                            pos += 2
                            return PY标记.韵母_ve
                        } else {
                            pos++
                            return PY标记.韵母_v
                        }
                    }
                    break
            }
            pos++
        }
    }
}


export function 拼音是相等的(p1: 拼音[], p2: 拼音[]) {
    if (p1 && p2) {
        if (p1.length !== p2.length) {
            return false
        }
        for (let i = 0; i < p1.length; i++) {
            if (p1[i].文本 !== p2[i].文本) {
                return false
            }
        }
        return true
    }
    return false
}

export function 是简拼索引(key: string) {
    let 组 = key.split("'")
    for (let i = 0; i < 组.length; i++) {
        if (组[i].length > 2) {
            return false
        } else if (!是首拼字母(组[i])) {
            return false
        }
    }
    return true
}

export function 是首拼字母(py: string) {
    switch (py) {
        case "a":
        case "o":
        case "e":
        case "i":
        case "u":
        case "v":
        case "b":
        case "p":
        case "m":
        case "f":
        case "d":
        case "t":
        case "n":
        case "l":
        case "g":
        case "k":
        case "h":
        case "j":
        case "q":
        case "x":
        case "z":
        case "c":
        case "s":
        case "r":
        case "zh":
        case "ch":
        case "sh":
        case "y":
        case "w":
            return true
        default:
            return false

    }

}

export function 中间有分割符(p: 拼音, p2: 拼音) {
    if (p.开始 === p2.开始) {
        return false
    }
    let 前面 = p.开始 > p2.开始 ? p2 : p
    let 后面 = p.开始 > p2.开始 ? p : p2
    if (前面.结尾 !== 后面.开始) {
        return true
    }
    return false
}

export function 取拼音索引简拼(拼音文本: string) {
    let ch = 拼音文本.charCodeAt(0)
    if (ch === Py.c || ch === Py.z || ch === Py.s) {
        let ch2 = 拼音文本.charCodeAt(1)
        if (ch2 === Py.h) return 拼音文本.slice(0, 2)
    }
    return 拼音文本[0]

}
