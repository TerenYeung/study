const {BST, Node} = require('./2-BST');


class AVLTree extends BST {
  constructor() {
    super();
  }

  insert(data) {
    let ret = this._insert(data);
    if (ret) {
      this._keepBalanced();
    }

    return ret;
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
    this._keepBalanced();
  }

  _keepBalanced() {
    let root = this._root;
    let balanceFactor = this.getBalanceFactor(root);
    if (balanceFactor > 1 && this.getBalanceFactor(root.left) >= 0) {
      // LL 型，需要进行右旋
      this._root = this._rightRotate(root);
    } else if (balanceFactor < -1 && this.getBalanceFactor(root.right) <= 0) {
      // RR 型，需要进行左旋
      this._root = this._leftRotate(root);
    } else if (balanceFactor > 1 && this.getBalanceFactor(root.left) < 0) {
      // LR 型，需要先对根节点的左子树进行左旋，然后对根节点进行右旋；
      root.left = this._leftRotate(root.left);
      this._root = this._rightRotate(root);
    } else if (balanceFactor < -1 && this.getBalanceFactor(root.right) > 0) {
      // RL 型，需要先对根节点的右子树进行右旋，然后对根节点进行左旋；
      root.right = this._rightRotate(root.right);
      this._root = this._leftRotate(root);
    }
  }

  // 获取节点的层次（高度）
  getNodeHeight(node) {
    if (node == null) {
      return 0;
    }

    let leftHeight = this.getNodeHeight(node.left);
    

    let rightHeight = this.getNodeHeight(node.right);

    if (leftHeight > rightHeight) {
      return ++leftHeight;
    } else {
      return ++rightHeight;
    }
  }

  // 获取树的深度
  // 遍历所有节点，然后获取所有节点的高度，求取所有高度中的最大值

  // 平衡因子：某节点左子树与右子树高度之差
  getBalanceFactor(node) {
    if(node == null) {
      return 0;
    }

    return this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
  }

  isBalanced() {
    return this._isBalanced(this._root);
  }

  _isBalanced(node) {
    if (node == null) {
      return true;
    }

    const balanceFactor = Math.abs(this.getBalanceFactor(node));

    if (balanceFactor > 1) {
      return false;
    }

    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }
  // 插入节点导致树的平衡性遭到破坏，有如下四种情形：
  // LL：向左子树的左子节点插入新节点导致不平衡，此时需要右旋
  /**
          x             y
        y    --->   z(+)   x
      z(+)
  */
  _rightRotate(x) {
    const y = x.left;
    // 节点 y 的右子树
    const y_r_t = y.right;
    y.right = x;
    x.left = y_r_t;

    return y;
  }
  /**
    RR：向右子树的右子节点插入新节点导致不平衡，此时需要左旋

      x                 y
        y       --->  x   z(+)
          z(+)

  */
  _leftRotate(x) {
    const y = x.right;
    const y_l_t = y.left;
    y.left = x;
    x.right = y_l_t;

    return y;
  }
  /**
    LR：向左子树的右子节点插入新节点导致不平衡，此时需要先对 y 左旋，然后对 x 进行右旋

      x                 x                     z(+)
    y         --->    z(+)      --->         y    x
      z(+)           y
    RL: 向右子树的左子节点插入新节点导致不平衡，此时需要先对 y 右旋，然后对 x 进行左旋
      x                 x                   z(+)
        y    --->         z(+)    --->     x    y
      z(+)                    y
  */
}

const avl = new AVLTree();
/**
 *       5                3             5            3
 *      3 10            2   5          4           2   4
 *     1               1     10       3           1     5
 *       2                           2
 *                                  1
*/
// avl.insert(5);
// avl.insert(3);
// avl.insert(1);
// avl.insert(2);
// avl.insert(10);
avl.insert(5);
avl.insert(4);
avl.insert(3);
avl.insert(2);
avl.insert(1);


// console.log(avl);
avl.remove(2);
avl.remove(1);
// console.log(avl);