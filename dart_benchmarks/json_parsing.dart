// JSON parsing benchmark for Dart
import 'dart:convert';
import 'dart:math';

void main() {
  final iterations = 100;
  final stopwatch = Stopwatch()..start();
  
  // Create a large, nested JSON object similar to the JS version
  final jsonObject = generateNestedObject(5, 10);
  final jsonString = jsonEncode(jsonObject);
  
  // Results storage
  int totalSize = 0;
  
  // Parse and stringify multiple times
  for (int i = 0; i < iterations; i++) {
    // Parse
    final parsed = jsonDecode(jsonString);
    
    // Make a small modification
    if (parsed is Map) {
      parsed['timestamp'] = DateTime.now().millisecondsSinceEpoch;
    }
    
    // Stringify again
    final newJsonString = jsonEncode(parsed);
    
    // Track total size of all generated JSON strings
    totalSize += newJsonString.length;
  }
  
  // Stop timer
  stopwatch.stop();
  final duration = stopwatch.elapsedMilliseconds;
  
  // Output in same format as JS version
  print('JSON size: ${jsonString.length} bytes');
  print('Iterations: $iterations');
  print('Duration: ${duration}ms');
}

// Generate a nested object with specified depth and breadth
Map<String, dynamic> generateNestedObject(int depth, int breadth) {
  final result = <String, dynamic>{};
  final random = Random();
  
  if (depth <= 0) {
    // Base case: generate leaf values
    result['string'] = 'value_${random.nextInt(1000)}';
    result['number'] = random.nextDouble() * 1000;
    result['boolean'] = random.nextBool();
    result['null'] = null;
    return result;
  }
  
  // Add properties at this level
  for (int i = 0; i < breadth; i++) {
    final propertyName = 'prop_${i}_${random.nextInt(1000)}';
    
    // Randomly decide what type of value to add
    final valueType = random.nextInt(4);
    
    switch (valueType) {
      case 0:
        // Nested object
        result[propertyName] = generateNestedObject(depth - 1, breadth);
        break;
      case 1:
        // Array of nested objects
        final array = <Map<String, dynamic>>[];
        final arrayLength = random.nextInt(5) + 1;
        for (int j = 0; j < arrayLength; j++) {
          array.add(generateNestedObject(depth - 1, breadth));
        }
        result[propertyName] = array;
        break;
      case 2:
        // Simple scalar value
        result[propertyName] = random.nextInt(1000);
        break;
      case 3:
        // String value
        result[propertyName] = 'value_${random.nextInt(1000)}';
        break;
    }
  }
  
  return result;
}