const Node = require('./node');
const SingleLinkedList = require('./1-single-linkedList');

class DoublyNode extends Node {
  constructor(elem, prev, next) {
    super(elem, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends SingleLinkedList {
  constructor() {
    super();
    this._tail = null;
  }

  push(elem) {
    const node = new DoublyNode(elem, null, null);

    if (this._head == null) {
      this._head = node;
      this._tail = node;
    } else {
      const current = this._tail;
      current.next = node;
      node.prev = current;
      this._tail = node;
    }

    this._size++;
  }

  insert(elem, index) {
    if (index >= 0 && index <= this._size) {
      const node = new DoublyNode(elem);
      let current = this._head;
      if (index === 0) {
        if (this._head == null) {
          this._head = node;
          this._tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this._head = node;
        }
      } else if (index === this._size) {
        current = this._tail;
        current.next = node;
        node.prev = current;
        this._tail = node;
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }

      this._size++;
      return true;
    }

    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this._size) {
      let current = this._head;
      if (index === 0) {
        this._head = current.next;
        if (this._size === 0) {
          this._tail = null;
        } else {
          this._head.prev = null;
        }
      } else if (index === this._size - 1) {
        current = this._tail;
        this._tail = current.prev;
        this._tail.next = null;
      } else {
        current = this.getNodeAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this._size--;
      return current.value;
    }

    return null;
  }
}

module.exports = DoublyLinkedList;

const dll = new DoublyLinkedList();
dll.push(1);
dll.push(2);
dll.push(3);
dll.insert(0, 0);
dll.remove(1);
// console.log(dll);

function show(ll) {
  let ret = '';
  for (ll.front(); ll.curPos() < ll.size(); ll.next()) {
    ret += ' ' + ll.getCurNode().value;
  }

  console.log(ret);
  return ret;
}

// show(dll);