class Node {
  constructor(elem, left, right) {
    this.data = elem;
    this.left = left;
    this.right = right;
  }
}

/**
 * 存储结构：
 * 这里采用二叉链表存储 BST
 * @class BST
 */
class BST {
  constructor() {
    this._root = null;
    this._size = 0;
  }
  size() {
    return this._size;
  }

  insert(data) {
    return this._insert(data);
  }

  _insert(data) {
    const node = new Node(data, null, null);

    if (this._root == null) {
      this._root = node;
      this._size++;
      return true;
    }

    let current = this._root;
    let parent = null;

    while (true) {
      if (data < current.data) {
        parent = current;
        current = current.left;
        if (current == null) {
          parent.left = node;
          this._size++;
          return true;
        }
      } else {
        parent = current;
        current = current.right;
        if (current == null) {
          parent.right = node;
          this._size++;
          return true;
        }
      }
    }

    return false;

  }
  remove(data) {
    this._root = this.removeNode(this._root, data);
  }
  removeNode(node, data) {
    /**
     * 1. 初始节点为空，则返回 null
     * 2. 初始节点不为空，则比对初始节点值与删除值
     *  如果等于该值
     *    判断该初始节点的子节点情况，如果为空，则直接删除
     *    如果任意一子节点为空，则将另一子节点置为初始节点
     *    如果有两个子节点，则用右子树中的值最小的节点替换到该初始节点，然后删除右子树的值最小的节点
     *  如果小于该值，则证明待删除的节点在左子树，则从左子树中递归删除
    */
    if (node == null) {
      return null;
    }

    if (data === node.data) {
      if (node.left == null && node.right == null) {
        return null;
      } else if (node.left == null) {
        this._size--;
        return node.right;
      } else if (node.right == null) {
        this._size--;
        return node.left;
      } else {
        // 移除的节点有两个子节点，则从右子树中查找出最小的节点替换待移除的节点，然后将右子树中最小的节点移除掉；
        const tempNode = this.getMinNode(node.right);
        node.data = tempNode.data;
        node.right = this.removeNode(node.right, tempNode.data);
        this._size--;
        return node;
      }
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }
  min() {
    let current = this._root;
    if (current == null) {
      return null;
    }

    while (current.left != null) {
      current = current.left;
    }

    return current.data;
  }
  getMinNode(node) {
    let current = node;
    if (current == null) {
      return null;
    }

    while (current.left != null) {
      current = current.left;
    }

    return current;
  }
  max() {
    let current = this._root;
    if (current == null) {
      return null;
    }

    while (current.right != null) {
      current = current.right;
    }

    return current.data;
  }
  getMaxNode(node) {
    let current = node;
    if (current == null) {
      return null;
    }

    while (current.right != null) {
      current = current.right;
    }

    return current;
  }
  find(data) {
    let current = this._root;

    while (current != null) {
      if (current.data === data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }
  // 中序遍历
  inOrder(root, cb) {
    let current = root;
    if (current != null) {
      this.inOrder(current.left, cb);
      cb && cb(current);
      this.inOrder(current.right, cb);
    }
  }
  prevOrder(root, cb) {
    let current = root;
    if (current != null) {
      cb && cb(current);
      this.prevOrder(current.left, cb);
      this.prevOrder(current.right, cb);
    }
  }
  postOrder(root, cb) {
    let current = root;
    if (current != null) {
      this.postOrder(current.left, cb);
      this.postOrder(current.right, cb);
      cb && cb(current);
    }
  }
}

exports.BST = BST;
exports.Node = Node;

const bst = new BST();
bst.insert(3);
bst.insert(1);
bst.insert(2);
bst.insert(4);
bst.remove(3);
// console.log(bst);
// console.log(bst.size());
// console.log(bst.min());
// console.log(bst.max());
// console.log(bst.find(1));
// bst.inOrder(bst._root, (node) => {console.log(node.data)});