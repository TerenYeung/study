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
  }

  swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;

    return arr;
  }

  /**
   * 冒泡排序：
   * 需要经过 n 次的两两元素比较，每次比较完都有一个元素排好序
   * 原地排序：true
   * 稳定性：true
   * 时间复杂度
   *  最好：完全有序，只需要经过一次比较，O(n)
   *  最坏：完全逆序，O(n^2)
   */
  bubbleSort() {
    let arr = Array.from(this.data);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
        }
      }
    }

    return arr;
  }

  /**
   * 提升性能的冒泡排序
   * 每经过一次冒泡， 后 i 项都是排好序的，因此不需要再对后 i 项进行比较
   * 如果某次冒泡操作没有发生交换操作，证明已达完全有序，可以退出后续冒泡
   */
  importedBubbleSort() {
    let arr = Array.from(this.data);

    for (let i = 0; i < arr.length; i++) {
      let unsorted = false;
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
          unsorted = true;
        }
      }

      if (!unsorted) break;
    }

    return arr;
  }

  /**
   * 插入排序
   * 将数据序列划分为已排序区间和未排序区间，然后从未排序区间选择元素添加到已排序区间
   * 原地排序：true
   * 稳定性：true
   * 时间复杂度：
   * 最坏：O(n^2)
   * 最好：O(n)
   */
  insertionSort(data) {
    data = data || Array.from(this.data);
    let target, curIndex;

    for (var i = 1; i < data.length; i++) {
      var target = data[i];
      for (var j = i - 1; j >= 0 && data[j] > target; j--) {
        data[j+1] = data[j];
      }
      data[j+1] = target;
    }

    return data;
  }

  /**
   * 选择排序
   * 将无序序列划分为未排序区间和已排序区间，每次从未排序区间选择最小值放到已排序区间末尾
   * 原地排序：true
   * 稳定性：false
   * 复杂度：O(n^2)
   */
  selectionSort() {
    let data = Array.from(this.data);

    for (let i = 0; i < data.length - 1; i++) {
      let min = data[i];
      let minIndex = i;
      let unsorted = false;

      for (let j = i + 1; j < data.length; j++) {
        if (min > data[j]) {
          min = data[j];
          minIndex = j;
          unsorted = true;
        }
      }

      if (unsorted) {
        this.swap(data, i, minIndex);
      }
    }

    return data;
  }

  /**
   * 希尔排序：改进版的插入排序
   * 插入排序对于几乎排好序的数据，可以达到线性效率。但插入排序一般是低效的，因为插入排序每次只能消除一个逆序对；
   * 希尔排序通过递减增量的方式，将待排序的数据较快的消除较多逆序对
   * 原地排序：true
   * 稳定性：false
   * 复杂度：O(nlogn^2)
  */
  shellSort() {
    let data = Array.from(this.data);
    let gap = Math.floor(data.length / 2);

    for (gap; gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < data.length; i++) {
        let tmp = data[i];

        for (var j = i - gap; j >= 0 && data[j] > tmp; j -= gap) {
          data[j+gap] = data[j];
        }

        data[j+gap] = tmp;
      }
    }

    return data;
  }

  /**
   * 归并排序：将待排序数据不断进行划分为规模更小的组，直至只有 1 个，
   * 然后将划分后的小组逐渐合并成有序的小组，直至全部合并完成；
   * 原地排序：false
   * 稳定性：true
   * 时间复杂度：O(nlogn)
   */
  mergeSort(data) {
    data = data || this.data;

    if (data.length == 1) return data;

    let mid = Math.floor(data.length / 2);
    let left = this.mergeSort(data.slice(0, mid));
    let right = this.mergeSort(data.slice(mid, data.length));

    return this._merge(left, right);
  }

  _merge(left, right) {
    let i = 0;
    let j = 0;
    let ret = [];

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
    )
  }

  /**
   * 快速排序：选取基础值，然后从待排序序列中依次比较基准值，比基准值小的归于一边，大的又归于一边，递归进行，直至排序完成
   * 原地排序：false
   * 稳定性：false
   * 时间复杂度：O(nlogn)
  */
  quickSort(data) {
    data = data || Array.from(this.data);

    if (data.length === 0) return [];

    var base = data[0];
    var lesser = [];
    var greater = [];

    for (var i = 1; i < data.length; i++) {
      if (data[i] < base) {
        lesser.push(data[i]);
      } else {
        greater.push(data[i]);
      }
    }

    return this.quickSort(lesser).concat(base, this.quickSort(greater));
  }
  /**
   * 改进版快速排序
   * 原地排序：true
   * 稳定性：false
   * 时间复杂度：O(nlogn)
   */
  importedQuickSort() {
    var data = Array.from(this.data);

    return this._quick(data, 0, data.length - 1);
  }

  _quick(data, left, right) {

    if (data.length > 1) {
      let midIndex = this._partition(data, left, right);

      if (left < midIndex - 1) {
        this._quick(data, left, midIndex - 1);
      }

      if (midIndex < right) {
        this._quick(data, midIndex, right);
      }
    }

    return data;
  }

  _partition(data, left, right) {
    var mid = Math.floor((left + right) / 2);
    var pivot = data[mid];

    while(left <= right) {
      while (data[left] < pivot) {
        left++;
      }

      while (data[right] > pivot) {
        right--;
      }

      if (left <= right) {
        this.swap(data, left, right);
        left++;
        right--;
      }
    }

    return left;
  }

  /**
   * 堆排序：利用堆的数据结构进行排序，首先将待排序序列进行堆化为大顶堆，然后每次遍历将首尾元素进行交换，交换后再对前 n-i 个元素进行堆化
   * 原地排序：true
   * 稳定性：false
   * 时间复杂度：O(nlogn)
  */
  heapSort() {
    let data = Array.from(this.data);

    // 对待排序序列进行初始化堆化
    // 找到第一个非叶子节点
    var maxIndex = data.length - 1;
    var start = (maxIndex >> 1) - 1;

    for (let i = start; i >= 0; i--) {
      this._maxHeapify(data, i, maxIndex);
    }

    // 对堆化后的数据进行排序
    for (let j = maxIndex; j > 0; j--) {
      this.swap(data, 0, j);
      this._maxHeapify(data, 0, j - 1);
    }

    return data;
  }

  /**
   * @param {*} data
   * @param {*} start 堆化的开始下标
   * @param {*} len 待排序序列的最大下标
   */
  _maxHeapify(data, start, maxIndex) {
    var left = (start << 1) + 1;
    var right = left + 1;

    if (left > maxIndex) return;

    var max = left;

    if (right <= maxIndex && data[right] > data[left]) {
      max = right;
    }

    if (data[max] > data[start]) {
      this.swap(data, max, start);
      this._maxHeapify(data, max, maxIndex);
    }
  }
  /**
   * 计数排序：计数排序是一种分配类算法，根据待排序序列的最大与最小的差额，设定进行计数的空间，然后遍历待排序序列，对每个元素进行计数；最后从计数数组中，根据每个下标出现的次数，放置进返回的数组中
   * 原地排序：false
   * 稳定性：true
   * 时间复杂度：n
  */
  countingSort() {
    let data = Array.from(this.data);
    let max = Math.max.apply(null, data);
    let counts = Array(max + 1);

    for (let i = 0; i < data.length; i++) {
      if (counts[data[i]] == null) {
        counts[data[i]] = 0;
      }

      counts[data[i]]++;
    }

    let sortedIndex = 0;

    for (let j = 0; j < counts.length; j++) {
      while(counts[j] > 0) {
        data[sortedIndex++] = j;
        counts[j]--;
      }
    }

    return data;
  }
  improvedCountingSort() {
    let data = Array.from(this.data);
    let max = Math.max.apply(null, data);
    let min = Math.min.apply(null, data);
    let counts = Array(max - min + 1);

    for (let i = 0; i < data.length; i++) {
      if (counts[data[i] - min] == null) {
        counts[data[i] - min] = 0;
      }

      counts[data[i] - min]++;
    }

    let sortedIndex = 0;

    for (let j = 0; j < counts.length; j++) {
      while (counts[j] > 0) {
        data[sortedIndex++] = min + j;
        counts[j]--;
      }
    }

    return data;
  }
  /**
   * 桶排序：桶排序也是一种分配式排序算法，首先根据每个桶能容纳的元素数量以及待排序序列中最大的差值，确定桶的数量，然后将每个元素放入合适区间的桶中；后面对每个桶进行单独的排序，然后再将每个桶合并起来
   * 原地排序：false
   * 稳定性：true
   * 时间复杂度：O(n)
  */
  bucketSort() {
    let data = Array.from(this.data);
    let bucketSize = 5; // 设置每个桶的容量

    // 根据待排序序列的最大差值，动态创建桶的个数，然后将数据放在合适的桶中
    let max = Math.max.apply(null, data);
    let min = Math.min.apply(null, data);
    let bucketCount = Math.floor((max - min) / bucketSize) + 1;
    let buckets = Array(bucketCount);

    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = [];
    }

    for (let j = 0; j < data.length; j++) {
      var bucketIndex = Math.floor((data[j] - min) / bucketSize);
      buckets[bucketIndex].push(data[j]);
    }

    var sort = new Sorting();
    data.length = 0;

    for (let k = 0; k < buckets.length; k++) {
      sort.insertionSort(buckets[k]);
      data = data.concat(buckets[k]);
    }

    return data;

  }
  /**
   * 基数排序：基数排序也是一种分配类算法，根据分配方式的不同 LSD 或 MSD，根据总共位数，依次将不同位放入桶中
   * 原地排序：false
   * 稳定性：true
   * 时间复杂度：n
   */
  radixSort() {
    let data = Array.from(this.data);

    // 计算出位数以确定总共排序的次数
    if (data.length > 1) {
      let maxDigit = 0;
      let max = Math.max.apply(null, data);

      for (max; max > 0; max = Math.floor(max / 10)) {
        maxDigit++;
      }

      // LSD，从最低位开始，依次将元素放入对应的桶中
      let radix = 10;
      let mod = radix;
      let dev = 1;
      let buckets = [];

      for (let i = 0; i < maxDigit; i++, mod *= radix, dev *= radix) {
        for (let j = 0; j < data.length; j++) {
          let bucketIndex = Math.floor(data[j] % mod / dev);

          if (buckets[bucketIndex] == null) {
            buckets[bucketIndex] = [];
          }

          buckets[bucketIndex].push(data[j]);
        }

        let pos = 0;

        for (let k = 0; k < buckets.length; k++) {
          if (buckets[k] != null) {
            var value;
            while ((value = buckets[k].shift()) != null) {
              data[pos++] = value;
            }
          }
        }
      }
    }

    return data;
  }
}

let sort = new Sorting(20);
console.log("sort", sort);
sort.genData();
// console.log("sort", sort);
// console.log('data', sort.data)
// console.log('bubbleSort', sort.bubbleSort());
// console.log('importedBubbleSort', sort.importedBubbleSort());
// console.log('insertionSort', sort.insertionSort());
// console.log('selectionSort', sort.selectionSort());
// console.log('shellSort', sort.shellSort());
// console.log('mergeSort', sort.mergeSort());
// console.log('quickSort', sort.quickSort());
// console.log('importedQuickSort', sort.importedQuickSort());
// console.log('heapSort', sort.heapSort());
// console.log('countingSort', sort.countingSort());
// console.log('improvedCountingSort', sort.improvedCountingSort());
// console.log('bucketSort', sort.bucketSort());
// console.log('radixSort', sort.radixSort());
