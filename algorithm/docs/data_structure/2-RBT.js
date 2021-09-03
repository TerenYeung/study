const {BST} = require('./2-BST');

/**
 * @description
 * RBTree 性质：
 * 1. 所有节点要么红色要么黑色
 * 2. 根节点或叶子节点是黑色
 * 3. 不能出现连续 2 个红色节点
 * 4. 从任意节点出发，所有路径上的黑色节点数目相同
 * @note 每次新增的节点都是红色节点
*/

const COLORS = {
  red: 'red',
  black: 'black',
};

const nil = {
  parent: null,
  left: null,
  right: null,
  data: null,
  color: COLORS.black;
};

class Node {
  constructor(
    parent,
    left,
    right,
    value,
    color,
  ) {
    this.parent = parent || null;
    this.left = left || null;
    this.right = right || null;
    this.data = value || null;
    this.color = color || COLORS.red;
  }

  grandparent() {
    if (this.parent == null) {
      return null;
    }

    return this.parent.parent;
  }

  uncle() {
    if (this.grandparent() == null) {
      return null;
    }

    if (this.parent == this.grandparent().left) {
      return this.grandparent().right;
    } else {
      return this.grandparent().left;
    }
  }

  sibling() {
    if (this.parent == null) {
      return null;
    }

    if (this.parent.left == this) {
      return this.parent.right;
    } else {
      return this.parent.left;
    }
  }
}

class RBTree extends BST {
  constructor(comparator) {
    super();
    this.comparator = comparator
      ? comparator : (a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
      };

    this._root = nil;
    this.length = 0;
  }

  insert(value) {
    if (this._root == nil) {
      const root = new Node();
      root.left = nil;
      root.right = nil;
      root.data = value;
      root.color = COLORS.black;
      this._root = root;

    } else {
      this._insert(this._root, value);
    }
  }

  _insert(node, value) {
    if (node.data >= value) {
      // 向 node 左子树插入
      if (node.left != nil) {
        this._insert(node.left, value);
      } else {
        const tmp = new Node();
        tmp.parent = node;
        tmp.left = tmp.right = nil;
        tmp.data = value;
        node.left = tmp;
        this._insertFixedUp(tmp);
      }
    } else {
      if (node.right != nil) {
        this._insert(node.right, value);
      } else {
        const tmp = new Node();
        tmp.parent = node;
        tmp.left = tmp.right = nil;
        tmp.data = value;
        node.right = tmp;
        this._insertFixedUp(tmp);
      }
    }
  }

  _insertFixedup(node) {
    if (node.parent == null) {
      // 插入的节点是根节点
      node.color = COLORS.black;
      this._root = node;
    } else if (node.parent.color == COLORS.black) {
      // 插入节点的父节点是黑色节点，则不需要处理
    } else if (node.parnet.color == COLORS.red) {
      // 插入节点的叔叔节点是红色，则叔叔和父节点变成黑色，祖父节点变成红色，再向上递归
      if (node.uncle().color == COLORS.red) {
        node.uncle().color = node.parent.color = COLORS.black;
        node.parent.color = COLORS.red;
        this._insertFixedUp(node.grandparent());
      } else {
        if (node.parent.left == node && node.grandparent().left == node.parent) {
          // 结构如下：
          /**
           *    G
           *   P
           *  N
          */
          this._rotateRight(node.grandparent());
          this._swapColor(node.parent, node.grandparent());
        } else if (node.parent.right == node && node.grandparent().right == node.parent) {
          // 结构如下：
          /**
           *    G
           *      P
           *        N
           */
          this._rotateLeft(node.grandparent());
          this._swapColor(node.parent, node.grandparent());
        } else if (node.parent.right == node && node.grandparent().left == node.parent) {
          // 结构如下：
          /**
           *      G
           *   P
           *      N
          */
         const ret = this._rotateLeft(node.parent);
         this._rotateRight(ret.parent);
         this._swapColor(node, node.grandparent());
        } else if (node.parent.left == node && node.grandparent().right == node.parent) {
          // 结构如下：
          /**
           *    G
           *      P
           *    N
          */
         const ret = this._rotateRight(node.parent);
         this._rotateLeft(ret.parent);
         this._swapColor(node, node.grandparent());
        }
      }
    }
  }

  // _insertFixedUp(node) {
  //   // 默认新插入的节点都是红节点
  //   // 只有新插入节点的父节点是红节点才需要调整
  //   // 插入节点需要考虑一下情况
  //   if (node.parent.color == COLORS.red) {
  //     // 1. 如果叔节点是红色
  //     if (node.uncle().color == COLORS.red) {
  //       // 父节点和叔节点变成黑，祖父节点变成红，再向上递归
  //       node.parent.color = node.uncle().color = COLORS.black;
  //       node.grandparent().color =  COLORS.red;
  //       this._insertFixedUp(node.grandparent());
  //     } else {
  //       // 2. 如果叔节点是黑色

  //       if (node.parent.left == node && node.grandparent().left == node.parent) {
  //         // 2.1 如果树结构符合以下描述，则对祖父父节点右旋，再交换祖父和父节点颜色
  //         /**
  //               G
  //             P
  //           N
  //         */
  //         this._rotateRight(node.grandparent());
  //         this._swapColor(node.parent, node.grandparent());
  //       } else if (node.parent.right == node && node.grandparent().left == node.parent) {
  //         // 2.2 树结构符合以下描述，则先对父节点左旋，转变为情形 2.1
  //         /**
  //             G
  //           P
  //             N
  //          */
  //         const ret = this._rotateLeft(node.parent);
  //         this._rotateRight(ret.parent);
  //         this._swapColor(node, node.grandparent());
  //       } else if (node.parent.right == node && node.grandparent().right == node.parent) {
  //         this._rotateLeft(node.grandparent());
  //         this._swapColor(node.parent, node.grandparent());
  //       } else if (node.parent.left == node && node.grandparent().right == node.parent) {
  //         const ret = this._rotateRight(node.parnet);
  //         this._rotateLeft(ret.parent);
  //         this._swapColor(node, node.grandparent());
  //       }
  //     }
  //   }
  // }

  remove(value) {
    const node = this.find(value);
    if (node == null || this._root == nil) {
      return false;
    }

    this._remove(this._root, node);

    // this._removeFixedup(node);
  }

  _remove(node, remove) {
    if (node.data > remove.data) {
      if (node.left == nil) {
        return false;
      }
      return this._remove(node.left, remove);
    } else if (root.data < remove.data) {
      if (node.right == nil) {
        return false;
      }
      return this._remove(node.right, remove);
    } else {

    }
  }

  _removeFixedup(node) {
    // 删除节点为黑色时，才需要进行删除修复
    if (node.color == COLORS.black) {
      const sibling = node.sibling();
    // 删除修复需要考虑以下情况：
    /**
     * 1. 兄弟节点是红色节点 - 左移，交换兄弟节点和父节点颜色
     * 2. 兄弟节点是黑色节点
     *  2.1 兄弟节点的子节点全是黑色
     *  2.2 兄弟节点的左子节点是红色
     *  2.3 兄弟节点的右子节点是红色
     *  2.4 兄弟节点的子节点全是红色
     * */

    if (sibling.color == COLORS.red) {
      let ret;
      if (node.parent.left == node) {
        /**
         *   P            R
         * N   R -->    P
         *            N(-)
        */
        ret = this._rotateLeft(node.parent);
      } else {
        ret = this._rotateRight(node.parent);
      }
      this._swapColor(ret, node.parent);
    } else {
      if (sibling.left.color == COLORS.black && sibling.right.color == COLORS.black) {
        // 兄弟子节点全为黑
        sibling.color = COLORS.red;
        this._removeFixedup(node.parent);
      } else if (sibling.left.color == COLORS.red && sibling.right.color == COLORS.red) {
        this._rotateLeft(node.parent);
        this._swapColor(sibling, sibling.right);
      } else if (sibling.left.color == COLORS.red && sibling.right.color != COLORS.red) {
        // 兄弟节点的左子节点为红色
        const ret = this._rotateRight(sibling);
        this._swapColor(ret, sibling);
        this._rotateLeft(node.parent);
      } else if (sibling.right.color == COLORS.red && sibling.left.color != COLORS.red) {
        // 兄弟节点的右子节点为红色
        this._rotateLeft(node.parent);
      }
    }
    }
  }

  _rotateLeft(x) {
    const  y = x.right;
    const y_l_t = y.left;
    y.left = x;
    x.right = y_l_t;
    y.parent = x.parnet;
    x.parent = y;

    return y;
  }

  _rotateRight(x) {
    const y = x.left;
    const y_r_t = y.right;
    y.right = x;
    x.left = y_r_t;
    y.parent = x.parent;
    x.parent = y;

    return y;
  }

  _swapColor(x, y) {
    const tmpColor = x.color;
    x.color = y.color;
    y.color = tmpColor;
  }

  toString() {
    return this._root;
  }
}

const rbTree = new RBTree();

/**
 *     2
 *       4
 */
rbTree.insert(2);
rbTree.insert(4);
rbTree.insert(3);

console.log(rbTree.toString());
