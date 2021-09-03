function Node(elem, left, right) {
  this.elem = elem;
  this.left = left;
  this.right = right;
};

/**
 * 使用二叉链表存储 BST
 */
function BST() {
  this._root = null;
  this.insert = insert;
  this._insert = _insert;
  this.remove = remove;
  this._remove = _remove;
  this.find = find;
  this._find = _find;
  this.min = min;
  this.max = max;
  this._size = 0;
  this.size = size;
  this.inOrder = inOrder;
  this._inOrder = _inOrder;
  this.prevOrder = prevOrder;
  this._prevOrder = _prevOrder;
  this.postOrder = postOrder;
  this._postOrder = _postOrder;
}

function insert(data) {
  var node = new Node(data, null, null);
  // 迭代法
  // if (this._root == null) {
  //   this._root = node;
  // } else {
  //   var current = this._root;
  //   var parent = null;

  //   while (true) {
  //     if (data < current.elem) {
  //       parent = current;
  //       current = current.left;

  //       if (current == null) {
  //         parent.left = node;
  //         this._size++;
  //         break;
  //       }
  //     } else {
  //       parent = current;
  //       current = current.right;

  //       if (current == null) {
  //         parent.right = node;
  //         this._size++;
  //         break;
  //       }
  //     }
  //   }
  // }
  if (this._root == null) {
    this._root = node;
  } else {
    this._insert(node, this._root);
  }
  this._size++;
}

function _insert(node, parent) {
  if ( node.elem < parent.elem) {
    if (parent.left) {
      _insert(node, parent.left);
    } else {
      parent.left = node;
    }
  } else {
    if (parent.right) {
      _insert(node, parent.right);
    } else {
      parent.right = node;
    }
  }
}

/**
 * 如果待删除的节点是叶子节点，则直接删除，即其父节点将其指向为 null
 * 如果待删除节点有一个子节点，则其父节点指向待删除节点的子节点
 * 如果待删除节点有两个子节点，则将待删除的节点替换为该右子节点中的最小值
 */
function remove(elem) {
  this._root = this._remove(this._root, elem);
}

function _remove(node, elem) {
  if (node == null) {
    return null;
  } else if (node.elem === elem) {
    this._size--;
    if (node.left == null && node.right ==null) {
      return null;
    } else if (node.left == null) {
      return node.right;
    } else if (node.right == null) {
      return node.left;
    } else {
      var temp = this.min(node.right);
      node.elem = temp.elem;
      node.right = this._remove(node.right, temp.elem);

      return node;
    }
  } else if (elem < node.elem) {
    node.left = this._remove(node.left, elem);
    return node;
  } else {
    node.right = this._remove(node.right, elem);
    return node;
  }
}

function find(elem) {
  // 迭代法
  var current = this._root;

  while (current != null) {
    if (elem == current.elem) {
      return current;
    } else if (elem < current.elem) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return null;

  // 递归法
  // if (!this._root) {
  //   return null;
  // } else {
  //   return this._find(elem, this._root);
  // }
}

function _find(elem, node) {

  if (!node) {
    return null;
  }

  if (elem == node.elem) {
    return node;
  } else {
    if (elem < node.elem) {
      return this._find(elem, node.left);
    } else {
      return this._find(elem, node.right);
    }
  }
}

function min(node) {
  var current = node || this._root;

  while (current && current.left != null) {
    current = current.left;
  }

  return current;
}

function max(node) {
  var current = node || this._root;

  while (current && current.right != null) {
    current = current.right;
  }

  return current;
}

function inOrder(cb) {
  this._inOrder(this._root, cb);
}

function _inOrder(node, cb) {
  if (node != null) {
    this._inOrder(node.left, cb);
    cb(node);
    this._inOrder(node.right, cb);
  }
}

function prevOrder(cb) {
  this._prevOrder(this._root, cb);
}

function _prevOrder(node, cb) {
  if (node != null) {
    cb(node);
    this._prevOrder(node.left, cb);
    this._prevOrder(node.right, cb);
  }
}

function postOrder(cb) {
  this._postOrder(this._root, cb);
}

function _postOrder(node, cb) {
  if (node != null) {
    this._postOrder(node.left, cb);
    this._postOrder(node.right, cb);
    cb(node);
  }
}

function size() {
  return this._size;
}

module.exports = {
  Node,
  BST,
}

var bst = new BST();

// bst.insert(5);
// bst.insert(2);
// bst.insert(6);
// bst.insert(1);
// bst.insert(3);
// bst.insert(7);

// bst.remove(6);
// console.log('bst', bst._root);
/*
      5
   2     6
 1   3     7
 */
// console.log('bst', bst.size());
// console.log(bst.find(1));
// console.log(bst.min());
// console.log(bst.max());
// console.log('------------');
// bst.inOrder(n => console.log(n.elem));
// console.log('------------');
// bst.prevOrder(n => console.log(n.elem));
// console.log('------------');
// bst.postOrder(n => console.log(n.elem));

