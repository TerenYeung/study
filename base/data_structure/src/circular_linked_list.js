class Node {
    constructor(elem) {
        this.elem = elem
        this.next = null
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null
        this.count = 0
    }
    append(elem) {
        let node = new Node(elem)
        let current
        if (!this.head) {
            this.head = node
        } else {
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
            node.next = this.head
        }
        this.count++
    }
    loop(num) {
        let current = this.head
        let index = 0
        while (current) {
            console.log(current.elem)
            if (num == index) break
            index++

			current = current.next
		}
    }
}

let circularLinkedList = new CircularLinkedList()

circularLinkedList.append(1)
circularLinkedList.append(2)
console.log(circularLinkedList.loop(5))
