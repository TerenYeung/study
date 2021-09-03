function Queue() {
  this.data = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.peek = peek;
  this.clear = clear;
  this.isEmpty = isEmpty;
}

function enqueue(elem) {
  this.data.push(elem);
}

function dequeue() {
  return this.data.shift();
}

function peek() {
  return this.data[0];
}

function clear() {
  this.data = [];
}

function isEmpty() {
  return this.data.length === 0;
}

var queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.data);

queue.dequeue();
queue.dequeue();
console.log(queue.data);
console.log(queue.isEmpty());
