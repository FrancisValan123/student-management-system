function linearSearch(arr, rollNo) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].rollNo === rollNo) {
      return { index: i, data: arr[i], comparisons: i + 1 };
    }
  }
  return { index: -1, data: null, comparisons: arr.length };
}

function binarySearch(arr, rollNo) {
  let low = 0, high = arr.length - 1, comparisons = 0;
  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);
    if (arr[mid].rollNo === rollNo) {
      return { index: mid, data: arr[mid], comparisons };
    } else if (arr[mid].rollNo < rollNo) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return { index: -1, data: null, comparisons };
}

module.exports = { linearSearch, binarySearch };