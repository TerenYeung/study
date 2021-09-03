/**
 * 顺序表
 * @class SequenceList
 * ADT
 * @application
 */
class SequenceList {
  constructor() {
    this._data = [];
    this._length = 0;
    this._pos = 0;
  }

  // 获取表的数据元素个数
  size() {
    return this._length;
  }

  // 获取第 i 个元素个数
  get(i) {
    return this._data[i];
  }

  // 获取指定元素的位置
  indexOf(elem) {
    for (let i = 0, len = this._data.length; i < len; i++) {
      if (this._data[i] === elem) {
        return i;
      }
    }

    return -1;
  }

  isEmpty() {
    return this._length === 0;
  }

  insert(i, elem) {
    if (i > this._length - 1 || i < 0) {
      throw RangeError(`only set i from 0 to ${this._length - 1}`);
    } else {
      // var a = [1, 2, 3, 4];
      // i = 2 j = last = 3, j >= i - 1 = 1, j--
      // data[3+1] = data[j]
      for (let last = this._length - 1; last >= i; last--) {
        this._data[last + 1] = this._data[last];
      }
      this._data[i] = elem;
      this._length++;
    }
  }

  push(elem) {
    this._length++;
    this._data[this._length - 1] = elem;
  }

  remove(elem) {
    if (!this.isEmpty()) {
      for (let index = this.indexOf(elem), last = this._length - 1; index < last; index++) {
        this._data[index] = this._data[index+1];
      }
      this._data.length = --this._length;
    }

    return false;
  }

  // 置空表
  clear() {
    this._data = [];
    this._length = this._pos = 0;
  }

  contains(elem) {
    for (let i = 0, len = this._length; i < len; i++) {
      if (this._data[i] === elem) {
        return true;
      }
    }

    return false;
  }

  // 将当前位置移动到首位
  front() {
    this._pos = 0;
  }

  end() {
    if (this._length > 0) {
      this._pos = this._length - 1;
    }
  }

  prev() {
    if (this._length > 0) {
      this._pos--;
    }
  }

  next() {
    if (this._length > 0) {
      this._pos++;
    }
  }

  hasNext() {
    return this._pos + 1 < this._length;
  }

  hasPrev() {
    return this._pos - 1 >= 0;
  }

  curPos() {
    return this._pos;
  }

  moveToPos(pos) {
    this._pos = pos;
  }

  getCurElem() {
    return this._data[this._pos];
  }

  toString() {
    return this._data;
  }
}

const sl = new SequenceList();
sl.push(1);
sl.push(2);
sl.push(3);
sl.insert(1, 4);
// sl.remove(4);
console.log(sl.toString());
// sl.setNull();
// console.log(sl.get(0));
// console.log(sl.size());
// sl.moveToPos(1);
// sl.prev();
// sl.prev();
sl.next();
// sl.end();
// console.log(sl.getCurElem());
// console.log(sl.curPos());

function show(list) {
  for (list.front(); list.curPos() < list.size(); list.next()) {
    console.log(list.getCurElem());
  }
}

show(sl);