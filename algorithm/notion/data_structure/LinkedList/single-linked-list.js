function Node(elem) {
  this.value = elem;
  this.next = null;
}

function SingleLinkedList() {
  this.head = new Node(null); // 初始化头指针用于哨兵
  // 根据元素找到节点
  this.find = find;
  this.findBy = findBy;
  // 根据位置找到节点
  this.getElementAt = getElementAt;
  // 根据元素找到元素位置
  this.indexOf = indexOf;
  this.indexOfBy = indexOfBy;
  // 往指定位置添加新元素
  this.add = add;
  // 往链表尾部添加新元素
  this.push = push;
  // 删除指定元素
  this.remove = remove;
  this.removeBy = removeBy;
  // 删除指定位置元素
  this.removeAt = removeAt;
  this.toString = toString();
}

// 根据元素找到对应节点
function find(target) {
  var current = this.head;

  while (current && current.value !== target) {
    current = current.next;
  }

  return current;
}

function findBy(key) {
  var current = this.head.next;

  while (current && current.value && current.value.key !== key) {
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
    currentIndex++;
  }

  return currentIndex;
}

function indexOfBy(key) {
  var current = this.head;
  var currentIndex = -1;

  while (current && current.value && current.value.key !== key) {
    current = current.next;
    currentIndex++;
  }

  return currentIndex;
}

function add(elem, pos) {
  var newNode = new Node(elem);
  var current = this.head;
  var currentIndex = -1;

  while (current && current.next && (currentIndex + 1) !== pos) {
    current = current.next;
    currentIndex++;
  }

  newNode.next = current.next;
  current.next = newNode;
}

// function add(elem, index) {
//   var newNode = new Node(elem);
//   var current = this.getElementAt(index);

//   if (current) {
//     newNode.next = current.next;
//     current.next = newNode;
//   } else {
//     throw new Error('Target not found');
//   }
// }

function push(elem) {
  var newNode = new Node(elem);
  var current = this.head;

  while (current.next != null) {
    current = current.next;
  }

  current.next = newNode;
}

function remove(target) {
  var current = this.head;

  while (
    current &&
    current.next &&
    current.next.value != target
  ) {
    current = current.next;
  }

  current.next = current.next.next;
}

function removeBy(key) {
  var current = this.head;

  while (
    current &&
    current.next &&
    current.next.value &&
    current.next.value.key != key
  ) {
    current = current.next;
  }

  current.next = current.next.next;
}

function removeAt(index) {
  var current = this.head;
  var currentIndex = -1;

  while(current && current.next && (currentIndex + 1) != index) {
    currentIndex++;
    current = current.next;
  }

  current.next = current.next.next;
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

module.exports = {
  SingleLinkedList,
  Node,
};

var singleLinkedList = new SingleLinkedList();

singleLinkedList.push(1);
singleLinkedList.push(2);
singleLinkedList.add(3, 0);
// console.log(singleLinkedList.head)
var node = singleLinkedList.find(3);


// singleLinkedList.remove(1);
// singleLinkedList.removeAt(1);

console.log('node', singleLinkedList.head);


// 单链表反转
