// Fibonacci benchmark for Dart
import 'dart:core';
import 'dart:io';

// Regular recursive implementation (inefficient, for comparison)
int fibonacciRecursive(int n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Memoized implementation
Map<int, int> memo = {};
int fibonacciMemoized(int n) {
  if (memo.containsKey(n)) return memo[n]!;
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemoized(n - 1) + fibonacciMemoized(n - 2);
  return memo[n]!;
}

// Iterative implementation (most efficient)
int fibonacciIterative(int n) {
  if (n <= 1) return n;
  
  int fib = 1;
  int prevFib = 1;
  
  for (int i = 2; i < n; i++) {
    int temp = fib;
    fib += prevFib;
    prevFib = temp;
  }
  
  return fib;
}

void main() {
  final n = 40; // Same value as JS benchmark
  
  // Use the most efficient algorithm for benchmarking
  final stopwatch = Stopwatch()..start();
  
  // Run the benchmark
  final result = fibonacciMemoized(n);
  
  // Stop timer
  stopwatch.stop();
  final duration = stopwatch.elapsedMilliseconds;
  
  // Output in same format as JS version
  print('Fibonacci($n) = $result');
  print('Duration: ${duration}ms');
}