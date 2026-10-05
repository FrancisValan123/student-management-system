function bubbleSort(arr, key = 'rollNo') {
  const a = [...arr];
  let swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j][key] > a[j + 1][key]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
      }
    }
  }
  return { sorted: a, swaps };
}

function selectionSort(arr, key = 'rollNo') {
  const a = [...arr];
  let swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j][key] < a[minIdx][key]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      swaps++;
    }
  }
  return { sorted: a, swaps };
}

function mergeSort(arr, key = 'rollNo') {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);

  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i][key] <= right[j][key]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  return [...merged, ...left.slice(i), ...right.slice(j)];
}

module.exports = { bubbleSort, selectionSort, mergeSort };