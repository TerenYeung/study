class Node {
	constructor(elem) {
		this.elem = elem
		this.next = null
	}
}

class LinkdedList {
	constructor() {
		this.head = null
		this.count = 0
	}
	append(elem) {
		let node = new Node(elem)
		let current
		if (this.head === null) this.head = node
		else {
			current = this.head
			// loop the list until find last item
			while(current.next) current = current.next
			current.next = node
		}

		this.count++
	}
	removeAt(pos) {
		let current = this.head
		let index = 0
		let previous
		if (pos > -1 && pos < this.count) {
			if (pos === 0) {
				this.head = current.next
			} else {
				while (index++ < pos) {
					previous = current
					current = current.next
				}
				previous = current.next
			}
			this.count--
			return current.elem
		} else {
			return null
		}
	}
	insert(pos, elem) {
		if (pos >= 0 && pos <= this.count) {
			let node = new Node(elem)
			let current = this.head
			let index = 0
			let previous
			if (pos === 0) {
				node.next = current
				this.head = node
			} else {
        while(index++ < pos) {
					previous = current
					current = current.next
				}
				node.next = current
				previous.next = node
			}
			this.count++
			return true
		} else {
			return false
		}
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
	indexOf(elem) {
		let current = this.head
		let index = -1
		while(current) {
			if (elem === current.elem) return index
			index++
			current = current.next
		}
		return -1
	}
	remove(elem) {
		let index = this.indexOf(elem)
		return this.removeAt(index)
	}
	isEmpty() {
		return this.count === 0
	}
	size() {
		return this.count
	}
	getHead() {
		return this.head
	}

}
module.exports = LinkdedList
let list = new LinkdedList()
list.append(10)
list.append(20)
list.append(30)
list.insert(1, 15)
console.dir(list.size())
console.log(list.toString())