// String manipulation benchmark for Dart
import 'dart:core';

void main() {
  final size = 500000;
  final stopwatch = Stopwatch()..start();
  
  // Create a large string
  String text = 'a' * size;
  
  // Initialize result
  String result = '';
  
  // String replacement (equivalent to .replace(/a/g, 'b') in JS)
  text = text.replaceAll('a', 'b');
  
  // Split and join
  final parts = text.split('').take(100).toList();
  result = parts.join('-');
  
  // String operations in a loop
  for (int i = 0; i < 1000; i++) {
    result = result.substring(0, result.length > 10 ? 10 : result.length);
    result += i.toString();
  }
  
  // Stop timer
  stopwatch.stop();
  final duration = stopwatch.elapsedMilliseconds;
  
  // Output in same format as JS version
  print('String size: $size');
  print('Result length: ${result.length}');
  print('Duration: ${duration}ms');
}