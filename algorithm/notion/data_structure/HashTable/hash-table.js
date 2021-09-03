const {SingleLinkedList} = require('../LinkedList/single-linked-list');

function HashTable(size, hashFn) {
  this.size = size || 100;
  this.maxPrime = _getMaxPrime(this.size);
  this.table = new Array(size || 3);
  this.hashFn = hashFn || defaultHashFn;
  this.set = set;
  this.get = get;
  this.has = has;
  this.remove = remove;
}

function _getMaxPrime(num) {
  let i = 1;

  if (num <= 1) return 1;

  for (i = num - 1; i > 1; i--) {
    if (isPrime(i)) {
      return i;
    }
  }

  return 1;
}

function isPrime(num) {
  if (num <= 1) return false;

  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
      return false;
    }
  }

  return true;
}

function defaultHashFn(key) {
  key = key.toString();
  let num = 0;

  for (var i = 0; i < key.length; i++) {
    num += key[i].charCodeAt(0);
  }

  return num % this.maxPrime;
}

function set(key, value) {
  var index = this.hashFn(key);

  if (!this.table[index]) {
    this.table[index] = new SingleLinkedList();
  }

  this.table[index].push({
    key,
    value,
  });
}

function get(key) {
  var index = this.hashFn(key);
  var linkedList = this.table[index];

  var ret = linkedList.findBy(key);
  return ret && ret.value.value;
}

function has(key) {
  var index = this.hashFn(key);
  var linkedList = this.table[index];
  var ret = linkedList.indexOfBy(key);

  return ret >= 0;
}

function remove(key) {
  var index = this.hashFn(key);
  var linkedList = this.table[index];

  linkedList.removeBy(key);
}

var map = new HashTable();

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

console.log('c', map.get('c'));
map.remove('b');
console.log('b', map.get('b'));