

export function 是数组(值: any): 值 is ReadonlyArray<any> {
    return Array.isArray ? Array.isArray(值) : 值 instanceof Array;
}

export const enum 认定层次 {
    无 = 0,
    正常 = 1,
    积极 = 2,
    非常积极 = 3,
}

export namespace Debug {
    export let 当前认定层次 = 认定层次.无;
    export let 正在调试中 = false;

    export function 应该断言(层次: 认定层次): boolean {
        return 当前认定层次 >= 层次;
    }

    export function 断言(表达式: boolean, 消息?: string, 详细信息?: string | (() => string), 栈记号?: Function): void {
        if (!表达式) {
            if (详细信息) {
                消息 += "\r\n详细调试信息: " + (typeof 详细信息 === "string" ? 详细信息 : 详细信息());
            }
            失败(消息 ? "假表达式: " + 消息 : "假表达式.", 栈记号 || 断言);
        }
    }

    export function 相等断言<T>(a: T, b: T, msg?: string, msg2?: string): void {
        if (a !== b) {
            const 消息 = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
            失败(`表达式: ${a} === ${b}. ${消息}`);
        }
    }

    export function 小于断言(a: number, b: number, msg?: string): void {
        if (a >= b) {
            失败(`表达式: ${a} < ${b}. ${msg || ""}`);
        }
    }

    export function 小于等于断言(a: number, b: number): void {
        if (a > b) {
            失败(`表达式: ${a} <= ${b}`);
        }
    }

    export function 大于等于断言(a: number, b: number): void {
        if (a < b) {
            失败(`表达式: ${a} >= ${b}`);
        }
    }

    export function 失败(消息?: string, 栈记号?: Function): never {
        debugger;
        const e = new Error(消息 ? `调试失败. ${消息}` : "调试失败.");
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(e, 栈记号 || 失败);
        }
        throw e;
    }

    export function 不及断言(成员: never, 消息?: string, 栈记号?: Function): never {
        return 失败(消息 || `非法值: ${成员}`, 栈记号 || 不及断言);
    } 
}
