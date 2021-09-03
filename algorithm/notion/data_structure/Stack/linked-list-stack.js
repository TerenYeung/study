const {
  SingleLinkedList,
  Node,
} = require('../LinkedList/single-linked-list');

function LinkedListStack() {
  this.list = new SingleLinkedList();

  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.size = size;
  this.isEmpty = isEmpty;
  this.toString = toString;
}

function push(elem) {
  const node = new Node(elem);

  const current = this.list.head.next;
  node.next = current;
  this.list.head.next = node;
}

function pop() {
  const next = this.list.head.next;

  if (next) {
    this.list.head.next = next.next;

    return next;
  }

  return null;
}

function peek() {
  return this.list.head;
}

function clear() {
  this.list.head = new Node(null);
}

function size() {
  var count = 0;
  var current = this.list.head.next;

  while (current) {
    count++;
    current = current.next;
  }

  return count;
}

function isEmpty() {
  return !this.list.head.next;
}

function toString() {
  var current = this.list.head.next;
  var box = [];

  while (current) {
    box.push(current.value);
    current = current.next;
  }

  return box.join('->');
}

const stack = new LinkedListStack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.toString());

stack.pop();
console.log(stack.toString());

console.log(stack.size());
console.log(stack.peek());
console.log(stack.clear());
console.log(stack.isEmpty());

