# JavaScript Runtime Benchmark

![JavaScript Runtime Benchmark](https://img.shields.io/badge/JS-Benchmark-yellow)
![Node.js](https://img.shields.io/badge/Node.js-V8-green)
![Bun](https://img.shields.io/badge/Bun-JavaScriptCore-purple)
![Deno](https://img.shields.io/badge/Deno-V8-blue)
![Dart](https://img.shields.io/badge/Dart-SDK-teal)

A comprehensive benchmarking tool to compare performance across major JavaScript and related runtimes:
- Node.js (V8)
- Bun (JavaScriptCore)
- Deno (V8)
- Dart SDK

## Latest Benchmark Results

> Benchmark run on 4/13/2025, 12:57:54 AM

### Runtime Performance Summary

*Using Node.js as the baseline (1.00x) - lower is better*

| Benchmark | Node.js | Bun | Deno | Dart |
|-----------|------------|------------|------------|------------|
| array_operations | 1.00x | **0.34x** 🟢 | **0.97x** 🟢 | **2.14x** 🔴 |
| fibonacci | 1.00x | **0.52x** 🟢 | **1.02x** 🔴 | **5.73x** 🔴 | 
| json_parsing | 1.00x | **0.38x** 🟢 | **0.83x** 🟢 | N/A | 
| startup_time | 1.00x | **0.48x** 🟢 | 1.00x | **5.50x** 🔴 | 
| string_manipulation | 1.00x | **0.52x** 🟢 | **1.01x** 🔴 | **3.07x** 🔴 |
| memory_pressure | 1.00x | **0.68x** 🟢 | N/A | N/A |
| object_creation | 1.00x | **0.98x** 🟢 | N/A | N/A |
| async_performance | 1.00x | **0.97x** 🟢 | N/A | N/A |

### Category Winners

| Category | Winner | Performance Notes |
|----------|--------|-------------|
| Numerical Computation | **Bun** | ~2x faster than Node.js/Deno, ~5.7x faster than Dart |
| Array Operations | **Bun** | ~3x faster than Node.js/Deno, ~6.3x faster than Dart |
| String Manipulation | **Bun** | ~2x faster than Node.js/Deno, ~5.9x faster than Dart | 
| JSON Processing | **Bun** | ~2.6x faster than Node.js, ~2.2x faster than Deno |
| Startup Time | **Bun** | ~2x faster than Node.js/Deno, ~11.5x faster than Dart |
| Memory Management | **Bun** | Better memory efficiency and GC performance |
| Object Optimization | **Bun** | Better handling of object shapes/transitions |
| Async Performance | **Bun** | Slightly faster Promise resolution and event loop |

### Runtime Characteristics

| Runtime | Strengths | Weaknesses | Best Use Cases |
|---------|-----------|------------|---------------|
| Node.js | Mature ecosystem, stable performance, V8 optimizations | Slower startup time, higher memory usage | Production servers, enterprise applications |
| Bun | Fast array/JSON processing, good all-rounder, low memory usage | Newer ecosystem, some compatibility issues | High-performance applications, API servers, serverless functions |
| Deno | Security features, built-in TypeScript, modern APIs | Similar performance to Node.js, more limited ecosystem | Security-critical applications, TypeScript projects |
| Dart | Strong typing, optimized for UI, AOT compilation | Slower for general JavaScript tasks | Cross-platform apps, Flutter development, UI-heavy applications |

> 🟢 **Faster than Node.js** | 🔴 **Slower than Node.js**  
> For complete details, see [benchmark-results.md](benchmark-results.md)

## Benchmark Categories

The benchmarks test various aspects of JavaScript performance:

### Core Language Features
1. **Numerical Computation** (`fibonacci.js`)
   - Computes Fibonacci numbers iteratively
   - Tests raw mathematical performance
   
2. **Array Operations** (`array_operations.js`)
   - Creates and manipulates large arrays (1,000,000 elements)
   - Tests map, filter, reduce operations
   - Evaluates memory efficiency with large collections

3. **String Manipulation** (`string_manipulation.js`)
   - Creates and manipulates large strings (500,000 characters)
   - Tests string methods, regex, and template literals
   - Evaluates text processing performance

4. **JSON Processing** (`json_parsing.js`)
   - Generates deep nested JSON objects
   - Tests JSON.parse and JSON.stringify operations
   - Evaluates serialization/deserialization performance

### Engine Optimizations
5. **Memory Management** (`memory_pressure.js`)
   - Tests garbage collection efficiency
   - Evaluates performance under memory pressure
   - Measures memory usage patterns
   
6. **Object Creation & Property Access** (`object_creation.js`)
   - Tests hidden class/shape optimizations
   - Measures monomorphic vs polymorphic performance
   - Evaluates prototype chain lookups

7. **Async Performance** (`async_performance.js`) 
   - Evaluates Promise and async/await performance
   - Tests event loop scheduling efficiency
   - Measures microtask queue processing

8. **Startup Time** (`startup_time.js`)
   - Measures runtime initialization overhead
   - Critical for serverless and CLI applications

## Running Your Own Benchmarks

### Prerequisites

Install the following runtimes to run all benchmarks:

#### Node.js
```bash
# macOS with Homebrew
brew install node

# Using nvm
nvm install stable

# Direct download
# Visit https://nodejs.org/
```

#### Bun
```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Using npm
npm install -g bun
```

#### Deno
```bash
# macOS / Linux
curl -fsSL https://deno.land/install.sh | sh

# Using Homebrew
brew install deno
```

#### Dart
```bash
# macOS with Homebrew
brew install dart

# Direct download
# Visit https://dart.dev/get-dart
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/jsbenchmark.git
cd jsbenchmark

# Install dependencies
npm install
```

### Running Benchmarks

```bash
npm run benchmark
```

This will:
1. Run all benchmark tests in the `benchmarks/` directory
2. Execute each test with all available runtimes
3. Generate a detailed `benchmark-results.md` report

## Adding Custom Benchmarks

### JavaScript Benchmarks
Create new `.js` files in the `benchmarks/` directory. Each benchmark should:

1. Execute the desired operations
2. Measure and log execution time
3. Output meaningful results for the report

Example template:

```javascript
// Description of what this benchmark tests

// Setup test data
const someData = /* ... */;

// Start timing
const startTime = Date.now();

// Perform operations to be measured
// ...

const endTime = Date.now();
const duration = endTime - startTime;

// Log results
console.log(`Some result: ${someResult}`);
console.log(`Duration: ${duration}ms`);
```

### Dart Benchmarks
Create equivalent Dart implementations in the `dart_benchmarks/` directory with the same name as the JavaScript benchmark but with a `.dart` extension.

Example template:

```dart
// Description of what this benchmark tests
import 'dart:core';

void main() {
  // Setup test data
  final someData = /* ... */;
  
  // Start timing
  final stopwatch = Stopwatch()..start();
  
  // Perform operations to be measured
  // ...
  
  // Stop timer
  stopwatch.stop();
  final duration = stopwatch.elapsedMilliseconds;
  
  // Log results
  print('Some result: $someResult');
  print('Duration: ${duration}ms');
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC