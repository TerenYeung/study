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

let stack = new Stack()
console.log('isEmpty: ', stack.isEmpty())
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
console.log('peek: ', stack.peek())
console.log('size: ',stack.size())
stack.pop()
console.log('toArray: ', stack.toArray())

// Decimal to Binary
function divideBy2(decNumber) {
    let binaryString = '';
    let remStack = new Stack()
    let rem;

    while(decNumber > 0) {
        rem = Math.floor(decNumber % 2)
        remStack.push(rem)
        decNumber = Math.floor(decNumber / 2)
    }

    while(!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }

    return binaryString
}

// Decimal to any base
function baseConverter(decNumber, base) {
    let remStack = new Stack()
    let rem;
    let baseString = '';
    let digits = '0123456789ABCDEF'

    while(decNumber > 0) {
        rem = Math.floor(decNumber % base)
        remStack.push(rem)
        decNumber = Math.floor(decNumber / base)
    }

    while(!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]
    }

    return baseString
}

console.log(divideBy2(10000))

console.log(baseConverter(10000, 2))
console.log(baseConverter(10000, 8))
console.log(baseConverter(299, 16))
