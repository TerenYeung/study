const Node = require('./node');
const SingleLinkedList = require('./1-single-linkedList');
const utils = require('./utils');

class StackLinkedList {
  constructor() {
    this._data = new SingleLinkedList();
  }

  push(elem) {
    this._data.push(elem);
  }

  pop() {
    if (this._data.isEmpty()) {
      return null;
    }

    return this._data.removeAt(this._data.size() - 1);
  }
}

const sll = new StackLinkedList();
sll.push(1);
sll.push(2);
sll.push(3);
sll.pop();
// console.log(sll._data);
// utils.show(sll._data);