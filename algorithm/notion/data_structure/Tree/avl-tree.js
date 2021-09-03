const {
  Node,
  BST,
} = require('./binary-search-tree');

function AVL() {
  BST.call(this); // 调用父类的构造函数
  this.insert = insert;
  this._insert = _insert;
  this.remove = remove;
  this._remove = _remove;
  this.getNodeHeight = getNodeHeight;
  this.getBalanceFactor = getBalanceFactor;
  this._rotationLL = _rotationLL;
  this._rotationRR = _rotationRR;
  this._rotationLR = _rotationLR;
  this._rotationRL = _rotationRL;
}

// 子类继承父类的原型
AVL.prototype = Object.create(BST.prototype);
AVL.prototype.constructor = AVL;

// 改写 insert 和 remove 方法
// 在进行插入节点后，还要判断树是否处于平衡状态
// 如果不处于，则需要根据不平衡状态进行分类讨论
/*
  根据
*/

function getNodeHeight(node) {
  if (node == null) {
    return -1;
  }

  return Math.max(
    this.getNodeHeight(node.left),
    this.getNodeHeight(node.right)
  ) + 1;
}

var BalanceFactor = {
  UNBALANCED_RIGHT: 2,
  SLIGHTLY_UNBALANCED_RIGHT: 1,
  BALANCED: 0,
  SLIGHTLY_UNBALANCED_LEFT: -1,
  UNBALANCED_LEFT: -2,
}

function getBalanceFactor(node) {
  var diff = this.getNodeHeight(node.right) - this.getNodeHeight(node.left);

  switch (diff) {
    case 2:
      return BalanceFactor.UNBALANCED_RIGHT;
    case 1:
      return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
    case -1:
      return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
    case -2:
      return BalanceFactor.UNBALANCED_LEFT;
    default:
      return BalanceFactor.BALANCED;
  }
}


function insert(elem) {
  var node = new Node(elem, null, null);

  if (this._root == null) {
    this._root = node;
  } else {
    this._root = this._insert(node, this._root);
  }
  this._size++;
}

function _insert(node, parent) {
  if (node.elem < parent.elem) {
    if (parent.left) {
      parent.left = this._insert(node, parent.left);
    } else {
      parent.left = node;
    }

  } else {
    if (parent.right) {
      parent.right = this._insert(node, parent.right);
    } else {
      parent.right = node;
    }
  }

  var balanceFactor = this.getBalanceFactor(parent);
  console.log('balanceFactor', balanceFactor);
  if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
    if (node.elem < parent.elem) {
      // L-L
      console.log('LL');
      parent = this._rotationLL(parent);
    } else {
      // L-R
      console.log('LR');
      parent = this._rotationLR(parent);
    }
  }

  if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
    if (node.elem < parent.elem) {
      // R-L
      console.log('RL');
      parent = this._rotationRL(parent);
    } else {
      // R-R
      console.log('RR');
      parent = this._rotationRR(parent);
    }
  }

  return parent;
}

function remove(elem) {
  this._root = this._remove(this._root, elem);
}

function _remove(node, elem) {
  var ret = null;
  if(node == null) {
    return null;
  } else if (node.elem === elem) {
    this._size--;

    if (node.left == null && node.right == null) {
      return null;
    } else if (node.left == null) {
      ret = node.right;
    } else if (node.right == null) {
      ret = node.left;
    } else {
      var min = this.min(node.right);
      node.elem = min.elem;
      node.right = this._remove(node.right, min.elem);

      ret = node;
    }
  } else if (elem < node.elem) {
    node.left = this._remove(node.left, elem);
    ret = node;
  } else {
    node.right = this._remove(node.right, elem);
    ret = node;
  }

  var balanceFactor = this.getBalanceFactor(ret);

  if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
    var balanceFactorLeft = this.getBalanceFactor(node.left);

    /*
          x
        y
      z  (k)
    */
    if (
      balanceFactorLeft === BalanceFactor.BALANCED ||
      balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        console.log('LL')
        ret = this._rotationLL(node);
      } else {
        console.log('LR')
        ret = this._rotationLR(node);
      }

  }

  if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
    /*
        x
          y
        (k) z
    */
   var balanceFactorRight = this.getBalanceFactor(node.right);

   if (
    balanceFactorRight === BalanceFactor.BALANCED ||
    balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
   ) {
     console.log('RR')
    ret = this._rotationRR(node);
   } else {
    console.log('RL')
     ret = this._rotationRL(node);
   }
  }

  return ret;
}

/**
      x
    y     ->     y
  z            z  x
 */

function _rotationLL(node) {
  var y = node.left; // 2
  node.left = y.right; // null
  y.right = node; //

  return y;
}

function _rotationRR(node) {
  var y = node.right;
  node.right = y.left;
  y.left = node;
}

/**
      x
    y
      z
 */
function _rotationLR(node) {
  var y = node.left;
  this._rotationRR(y);
  this._rotationLL(node);
}
/*
    x
      y
    z
*/
function _rotationRL(node) {
  var y = node.right;
  this._rotationLL(y);
  this._rotationRR(node);
}

var avl = new AVL();

/*
          5
      2      6
    1   3
  0
*/
/*
        2
      1   5
    0    3 6

*/
avl.insert(5);
avl.insert(2);
avl.insert(6);
avl.insert(1);
avl.insert(3);
avl.insert(0);
// avl.insert(7);
avl.remove(2);
// avl.remove(3);
// avl.remove(6);
// avl.remove(5);

console.log('avl', avl._root);