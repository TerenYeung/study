# Stack

栈是遵循“后进先出”（LIFO)的有序数据集合；

## 案例

一堆书
一叠盘子
函数栈
...

## 实现

```js
class Stack {
    constructor() {
        this.items = []
    }
    push(elem) {
        return this.items.push(elem)
    }
    pop() {
        return this.items.pop()
    }
    peek() {
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length === 0
    }
    size() {
        return this.items.length
    }
    clear() {
        this.items = []
    }
    toArray() {
        return this.items
    }
    toString() {
        return this.items.toString()
    }
}
```