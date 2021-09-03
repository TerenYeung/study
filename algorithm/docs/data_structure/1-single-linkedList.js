const Node = require('./node');

/**
 * 单向链表
 * @description
 * @ADT
 * _head
 * indexOf(elem)
 * isEmpty()
 * size()
 * push(elem)
 * insert(newElem, value)
 * remove(elem)
 * removeAt(i)
 * toString
*/
class SingleLinkedList {
  constructor() {
    this._head = null;
    this._size = 0;
    this._pos = 0;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  getHead() {
    return this._head;
  }

  push(elem) {
    const node = new Node(elem);
    let current = null;
    if (this._head == null) {
      this._head = node;
    } else {
      current = this._head;

      while(current.next != null) {
        current = current.next;
      }

      current.next = node;
    }

    this._size++;
  }

  insert(newElem, index) {
    if (index >= 0 && index <= this._size) {
      const node = new Node(newElem);

      if (index === 0) {
        // 插入首位
        node.next = this._head;
        this._head = node;
      } else {
        const previous = this.getNodeAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      this._size++;
      return true;
    }

    return false;
  }

  remove(elem) {
    const index = this.indexOf(elem);
    return this.removeAt(index);
  }

  indexOf(elem) {
    let current = this._head;
    if (current != null) {
      for (let i = 0; i < this._size; i++) {
        if (current.value === elem) {
          return i;
        }
        current = current.next;
      }
    }
    return -1;
  }

  removeAt(index) {
    if (index >= 0 && index < this._size) {
      let current = this._head;
      if (index === 0) {
        this._head = current.next;
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      --this._size;
      // console.log('size',1000);
      return current.value;
    }

    return null;
  }

  getNodeAt(index) {
    if (index >= 0 && index < this._size) {
      let node = this._head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }

      return node;
    }
    return null;
  }

  contains(elem) {
    return this.indexOf(elem) >= 0;
  }

  front() {
    this._pos = 0;
  }

  end() {
    if (this._size > 0) {
      this._pos = this._size - 1;
    }
  }

  prev() {
    if (this._size > 0) {
      this._pos--;
    }
  }

  next() {
    if (this._size > 0) {
      this._pos++;
    }
  }

  hasNext() {
    return this._pos + 1 < this._size;
  }

  hasPrev() {
    return this._pos - 1 >= 0;
  }

  curPos() {
    return this._pos;
  }

  moveToPos(pos) {
    this._pos = pos;
  }

  getCurNode() {
    return this.getNodeAt(this._pos);
  }

  toString() {
    return this._head;
  }
}

module.exports = SingleLinkedList;

const sll = new SingleLinkedList();
sll.push(1);
sll.push(2);
sll.insert(3, 0);
// console.log(sll.indexOf(2));
// console.dir(sll);
// console.log(sll.remove(1));
// console.dir(sll);

function show(ll) {
  let ret = '';
  for (ll.front(); ll.curPos() < ll.size(); ll.next()) {
    ret += ' ' + ll.getCurNode().value;
  }

  console.log(ret);
  return ret;
}

// show(sll);
