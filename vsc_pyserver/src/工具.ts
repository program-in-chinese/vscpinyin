
import { 可排序, 节点映射, 比较 } from "./类型枚举";

export function 创建对象<T>(): T {
    let 对象值 = Object.create(null)
    对象值["__"] = null
    delete 对象值["__"]
    return 对象值 as T
}

export function 创建节点映射<T>() {
    return 创建对象<节点映射<T>>()
}

export function 按系数排序_V<T extends 可排序>(a: T, b: T): 比较 {
    if (a === b) return 比较.等于;
    if (a === undefined || a.频率 === undefined) return 比较.大于;
    if (b === undefined || b.频率 === undefined) return 比较.小于;
    if (a.频率 === b.频率) return 比较.等于;
    return a.频率 > b.频率 ? 比较.小于 : 比较.大于;
}

export function 按系数排序_A<T extends 可排序>(a: T, b: T): 比较 {
    if (a === b) return 比较.等于;
    if (a === undefined || a.频率 === undefined) return 比较.小于;
    if (b === undefined || b.频率 === undefined) return 比较.大于;
    if (a.频率 === b.频率) return 比较.等于;
    return a.频率 > b.频率 ? 比较.大于 : 比较.小于;
}

export function 按文本排序_V<T extends 可排序>(a: T, b: T): 比较 {
    if (a === b) return 比较.等于;
    if (a === undefined || a.文本 === undefined) return 比较.大于;
    if (b === undefined || b.文本 === undefined) return 比较.小于;
    if (a.文本 === b.文本) return 比较.等于;
    return a.文本 < b.文本 ? 比较.大于 : 比较.小于;
}

export function 按文本排序_A<T extends 可排序>(a: T, b: T): 比较 {
    if (a === b) return 比较.等于;
    if (a === undefined || a.文本 === undefined) return 比较.小于;
    if (b === undefined || b.文本 === undefined) return 比较.大于;
    if (a.文本 === b.文本) return 比较.等于;
    return a.文本 < b.文本 ? 比较.小于 : 比较.大于;
}

export function 分割读取(s: string, 分隔符: ";" | "\n"|string) {
    if (!s) {
        return () => ""
    }

    let 行 = s.split(分隔符)
    let i = 0

    function 读一行() {
        let 值 = 行[i]
        i++
        return 值
    }

    return 读一行
    
}

export function hash(str: string, 数量:number) {
    let v = 0
    for (let i = 0; i < str.length; i++) {
        v += str[i].charCodeAt(0)
    }
    return v % 数量

}

export function bhash(str: string) {
    switch (str) {
        case "a":
            return 0
        case "b":
            return 1
        case "c":
            return 2
        case "ch":
            return 3
        case "d":
            return 4
        case "e":
            return 5
        case "f":
            return 6
        case "g":
            return 7
        case "h":
            return 8
        case "i":
            return 9
        case "j":
            return 10
        case "k":
            return 11
        case "l":
            return 12
        case "m":
            return 13
        case "n":
            return 14
        case "o":
            return 15
        case "p":
            return 16
        case "q":
            return 17
        case "r":
            return 18
        case "s":
            return 19
        case "sh":
            return 20
        case "t":
            return 21
        case "u":
            return 22
        case "v":
            return 23
        case "w":
            return 24
        case "x":
            return 25
        case "y":
            return 26
        case "z":
            return 27
        case "zh":
            return 28
        default:
            return 29
    }

}


