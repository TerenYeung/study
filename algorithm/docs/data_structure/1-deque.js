class Deque {
  constructor() {
    this._data = [];
    this._size = 0;
  }
  addFront(elem) {
    this._size++;
    return this._data.unshift(elem);
  }
  addBack(elem) {
    this._size++;
    return this._data.push(elem);
  }
  removeFront() {
    this._size--;
    return this._data.shift();
  }
  removeEnd() {
    this._size--;
    return this._data.pop();
  }
  peekFront() {
    return this._data[0];
  }
  peekBack() {
    return this._data[this._size - 1];
  }
  isEmpty() {
    return this._size === 0;
  }
  size() {
    return this._size;
  }
  clear() {
    this._data.length = this._size = 0;
  }
}

const deque = new Deque();
deque.addFront(1);
deque.addFront(2);
deque.addBack(3);
deque.addBack(4);
deque.removeFront();
deque.removeEnd();
console.log(deque);