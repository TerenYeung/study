const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}

class AVLTree {
    constructor() {
        this.root = null
    }
    _getNodeHeight(node) {
        if (node === null) {
            return -1
        } else {
            return Math.max(this._getNodeHeight(node.left), this._getNodeHeight(node.right)) + 1
        }
    }
    /**
     *
     * 插入节点时，我们要去测试 AVL 树是否需要进行平衡调整
     * @param {*} node
     * @param {*} element
     * @returns
     * @memberof AVLTree
     */
    _insertNode(node, element) {
        if (node === null) {
            this.root = new Node(element)
        } else if (element < node.key) {
            node.left = this._insertNode(node.left, element)

            if (node.left !== null) {
                // verify if balancing is needed
            } else if (element > node.key) {
                node.right = this._insertNode(node.right, element)

                if (node.right !== null) {
                    // verify if balancing is needed
                }
            }
        }
        return node
    }
    insert(key) {
        let newNode = new Node(key)
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            this._insertNode(this.root, newNode)
        }
    }
    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this._insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null)
                node.right = newNode
            else
                this._insertNode(node.right, newNode)
        }

        // verify if tree is balanced
        const balanceFactor = this._getBalanceFactor(node)

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            // rotation operation
        }

        if (balanceFactor.BalanceFactor.UNBALANCED_RIGHT) {
            // rotation operation

        }
        return node
    }
    _getBalanceFactor(node) {
        const heightDifferent = this._getNodeHeight(node.right) - this._getNodeHeight(node.left)

        switch (heightDifferent) {
            case 2:
                return BalanceFactor.UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case -2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }
}

