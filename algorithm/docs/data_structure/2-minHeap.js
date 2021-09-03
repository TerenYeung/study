/**
 * @description
 * 对于节点的存储方式，这里采用数组而非 AST 的形式
 * 因为小顶堆（完全二叉树）的父子节点间的位置具有密切关系
 * 如果给定的节点的位置为 index
 * 左节点为 2*index + 1
 * 右节点为 2*index + 2
 * 父节点为 Math.floor((index - 1) / 2)
*/
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    }

    return null;
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this._shiftUp(this.size() - 1);

      return true;
    }

    return false;
  }

  extract() {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.shift();
    }

    let removed = this.heap.shift();

    this._shiftDown(0);
    return removed;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  findMin() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  _shiftUp(index) {
    let parentIndex = this.getParentIndex(index);

    if (parentIndex != null && this.heap[parentIndex] > this.heap[index]) {
      this._swap(this.heap, index, parentIndex);
      this._shiftUp(parentIndex);
    }
  }

  _shiftDown(index) {
    let current = index;
    const leftIndex = this.getLeftIndex(current);
    const rightIndex = this.getRightIndex(current);
    const len = this.size();

    if (
      leftIndex < len && this.heap[current] > this.heap[leftIndex]
    ) {
      current = leftIndex;
    }

    if (
      rightIndex < len && this.heap[current] > this.heap[rightIndex]
    ) {
      current = rightIndex;
    }

    if (current !== index) {
      this._swap(this.heap, current, index);
      this._shiftDown(current);
    }
  }

  _swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    return arr;
  }
}

const minHeap = new MinHeap();

/**
 *        3           4
 *       5 4   ->    5 7
 *      7 6         6
 */
minHeap.insert(6);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(7);
minHeap.insert(5);
console.log(minHeap);
minHeap.extract();
console.log(minHeap);

module.exports = MinHeap;
