var swap = (data, i, j) => {
  var tmp = data[i];
  data[i] = data[j];
  data[j] = tmp;
}

var data = [22, 34, 12, 2, 99, 53, 66];

// n^2
var bubbleSort = (data) => {
  for (var i = 0; i < data.length; i++) {
    let unsorted = false;
    for (var j = 0; j < data.length - 1 - i; j++) {
      if (data[j] > data[j+1]) {
        swap(data, j, j+1);
        unsorted = true;
      }
    }
    if (!unsorted) break;
  }

  return data;
}

// console.log('bubbleSort', bubbleSort(data));

var insertionSort = (data) => {
  for (let i = 1; i < data.length; i++) {
    var target = data[i];

    for (var j = i - 1; j >= 0 && data[j] > target; j--) {
      data[j+1] = data[j];
    }

    data[j+1] = target;
  }

  return data;
}

// console.log('insertionSort', insertionSort(data));

var selectionSort = (data) => {
  for (let i = 0; i < data.length; i++) {
    let min = data[i];
    let minIndex = i;
    let unsorted = false;

    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < min) {
        min = data[j];
        minIndex = j;
        unsorted = true;
      }
    }

    if (unsorted) {
      swap(data, i, minIndex);
    }
  }

  return data;
}

// console.log('selectionSort', selectionSort(data));

// nlogn^2

var shellSort = data => {
  var gap = Math.floor(data.length/2);

  for (gap; gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < data.length; i++) {
      var target = data[i];

      for (var j = i - gap; j >= 0 && data[j] > target; j -= gap) {
        data[j+gap] = data[j];
      }

      data[j+gap] = target;
    }
  }

  return data;
}

// console.log('shellSort', shellSort(data));

// nlogn

var mergeSort = data => {
  if (data.length === 1) return data;

  var mid = Math.floor(data.length / 2);
  var left = mergeSort(data.slice(0, mid));
  var right = mergeSort(data.slice(mid, data.length));

  return _merge(left, right);
}

var _merge = (left, right) => {
  var i = 0;
  var j = 0;
  var ret = [];

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

// console.log('mergeSort', mergeSort(data));

var quickSort = data => {
  return _quick(data, 0, data.length - 1);
}

var _quick = (data, left, right) => {
  if (data.length > 1) {
    var midIndex = _partition(data, left, right);

    if (left < midIndex - 1) {
      _quick(data, left, midIndex - 1);
    }

    if (midIndex < right) {
      _quick(data, midIndex, right);
    }
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

    while (data[right] > pivot) {
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

// console.log('quickSort', quickSort(data));

var heapSort = data => {
  var maxIndex = data.length - 1;
  var start = (maxIndex >> 1) - 1;

  // 建堆
  for (var i = start; i >= 0; i--) {
    _maxHeapify(data, i, maxIndex);
  }

  // 排序
  for (var j = maxIndex; j > 0; j--) {
    swap(data, 0, j);
    _maxHeapify(data, 0, j - 1);
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
    swap(data, max, start);
    _maxHeapify(data, max, maxIndex);
  }
}

// console.log('heapSort', heapSort(data));

// n
var countingSort = data => {
  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var counts = Array(max - min + 1);

  for (var i = 0; i < data.length; i++) {
    if (counts[data[i] - min] == null) {
      counts[data[i] - min] = 0;
    }

    counts[data[i] - min]++;
  }

  var sortedIndex = 0;
  for (var j = 0; j < counts.length; j++) {
    while (counts[j] > 0) {
      data[sortedIndex++] = min + j;
      counts[j]--;
    }
  }

  return data;
}
