export type A = {                 // 定义复杂结构
    b: number
    c: string
}

type Func = () => number   // 定义函数

type Key = number | string // 多个类型

type Animal = {
    weight: number
    height: number
}

export type Dog = Animal & {
    leg: number,
    [property: string]: number
}

// 对于函数和类，需要使用 declare 关键字标识其为声明类型
export declare function greet(context:string):void

export interface Person {
    name: string,
    age: number,
}

export var SomeVar: {
    a: SomeType
}

export interface SomeType {
    count: number;
}

export namespace Box {
    export let x:number;
    export let y:string;
}