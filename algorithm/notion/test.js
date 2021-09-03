var swap = (data, i, j) => {
  var tmp = data[i];
  data[i] = data[j];
  data[j] = tmp;
}

var data = [3,2,22,12,5,66,98];
/**
 * 原地排序-稳定-n^2
 */
var bubbleSort = data => {
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length - 1 - i; j++) {
      if (data[j] > data[j+1]) {
        swap(data, j, j+1);
      }
    }
  }

  return data;
}

// console.log('bubbleSort: ', bubbleSort(data));

// 原地-稳定-n2
var insertionSort = data => {
  for (var i = 1; i < data.length; i++) {
    var target = data[i];

    for (var j = i - 1; j >= 0 && data[j] > target; j--) {
      data[j+1] = data[j];
    }

    data[j+1] = target;
  }

  return data;
}

// console.log('insertionSort: ', insertionSort(data));

var selectionSort = data => {
  for (var i = 0; i < data.length - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < data.length; j++) {
      if (data[minIndex] > data[j]) {
        minIndex = j;
      }
    }

    swap(data, minIndex, i);
  }

  return data;
}

// console.log('selectionSort: ', selectionSort(data));
// 原地-不稳定-nlog2
var shellSort = data => {
  var gap = Math.floor(data.length / 2);

  for (gap; gap > 0; gap = Math.floor(gap/2)) {
    for (var i = gap; i < data.length; i++) {
      var target = data[i];

      for (var j = i - gap; j>=0 && data[j] > target; j-=gap) {
        data[j+gap] = data[j];
      }

      data[j+gap] = target;
    }
  }

  return data;
}
// console.log('shellSort', shellSort(data));

// 非原地-稳定-nlogn
var mergeSort = data => {
  var mid = Math.floor(data.length / 2);
  var left = mergeSort(data.slice(0, mid));
  var right = mergeSort(data.slice(mid, data.length));

  return _merge(left, right);
}

var _merge = (left, right) => {
  var i = 0;
  var j = 0;
  var ret = [];

  while (
    i < left.length && j < right.legnth
  ) {
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

var quickSort = data => {
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

  return quickSort(lesser).conat(quickSort(greater));
}

// 原地-非稳定-nlogn
var importedQuickSort = (data) => {
  return _quick(data, 0, data.length - 1);
}

var _quick = (data, left, right) => {
  var midIndex = _partition(data, left, right);
  if (left < midIndex - 1) {
    _quick(data, left, midIndex - 1);
  }

  if (midIndex < right) {
    _quick(data, midIndex, right);
  }

  return data;
}

var _partition = (data, left, right) => {
  var mid = Math.floor((left + right) / 2);
  var pivot = data[mid];

  while (left <= right) {
    while (data[left] < pivot) {
      left++;
    }

    while(data[right] > pivot) {
      right--;
    }

    if (left <= right) {
      swap(data, left, right);
      left++;
      right--;
    }
  }

  return left;
}
/** [2.3.4]
          2
      3       4
  1     5    6   9
 */
// 原地-非稳定-nlogn
var heapSort = data => {
  // 首先针对数据构建大顶堆
  var maxIndex = data.length - 1;
  var start = (maxIndex >> 1) - 1;

  for (var i = start; i >= 0; i--) {
    _maxHeapify(data, i, maxIndex);
  }

  for (var j = maxIndex; j > 0; j--) {
    swap(data, 0, j);
    _maxHeapify(data, 0, j-1);
  }

  return data;
}

var _maxHeapify = (data, start, maxIndex) => {
  var left = (start << 1) + 1;
  var right = left + 1;

  if (left > maxIndex) return;

  var max = left;

  if (right <= maxIndex && data[right] > data[left]) {
    max = right;
  }

  if (data[max] > data[start]) {
    swap(data, start, max);
    _maxHeapify(data, max, maxIndex);
  }
}

// var _maxHeapify = (data, start, maxIndex) => {
//   var left = (start << 1) + 1;
//   var right = left + 1;

//   if (left > maxIndex) return;

//   var max = left;

//   if (right <= maxIndex && data[right] > data[left]) {
//     max = right;
//   }

//   if (data[max] > data[start]) {
//     swap(data, max, start);
//     _maxHeapify(data, max, maxIndex);
//   }
// }

// console.log('heapSort: ', heapSort(data));
// 非原地-稳定-n
var countingSort = data => {
  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var bucket = Array(max - min + 1);

  for (var i = 0; i < data.length; i++) {
    if (bucket[data[i] - min] == null) {
      bucket[data[i] - min] = 0;
    }
    bucket[data[i]-min]++;
  }

  var sortedIndex = 0;

  for (var j = 0; j < bucket.length; j++) {
    while(bucket[j] > 0) {
      data[sortedIndex++] = min + j;
      bucket[j]--;
    }
  }

  return data;
}

// console.log('countingSort', countingSort(data));
// 非原地-稳定-n
var bucketSort = data => {
  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var bucketSize = 5;
  var bucketCount = Math.floor((max - min) / bucketSize) + 1;
  var buckets = Array(bucketCount);

  for (var i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  for (var j = 0; j < data.length; j++) {
    var bucketIndex = Math.floor((data[j] - min)/bucketSize);
    buckets[bucketIndex].push(data[j]);
  }

  data.length = 0;

  for (var k = 0; k < buckets.length; k++) {
    insertionSort(buckets[k]);
    data = data.concat(buckets[k]);
  }

  return data;
}

// console.log('bucketSort', bucketSort(data));
// 非原地-稳定-n
var radixSort = data => {
  var maxDigit = 0;
  var max = Math.max.apply(null, data);

  for (max; max > 0; max = Math.floor(max/10)) {
    maxDigit++;
  }

  var radix = 10;
  var mod = radix;
  var dev = 1;
  var buckets = [];

  for (var i = 0; i < maxDigit; i++, mod *= radix, dev *= radix) {
    for (var j = 0; j < data.length; j++) {
      var bucketIndex = Math.floor(data[j] % mod / dev);
      if (buckets[bucketIndex] == null) {
        buckets[bucketIndex] = [];
      }

      buckets[bucketIndex].push(data[j]);
    }

    var sortedIndex = 0;

    for (var k = 0; k < buckets.length; k++) {
      if (buckets[k] != null) {
        var value;

        while ((value = buckets[k].shift()) != null) {
          data[sortedIndex++] = value;
        }
      }
    }
  }

  return data;
}

console.log('radixSort', radixSort(data));


/**
 * n2 bubbleSort insertionSort selectionSort
 * nlogn2 shellSort
 * nlogn mergeSort quickSort heapSort
 * n countingSort bucketSort radixSort
 *
*/