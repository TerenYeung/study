const Node = require('./node');
const SingleLinkedList = require('./1-single-linkedList');

class CircularSingleLinkedList extends SingleLinkedList {
  push(elem) {
    const node = new Node(elem);
    let current = this._head;
    if (this._head == null) {
      this._head = node;
      node.next = this._head;
    } else {
      current = this.getNodeAt(this._size - 1);
      current.next = node;
      node.next = this._head;
    }
    this._size++;
  }
  insert(elem, index) {
    if (index >= 0 && index <= this._size) {
      const node = new Node(elem);
      let current = this._head;
      if (index === 0) {
        if (this._head == null) {
          this._head = node;
          node.next = this._head;
        } else {
          node.next = current;
          this._head = node;
          current = this.getNodeAt(this._size - 1);
          current.next = this._head;
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      this._size++;
      return true;
    }

    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this._size) {
      let current = this._head;

      if (index === 0) {
        if (this._head != null) {
          if (this._size === 1) {
            this._head = null;
          } else {
            const removed = this._head;
            current = this.getNodeAt(this._size - 1);
            this._head = removed.next;
            current.next = this_head;
            current = removed;
          }
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this._size--;
      return current.value;
    }

    return null;
  }
}

module.exports = CircularSingleLinkedList;

function show(ll) {
  let ret = '';
  for (ll.front(); ll.curPos() < ll.size(); ll.next()) {
    ret += ' ' + ll.getCurNode().value;
  }

  console.log(ret);
  return ret;
}

const cll = new CircularSingleLinkedList();
cll.push(1);
cll.push(2);
cll.push(3);
cll.remove(2);
cll.insert(3, 0)
// console.dir(cll._head.next);
// show(cll);