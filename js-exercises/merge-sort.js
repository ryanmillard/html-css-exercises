function mergeSort(arr) {
  if (arr.length < 2) return arr;

  let midpoint = Math.floor(arr.length/2);
  let left = arr.slice(0, midpoint);
  let right = arr.slice(midpoint);

  return compare(mergeSort(left), mergeSort(right));
}

function compare(left, right) {
  var sorted = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}

console.log(mergeSort([23,6,211,67,2]));