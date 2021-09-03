// const Node = require('./node');
const SingleLinkedList = require('./1-single-linkedList');

class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    const STORE = 137;
    this._table = new Array(STORE);
    this._size = 0;
  }
  /**
   * 散列函数：将键转换为数组的索引
   * 尽可能选取易于计算并我能够均匀分布所有键的散列函数
   * 散列函数和键的类型相关
   * @param {*} key
   * @memberof HashTable
   */
  _baseHash(key){
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }

    return total % this._table.length;
  }

  /**
   * 基于霍纳算法的散列函数
   * @param {*} key
   * @memberof HashTable
   */
  _honerHash(key) {
    const H = 37; // 先计算字符串中各字符的 ASCII 码点，而且每次求和时都要乘以一个较小质数
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += H * total + key.charCodeAt(i);
    }

    return total % this._table.length;
  }
  /**
   * 基于开链法去处理哈希碰撞
   * @param {*} key
   * @param {*} value
   * @memberof HashTable
   */
  put(key, value) {
    let hash = this._honerHash(this._stringify(key));

    /**
     * [
     *    []->[],
     *    []->[],
     * ]
     */
    let sll = null;
    const hashNode = new HashNode(key, value);

    if (this._table[hash] == null) {
      sll = new SingleLinkedList();

      sll.push(hashNode);
      this._table[hash] = sll;
    } else {
      this._table[hash].push(hashNode);
    }
    this._size++;
  }

  get(key) {
    const hash = this._honerHash(this._stringify(key));

    if (this.isEmpty()) {
      return null;
    }

    const sll = this._table[hash];

    if (sll == null) {
      return null;
    } else {
      for (sll.front(); sll.curPos() < sll.size(); sll.next()) {
        let curHashNode = sll.getCurNode();
        if (curHashNode && curHashNode.value.key === key) {
          return curHashNode.value.value;
        }
      }
    }
  }

  remove(key) {
    const hash = this._honerHash(key);

    if (this.isEmpty()) {
      return null;
    }

    let sll = this._table[hash];

    if (sll == null) {
      return null;
    } else {
      let curHashNode = null;
      for (sll.front(); sll.curPos() < sll.size(); sll.next()) {
        curHashNode = sll.getCurNode();
        if (curHashNode && curHashNode.value.key === key) {
          break;
        }
      }

      sll.remove(curHashNode.value);
      if (sll.isEmpty()) {
        delete this._table[hash];
      }

      this._size--;
      return curHashNode.value.value;
    }
  }

  isEmpty() {
    return this._size === 0;
  }

  _stringify(value) {
    if (value === null) {
      return 'NULL';
    } else if (value === undefined) {
      return 'UNDEFINED';
    }

    return String(value);
  }
}

const ht = new HashTable();
ht.put('A', 1);
ht.put('B', 2);
ht.put('C', 3);
// console.log(ht);
// console.log(ht.get('C'));
// console.log(ht.remove('A'));
// console.log(ht);
