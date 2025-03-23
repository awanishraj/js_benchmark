// Fibonacci benchmark

// Calculate fibonacci recursively
function fibonacciRecursive(n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Calculate fibonacci with memoization
function fibonacciMemoized(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  return memo[n];
}

// Calculate fibonacci iteratively
function fibonacciIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// Run benchmark
const n = 40;
const startTime = Date.now();

// Use iterative approach as recursive would be too slow for large n
const result = fibonacciIterative(n);

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`Fibonacci(${n}) = ${result}`);
console.log(`Duration: ${duration}ms`);
