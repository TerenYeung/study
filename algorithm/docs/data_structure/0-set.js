class Set {
  constructor() {
    this._data = [];
    this._size = 0;
  }

  size() {
    return this._size;
  }

  add(elem) {
    if (this._data.indexOf(elem) < 0) {
      this._data.push(elem);
      this._size++;
      return true;
    }

    return false;
  }

  remove(elem) {
    const index = this._data.indexOf(elem);

    if (index > -1) {
      this._data.splice(index, 1);
      this._size--;
      return true;
    }

    return false;
  }

  contains(elem) {
    return this._data.indexOf(elem) > -1;
  }

  union(set) {
    const temp = new Set();

    for (let i= 0; i < this._size; i++) {
      temp.add(this._data[i]);
    }

    for (let j = 0; j < set.size(); j++) {
      if (!temp.contains(set._data[j])) {
        temp.add(set._data[j]);
      }
    }

    return temp;
  }

  intersect(set) {
    const temp = new Set();

    for (let i = 0; i < this._size; i++) {
      if (set.contains(this._data[i])) {
        temp.add(this._data[i]);
      }
    }

    return temp;
  }

  subset(set) {
    if (this._size > set.size()) {
      return false;
    }

    for (let i = 0; i < this._size; i++) {
      if (!set.contains(this._data[i])) {
        return false;
      }
    }

    return true;
  }

  diff(set) {
    const temp = new Set();

    for (let i = 0; i < this._size; i++) {
      if (!set.contains(this._data[i])) {
        temp.add(this._data[i]);
      }
    }

    return temp;
  }
}

const set = new Set();
set.add(1);
set.add(1);
set.add(2);
set.add(3);
// console.log(set);
// set.remove(3);
// console.log(set);
const set1 = new Set();
set1.add(3);
set1.add(4);
set1.add(5);
// console.log(set.union(set1));
// console.log(set.intersect(set1));
// console.log(set.subset(set1));
// console.log(set.diff(set1));