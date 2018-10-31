const linkedList = require('./linked_list')

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}
/**
 * 遍历是对树的一种最基本的运算，所谓遍历二叉树，就是按一定的规则和顺序走遍二叉树的所有结点，使每一个结点都被访问一次，而且只被访问一次。由于二叉树是非线性结构，因此，树的遍历实质上是将二叉树的各个结点转换成为一个线性序列来表示。
 *
 * @class BinarySearchTree
 */
class BinarySearchTree {
    constructor() {
        this.root = null
    }

    // insert a key into a tree
    insert(key) {
        let newNode = new Node(key)
        if (this.root === null) {
            this.root = newNode
        } else {
            this._insertNode(this.root, newNode)
        }
    }
    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null)
                node.left = newNode
            else
                this._insertNode(node.left, newNode)
        } else {
            if (node.right === null)
                node.right = newNode
            else
                this._insertNode(node.right, newNode)
        }
    }
/**
 * tree traversal 树的遍历，遍历整棵树的节点
 *  in-order 中序遍历：首先遍历左（右）子树，再访问根，最后中序遍历右（左）子树
 *  pre-order 先序遍历：首先访问根，再先序遍历左（右）子树，最后先序遍历右（左）子树
 *  post-order 后序遍历：首先后序遍历左（右）子树，再后序遍历右（左）子树，最后访问根
 */
    inOrderTraverse(callback) {
        this._inOrderTraverseNode(this.root, callback)
    }
    _inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this._inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this._inOrderTraverseNode(node.right, callback)
        }
    }
    preOrderTraverse(callback) {
        this._preOrderTraverseNode(this.root, callback)
    }
    _preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key)
            this._preOrderTraverseNode(node.left, callback)
            this._preOrderTraverseNode(node.right, callback)
        }
    }
    postOrderTraverse(callback) {
        this._postOrderTraverseNode(this.root, callback)
    }
    _postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this._postOrderTraverseNode(node.left, callback)
            this._postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    min() {
        return this._minNode(this.root)
    }
    _minNode(node) {
        if (node) {
            while(node && node.left !== null) {
                node = node.left
            }
            return node.key
        }
        return null
    }
    max() {
        return this._maxNode(this.root)
    }
    _maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right
            }
            return node.key
        }
        return null
    }
    search(key) {
        return this._searchNode(this.root, key)
    }
    _searchNode(node, key) {
        if (node === null) return false
        if (key < node.key) {
            return this._searchNode(node.left, key)
        } else if (key > node.key) {
            return this._searchNode(node.right, key)
        } else {
            return true
        }
    }
    remove(key) {
        this.root = this._removeNode(this.root, key)
    }
    /**
     *
     */
    _removeNode(node, key) {
        if (node === null) return null
        if (key < node.key) {
            node.left = this._removeNode(node.left, key)
            return node
        } else if (key > node.key) {
            node.right = this._removeNode(node.right, key)
            return node
        } else {
            // key is equal to node.key
            // case 1: a leaf node
            if (node.left === null && node.right === null) {
                node = null
                return node
            }
            // case 2: a node with only 1 child
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }

            // case 3: a node with 2 children
            // 1. 找到右子树中 key 最小的节点
            // 2. 将该节点值置入父节点值
            // 3. 移除右子树最小 key 的节点
            // 4. 返回该节点作为更新后的父节点
            var aux = this._findMinNode(node.right)
            node.key = aux.key
            node.right = this._removeNode(node.right, aux.key)
            return node
        }
    }
    _findMinNode(node) {
        while(node && node.left !== null) {
            node = node.left
        }
        return node
    }

}

let tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
let printNode = val => console.log(val)
// console.log('中序遍历')
// tree.inOrderTraverse(printNode)
// console.log('先序遍历')
// tree.preOrderTraverse(printNode)
// console.log('后序遍历')
// tree.postOrderTraverse(printNode)
// printNode(tree.min())
// printNode(tree.max())
// printNode(tree.search(6))
// printNode(tree.search(26))
tree.inOrderTraverse(printNode)
console.log('--------------')
tree.remove(6)

tree.inOrderTraverse(printNode)
console.log('--------------')
tree.remove(5)
tree.inOrderTraverse(printNode)
console.log('--------------')
tree.remove(15)
tree.inOrderTraverse(printNode)
// console.dir(tree)