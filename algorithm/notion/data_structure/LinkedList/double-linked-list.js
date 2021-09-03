function Node(elem) {
  this.value = elem;
  this.next = this.prev = null;
}

function DoubleLinkedList() {
  this.head = new Node(null); // 初始化头指针用于哨兵
  // 根据元素找到节点
  this.find = find;
  // 根据位置找到节点
  this.getElementAt = getElementAt;
  // 根据元素找到元素位置
  this.indexOf = indexOf;
  // 往指定位置添加新元素
  this.add = add;
  // 删除指定元素
  this.remove = remove;
  // 删除指定位置元素
  this.removeAt = removeAt;
  this.toString = toString;
}

// 根据元素找到对应节点
function find(target) {
  var current = this.head;

  while (current && current.value != target) {
    current = current.next;
  }

  return current;
}

function getElementAt(index) {
  var current = this.head;
  var currentIndex = -1;

  while (current && currentIndex !== index) {
    current = current.next;
    currentIndex++;
  }

  return current;
}

function indexOf(target) {
  var current = this.head;
  var currentIndex = -1;

  while (current && current.value !== target) {
    current = current.next;
    currentIndex++
  }

  return currentIndex;
}

function add(elem, index) {
  var node = new Node(elem);
  var current = this.head;
  var matchIndex = -1;

  while(current && matchIndex !== index) {
    current = current.next;
    matchIndex++;
  }

  if (!current) {
    this.head.next = node;
    node.prev = this.head;

    return node;
  }

  node.next = current;
  current.prev.next = node;
  node.prev = current.prev;
  current.prev = node;


  return node;
}


function remove(target) {
  var current = this.find(target);

  if (current) {
    var prev = current.prev;
    var next = current.next;
    prev.next = next;
    next.prev = prev;
    return true;
  } else {
    return false;
  }
}

function removeAt(index) {
  var current = this.getElementAt(index);

  if (!current) {
    return false;
  }

  return this.remove(current.value);
}

function toString() {
  var current = this.head;
  var ret = [];

  while(current) {
    ret.push(current.value);
    current = current.next;
  }

  return ret.join();
}


var doubleLinkedList = new DoubleLinkedList();

doubleLinkedList.add(1, 0);
doubleLinkedList.add(2, 0);
doubleLinkedList.add(3, 0);
// console.log('doubleLinkedList', doubleLinkedList);
// console.log(singleLinkedList.head)
var node = doubleLinkedList.find(2);
console.log('node', node);


doubleLinkedList.remove(2);
// doubleLinkedList.removeAt(1);

console.log('head', doubleLinkedList.head);
