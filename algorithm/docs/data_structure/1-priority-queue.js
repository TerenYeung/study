class Node {
  constructor(elem, priority) {
    this.value = elem;
    this.priority = priority;
  }
}

function compFn(a, b) {
  return a - b;
}

class PriorityQueue {
  constructor() {
    this._data = [];
    this._size = 0;
  }
  size() {
    return this._size;
  }

  // priority 越小，优先级越高
  enqueue(elem, priority) {
    const node = new Node(elem, priority);

    if (this.isEmpty()) {
      this._data.push(node);
    } else {
      // [1,2,3,3,4];
      let i = 0;
      let current = this._data[i];
      while (current && node.priority >= current.priority) {
        current = this._data[++i];
      }

      if (i == 0) {
        this._data.unshift(node);
      } else if (i == this._size - 1) {
        this._data.push(node);
      } else {
        this._data.splice(i + 1, 0, node);
      }
    }

    this._size++;
  }
  // 优先队列内部按 priority 有序排列在数组中，优先级越低的在最后，所以直接使用 pop()
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    this._size--;
    return this._data.pop();
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

const pQ = new PriorityQueue();

pQ.enqueue('A', 2);
pQ.enqueue('B', 3);
pQ.enqueue('C', 1);
pQ.enqueue('D', 0);
console.log(pQ);
pQ.dequeue();
console.log(pQ);