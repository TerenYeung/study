

class DoublyNode {
    constructor(elem) {
        this.elem = elem
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.count = 0
        this.head = null
        this.tail = null
    }
    append(elem) {
        let node = new DoublyNode(elem)
        let current
        if (!this.head) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.count++
    }
    insert(pos, elem) {
        if (pos >= 0 && pos < this.count) {
            let node = new DoublyNode(elem)
            let current = this.head
            let previous
            let index = 0

            if (pos === 0) {
                if (!this.head) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = current
                    current.prev = node
                    this.head = node
                }
            } else if (pos === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                while (index++ < pos) {
                    previous = current
                    current = current.next
                }

                previous.next = node
                node.prev = previous
                node.next = current
                current.prev = node
            }
            this.count++
            return true
        } else {
            return false
        }
    }
    removeAt(pos) {
        if (pos > -1 && pos < this.count) {
            let current = this.head
            let previous
            let index = 0
            if (pos === 0) {
                this.head = current.next
                // 如果只有一个节点
                if (this.count === 1) {
                    // 节点移除后，清楚尾指针
                    this.tail = null
                } else {
                    this.head = null
                }
            } else if (pos === this.count - 1) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = null
            } else {
                while (index++ < pos) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.elem
        } else {
            return null
        }
    }
    indexOf(elem) {
        let current = this.head
        let index = 0
        while (current) {
            if (current.elem === elem) return index
            index++
            current = current.next
        }
        return -1
    }
    getHead() {
        return this.head
    }
    getTail() {
        return this.tail
    }
    clear() {
        this.head = null
        this.tail = null
        this.count = 0
        return true
    }
    toString() {
        let current = this.head
        let string = ''
        while (current) {
            string += current.elem + (current.next ? ', ' : '')
            current = current.next
        }
        return string
    }
    size() {
        return this.count
    }
}

let dLinkedList = new DoublyLinkedList()
dLinkedList.append(1)
dLinkedList.append(3)
dLinkedList.insert(1, 10)
console.log(dLinkedList.toString())
dLinkedList.append(12)
dLinkedList.removeAt(1)
console.log(dLinkedList)
dLinkedList.clear()
console.log(dLinkedList.size())
