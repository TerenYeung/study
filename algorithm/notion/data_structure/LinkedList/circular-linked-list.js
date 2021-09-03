function Node(value) {
  this.value = value;
  this.next = null;
}

function CircularLinkedList() {
  this.head = new Node(null);
  this.head.next = this.head;

  this.find = find;
  this.getElementAt = getElementAt;
  this.indexOf = indexOf;

  this.add = add;
  this.remove = remove;
  this.removeAt = removeAt;
}

function find(target) {
  var current = this.head;

  while (current && current.value !== target) {
    current = current.next;
  }

  return current;
}

function getElementAt(index) {
  var current = this.head;
  var matchIndex = -1;

  while (current && matchIndex !== index) {
    current = current.next;
    matchIndex++;
  }

  return current;
}

function indexOf(target) {
  var current = this.head;
  var matchIndex = -1;

  while (current && current.value !== target) {
    current = current.next;
    matchIndex++;
  }

  return matchIndex;
}

function add(elem, index) {
  var node = new Node(elem);
  var currentIndex = - 1;
  var current = this.getElementAt(index);

  if (current) {
    var circular = current.next;
    node.next = current.next;
    current.next = node;
  } else {
    throw new Error('Target not found');
  }
}

function remove(target) {
  var current = this.head;

  while(
    current &&
    current.next &&
    current.next.value !== target
  ) {
    current = current.next;
  }

  current.next = current.next.next;
}

function removeAt(index) {
  var current = this.head;
  var currentIndex = -1;

  while (
    current &&
    current.next &&
    (currentIndex + 1) != index
  ) {
    current = current.next;
    currentIndex++;
  }

  current.next = current.next.next;
}