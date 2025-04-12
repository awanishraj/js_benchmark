// Array operations benchmark for Dart
import 'dart:core';

void main() {
  // Same parameters as JS version
  final size = 1000000;
  final stopwatch = Stopwatch()..start();
  
  // Create a large list
  final List<int> arr = List.generate(size, (i) => i);
  
  // Initialize sum
  int sum = 0;
  
  // Map operation
  final mapped = arr.map((x) => x * 2).toList();
  
  // Filter operation (equivalent to === 0 in JS)
  final filtered = mapped.where((x) => x % 3 == 0).toList();
  
  // Reduce operation
  sum = filtered.fold(0, (acc, curr) => acc + curr);
  
  // Stop timer
  stopwatch.stop();
  final duration = stopwatch.elapsedMilliseconds;
  
  // Output in same format as JS version
  print('Array size: $size');
  print('Sum of filtered values: $sum');
  print('Duration: ${duration}ms');
}