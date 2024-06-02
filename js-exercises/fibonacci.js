function fibs(n) {
  if (n <= 1) return [0];
  let a = 0; // First Num
  let b = 1; // Second Num
  let list = [a, b];
  for (let i = 2; i < n; i++) {
    let c = a + b; // Next Num
    a = b;
    b = c;
    list.push(b);
  }
  return list;
}

console.log(fibs(8));

function fibsRec(n) {
  if (n <= 1) return [0];
  if (n === 2) return [0,1];
  let previous = fibsRec(n-1);
  let a = previous[previous.length-2];
  let b = previous[previous.length-1];
  let c = a + b;
  return previous.concat(c);
}

console.log(fibsRec(8));