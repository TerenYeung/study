const MinHeap = require('../data_structure/2-minHeap');

class Sorting {
  constructor(nums) {
    this.data = [];
    this.nums = nums || 0;
    this.initData();
  }

  initData() {
    for (let i = 0; i < this.nums; i++) {
      this.data[i] = this.nums - 1 - i;
    }
  }

  genData() {
    for (let i = 0; i < this.nums; i++) {
      this.data[i] = Math.floor(Math.random() * (this.nums + 1));
    }

    return this.data;
  }

  insert(elem) {
    this.data.push(elem);
    this.nums++;
  }

  clear() {
    this.data = Array(this.nums).fill(0);
  }

  toString() {
    let ret = '';

    for (let i = 0; i < this.nums - 1; i++) {
      ret += this.data[i] + ' ';
      if ( i > 0 && i % 9 === 0) {
        ret += '\n\n';
      }
    }

    return ret;
  }

  swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return arr;
  }

  // 冒泡排序
  bubbleSort() {
    let len = this.data.length;
    let arr = Array.from(this.data);

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j+1]) {
          this.swap(arr, j, j+1);
        }
      }
    }

    return arr;
  }
  // Impoved 冒泡排序
  // 每经过一轮交换后，最大的元素会排到最后，所以需要进行比较的次数会逐渐 -1
  improvedBubbleSort() {
    let len = this.data.length;
    let arr = Array.from(this.data);

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j+1]) {
          this.swap(arr, j, j+1);
        }
      }
    }

    return arr;
  }
  // 选择排序
  selectionSort() {
    let len = this.data.length;
    let arr = Array.from(this.data);
    let minIndex = 0;

    for (let i = 0; i < len - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[minIndex] > arr[j]) {
          minIndex = j;
        }
      }
      this.swap(arr, i, minIndex);
    }

    return arr;
  }
  static insertionSort(data) {
    let len = data.length;
    let arr = data;
    let target, curIndex;

    for (let i = 1; i < len; i++) {
      target = arr[i];
      curIndex = i;

      while(curIndex > 0 && arr[curIndex - 1] > target) {

        arr[curIndex] = arr[curIndex - 1];
        curIndex--;
      }

      arr[curIndex] = target;
    }

    return arr;
  }
  // 插入排序
  insertionSort() {
    let len = this.data.length;
    let arr = Array.from(this.data);
    let target, curIndex;

    for (let i = 1; i < len; i++) {
      target = arr[i];
      curIndex = i;

      while(curIndex > 0 && arr[curIndex - 1] > target) {

        arr[curIndex] = arr[curIndex - 1];
        curIndex--;
      }

      arr[curIndex] = target;
    }

    return arr;
  }
  // 希尔排序
  shellSort() {
    let arr = Array.from(this.data),
      len = arr.length,
      temp,
      gap = Math.floor(len / 2);

    // 4  3  2  1
    // i = 2
    // gap = 2
    // temp = 2
    for (gap; gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < len; i++) {
        temp = arr[i];

        // 1)
        for (var j = i - gap; j >= 0 && arr[j] > temp; j-=gap) {
          arr[j+gap] = arr[j];
        }

        // 1) can replace with ?
        // if (arr[i-gap] > temp) {
        //   this.swap(arr, i-gap, i);
        // }
        arr[j+gap] = temp;
      }
    }

    return arr;
  }
  improvedShellSort() {
    let len = this.data.length;
    let arr = Array.from(this.data);
    let gap = 1;
    let temp;

    while (gap < len / 3) {
      gap = gap * 3 + 1;
    }

    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
      for (var i = gap; i < len; i++) {
        temp = arr[i];

        for (var j = i - gap; j >= 0 && arr[j] > temp; j-= gap) {
          arr[j+gap] = arr[j];
        }
        arr[j+gap] = temp;
      }
    }

    return;
  }
  // 归并排序
  // 自顶向下
  mergeSort(data) {
    let arr = data ? Array.from(data) : Array.from(this.data);
    let len = arr.length;

    if (arr.length > 1) {
      const mid = Math.floor(len / 2);
      const left = this.mergeSort(arr.slice(0, mid));
      const right = this.mergeSort(arr.slice(mid, len));

      arr = this._merge(left, right);
    }

    return arr;
  }
  _merge(left, right) {
    let i = 0;
    let j = 0;
    const ret = [];
    while (i < left.length && j < right.length) {
      ret.push(
        left[i] < right[j]
          ? left[i++]
          : right[j++]
      );
    }

    return ret.concat(
      i < left.length
      ? left.slice(i)
      : right.slice(j)
    );
  }
  // 快速排序
  quickSort() {
    let arr = Array.from(this.data);
    let len = arr.length;

    return this._quick(arr, 0, len - 1);
  }

  _quick(data, left, right) {
    let index;

    if (data.length > 1) {
      index = this._partition(data, left, right);

      if (left < index - 1) {
        this._quick(data, left, index - 1);
      }

      if (index < right) {
        this._quick(data, index, right);
      }
    }

    return data;
  }

  _partition(data, left, right) {
    const mid = Math.floor((left + right) / 2);
    const pivot = data[mid];
    let i = left;
    let j = right;

    while (i <= j) {
      while (data[i] < pivot) {
        i++
      }

      while (data[j] > pivot) {
        j--
      }

      if (i <= j) {
        this.swap(data, i, j);
        i++;
        j--;
      }
    }

    return i;
  }
  /* 分配类算法 */
  // 计数算法
  countingSort() {
    let arr = Array.from(this.data);
    let max = Math.max.apply(null, arr);
    const counts = Array(max);

    for (let i = 0; i < arr.length; i++) {
      if (counts[arr[i]] == null) {
        counts[arr[i]] = 0;
      }
      counts[arr[i]]++;
    }

    let sortedIndex = 0;
    for (let j = 0; j < counts.length; j++) {
      while (counts[j] > 0) {
        arr[sortedIndex++] = j;
        counts[j]--;
      }
    }

    return arr;
  }
  // 桶排序
  bucketSort() {
    let N = 5; // 设置每个桶存放的数据个数
    let arr = Array.from(this.data);

    if (arr.length > 1) {
      const buckets = this._createBuckets(arr, N);
      return this._sortBuckets(buckets);
    }

    return arr;
  }
  _createBuckets(data, bucketSize) {
    let min = Math.min.apply(null, data),
      max = Math.max.apply(null, data);

    let bucketCount = Math.floor((max - min)/bucketSize) + 1;
    const buckets = [];

    for (let i = 0; i < bucketCount; i++) {
      buckets[i] = [];
    }

    // 将所有数据装入对应数据范围的桶内
    let bucketIndex;
    for (let j = 0; j < data.length; j++) {
      bucketIndex = Math.floor((data[j] - min) / bucketSize);
      buckets[bucketIndex].push(data[j]);
    }

    return buckets;
  }

  _sortBuckets(buckets) {
    let sortedBuckets = [];
    let bucket;
    for (let i = 0; i < buckets.length; i++) {
      bucket = buckets[i];
      Sorting.insertionSort(bucket);
      sortedBuckets.push(
        ...bucket,
      )
    }

    return sortedBuckets;
  }
  // 基数排序
  radixSort() {
    let arr = this.data;

    if (arr.length > 1) {
      // 初始化 buckets
      const buckets = [];
      let maxDigit = 0;
      let max = Math.max.apply(null, arr);

      // 计算最大值的位数
      for (max; max > 0; max = Math.floor(max / 10)) {
        maxDigit++;
      }

      let radix = 10;
      let mod = radix;
      let dev = 1;

      for (let i = 0; i < maxDigit; i++, mod *= radix, dev *= radix) {
        for (let j = 0; j < arr.length; j++) {
          let bucketIndex = Math.floor(arr[j] % mod / dev);

          if (buckets[bucketIndex] == null) {
            // 这里假设是个队列，遵循先进先出的原则
            buckets[bucketIndex] = [];
          }

          buckets[bucketIndex].push(arr[j]);
        }
        let pos = 0;
        for (let k = 0; k < buckets.length; k++) {
          let value = null;
          // 存在部分没有的出现的基数
          if (buckets[k] != null) {
            while ((value = buckets[k].shift()) != null) {
              arr[pos++] = value;
            }
          }

        }
      }
    }

    return arr;
  }
  // 堆排序
  heapSort() {

  }
  // 堆排序 use MinHeap AST
  heapSort2() {
    let arr = Array.from(this.data);
    let len = arr.length;
    let minHeap = new MinHeap();

    for (let i = 0; i < len; i++) {
      minHeap.insert(arr[i]);
    }

    let ret = [];

    while(len > 0) {
      ret.push(minHeap.extract());
      len--;
    }

    return ret;
  }
}

const arr = new Sorting(20);
arr.genData();
console.log('raw data');
console.log(arr.data);
console.log('bubbleSort');
console.log(arr.improvedBubbleSort());
console.log('selectionSort');
console.log(arr.selectionSort());
console.log('inserttionSort');
console.log(arr.insertionSort());
console.log('shellSort');
console.log(arr.shellSort());
console.log('mergeSort');
console.log(arr.mergeSort());
console.log('quickSort');
console.log(arr.quickSort());
console.log('countingSort');
console.log(arr.countingSort());
console.log('bucketSort');
console.log(arr.bucketSort());
console.log('radixSort');
console.log(arr.radixSort());
console.log('heapSort');
console.log(arr.heapSort());