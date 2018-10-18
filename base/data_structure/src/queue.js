class Queue {
    constructor() {
        this.items = []
    }
    enqueue(elem) {
        return this.items.push(elem)
    }
    dequeue() {
        return this.items.shift()
    }
    front() {
        return this.items[0]
    }
    isEmpty() {
        return this.items.length === 0
    }
    clear() {
        this.items = []
    }
    size() {
        return this.items.length
    }
    toArray() {
        return this.items
    }
    toString() {
        return this.items.toString()
    }
}

let queue = new Queue()
console.log('isEmpty: ', queue.isEmpty())
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log('toArray: ', queue.toArray())
console.log('size: ', queue.size())
queue.dequeue()
queue.dequeue()
console.log('dequeue: ', queue.toString())