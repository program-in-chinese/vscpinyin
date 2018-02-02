import { 拼音 } from "./编译拼音";

export const enum 比较 {
    小于 = -1,
    等于 = 0,
    大于 = 1
}

export type 比较函数<T> = (a: T, b: T) => 比较;

export interface 可排序 {
    频率?: number
    文本?: string
}

export interface 节点映射<T> {
    [x: string]: T
}

export interface 库内词 extends 可排序 {
    文本: string
    拼音: string
    剩余输入?:string
    频率?: number
}

export interface 拼音验证结果 {
    py1: 拼音[]
    py2: 拼音[]
    包含简拼: boolean
    全为简拼: boolean
    全为全拼: boolean
}

export interface 拼音评估结果 {
    可以重组: boolean
    必须重组: boolean
    包含简拼: boolean
    全为简拼: boolean
    全为全拼: boolean
}

export interface 用户词 extends 库内词 {
    使用次数: number
}

