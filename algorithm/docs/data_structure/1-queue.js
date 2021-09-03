class Queue {
  constructor() {
    this._data = [];
    this._size = 0;
  }

  size() {
    return this._size;
  }

  enqueue(elem) {
    this._size++;
    return this._data.push(elem);
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    this._size--;
    return this._data.shift();
  }
  peek() {
    return this._data[0];
  }
  isEmpty() {
    return this._size === 0;
  }
  clear() {
    this._data.length = this._size = 0;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
console.log(queue);
console.log(queue.peek())