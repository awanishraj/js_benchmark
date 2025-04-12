# JavaScript Runtime Benchmark Results

Benchmark run on 4/13/2025, 1:17:32 AM

## System Information

- OS: darwin arm64
- Node.js: v23.7.0
- Bun: 1.2.5
- Deno: 2.2.4 (stable, release, aarch64-apple-darwin)
- Dart JIT: SDK
- Dart AOT: SDK

## Benchmark Results

### array_operations

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 20.32 | 🥇 Fastest |
| Dart AOT | 30.73 | ✅ Success |
| Deno | 53.43 | ✅ Success |
| Node.js | 58.36 | ✅ Success |
| Dart JIT | 118.92 | ✅ Success |

**Details for fastest run (Bun):**
```
Array size: 1000000
Sum of filtered values: 333333666666
Duration: 6ms
```

### async_performance

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 21.64 | 🥇 Fastest |
| Node.js | 23.53 | ✅ Success |
| Deno | N/A | ❌ Error: Command failed: deno run /Users/awanishraj/Workspace/jsbenchmark/benchmarks/async_performance.js
[0m[1m[31merror[0m: Uncaught (in promise) ReferenceError: require is not defined
const microtime = require('microtime');
[0m[31m                  ^[0m
    at [0m[36mfile:///Users/awanishraj/Workspace/jsbenchmark/benchmarks/async_performance.js[0m:[0m[33m4[0m:[0m[33m19[0m

    [0m[33minfo:[0m Deno supports CommonJS modules in [4m.cjs[24m files, or when the closest
          [4mpackage.json[24m has a [3m"type": "commonjs"[23m option.
    [0m[36mhint:[0m Rewrite this module to ESM,
          or change the file extension to [4m.cjs[24m,
          or add [4mpackage.json[24m next to the file with [3m"type": "commonjs"[23m option,
          or pass [3m--unstable-detect-cjs[23m flag to detect CommonJS when loading.
    [0m[32mdocs:[0m [4mhttps://docs.deno.com/go/commonjs[24m
 |
| Dart JIT | N/A | ❌ Error: Dart benchmark file not available |
| Dart AOT | N/A | ❌ Error: Dart AOT executable not available |

### fibonacci

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 9.77 | 🥇 Fastest |
| Dart AOT | 16.25 | ✅ Success |
| Deno | 18.51 | ✅ Success |
| Node.js | 19.00 | ✅ Success |
| Dart JIT | 103.88 | ✅ Success |

**Details for fastest run (Bun):**
```
Fibonacci(40) = 102334155
Duration: 0ms
```

### json_parsing

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 737.70 | 🥇 Fastest |
| Deno | 1612.10 | ✅ Success |
| Node.js | 1969.00 | ✅ Success |
| Dart AOT | 10377.24 | ✅ Success |
| Dart JIT | 16745.49 | ✅ Success |

**Details for fastest run (Bun):**
```
JSON size: 3497264 bytes
Iterations: 100
Duration: 720ms
```

### memory_pressure

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 21.79 | 🥇 Fastest |
| Node.js | 31.09 | ✅ Success |
| Deno | N/A | ❌ Error: Command failed: deno run /Users/awanishraj/Workspace/jsbenchmark/benchmarks/memory_pressure.js
[0m[1m[31merror[0m: Uncaught (in promise) ReferenceError: require is not defined
const microtime = require('microtime');
[0m[31m                  ^[0m
    at [0m[36mfile:///Users/awanishraj/Workspace/jsbenchmark/benchmarks/memory_pressure.js[0m:[0m[33m5[0m:[0m[33m19[0m

    [0m[33minfo:[0m Deno supports CommonJS modules in [4m.cjs[24m files, or when the closest
          [4mpackage.json[24m has a [3m"type": "commonjs"[23m option.
    [0m[36mhint:[0m Rewrite this module to ESM,
          or change the file extension to [4m.cjs[24m,
          or add [4mpackage.json[24m next to the file with [3m"type": "commonjs"[23m option,
          or pass [3m--unstable-detect-cjs[23m flag to detect CommonJS when loading.
    [0m[32mdocs:[0m [4mhttps://docs.deno.com/go/commonjs[24m
 |
| Dart JIT | N/A | ❌ Error: Dart benchmark file not available |
| Dart AOT | N/A | ❌ Error: Dart AOT executable not available |

**Details for fastest run (Bun):**
```
Initial memory usage: {"rss":30113792,"heapTotal":1778688,"heapUsed":227664,"external":39616,"arrayBuffers":0}
Total memory allocated: 100.00 MB
Peak RSS usage: 131.55 MB
Final RSS usage: 131.55 MB
Duration: 5.37ms
```

### object_creation

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 33.15 | 🥇 Fastest |
| Node.js | 35.13 | ✅ Success |
| Deno | N/A | ❌ Error: Command failed: deno run /Users/awanishraj/Workspace/jsbenchmark/benchmarks/object_creation.js
[0m[1m[31merror[0m: Uncaught (in promise) ReferenceError: require is not defined
const microtime = require('microtime');
[0m[31m                  ^[0m
    at [0m[36mfile:///Users/awanishraj/Workspace/jsbenchmark/benchmarks/object_creation.js[0m:[0m[33m5[0m:[0m[33m19[0m

    [0m[33minfo:[0m Deno supports CommonJS modules in [4m.cjs[24m files, or when the closest
          [4mpackage.json[24m has a [3m"type": "commonjs"[23m option.
    [0m[36mhint:[0m Rewrite this module to ESM,
          or change the file extension to [4m.cjs[24m,
          or add [4mpackage.json[24m next to the file with [3m"type": "commonjs"[23m option,
          or pass [3m--unstable-detect-cjs[23m flag to detect CommonJS when loading.
    [0m[32mdocs:[0m [4mhttps://docs.deno.com/go/commonjs[24m
 |
| Dart JIT | N/A | ❌ Error: Dart benchmark file not available |
| Dart AOT | N/A | ❌ Error: Dart AOT executable not available |

**Details for fastest run (Bun):**
```
Monomorphic object test result: 3000001500000
Polymorphic object test result: 224999350000
Prototype chain test result: 749998500000
Object transition test result: 159999000000
Duration: 17.16ms
```

### startup_time

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 10.70 | 🥇 Fastest |
| Dart AOT | 12.31 | ✅ Success |
| Deno | 17.92 | ✅ Success |
| Node.js | 19.84 | ✅ Success |
| Dart JIT | 99.55 | ✅ Success |

**Details for fastest run (Bun):**
```
Runtime successfully started
```

### string_manipulation

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 19.35 | 🥇 Fastest |
| Dart AOT | 22.06 | ✅ Success |
| Deno | 36.76 | ✅ Success |
| Node.js | 37.62 | ✅ Success |
| Dart JIT | 113.15 | ✅ Success |

**Details for fastest run (Bun):**
```
String size: 500000
Result length: 103
Duration: 9ms
```

## Category Winners

| Category | Winner | Notes |
|----------|--------|-------|
| Numerical Computation | Bun | Won 1 benchmark(s) |
| Array Operations | Bun | Won 1 benchmark(s) |
| String Manipulation | Bun | Won 1 benchmark(s) |
| JSON Processing | Bun | Won 1 benchmark(s) |
| Startup Time | Bun | Won 1 benchmark(s) |
| Memory Management | Bun | Won 1 benchmark(s) |
| Object & Engine Optimizations | Bun | Won 1 benchmark(s) |
| Async Performance | Bun | Won 1 benchmark(s) |

## Overall Performance Winner

**Bun** - won 8 out of 8 benchmarks

## Relative Performance

*Using Node.js as the baseline (1.00x) - lower is better, higher is worse*

| Benchmark | Node.js | Bun | Deno | Dart JIT | Dart AOT | 
|-----------|------------|------------|------------|------------|------------|
| array_operations | 1.00x | **0.35x** 🟢 | **0.92x** 🟢 | **2.04x** 🔴 | **0.53x** 🟢 | 
| async_performance | 1.00x | **0.92x** 🟢 | N/A | N/A | N/A | 
| fibonacci | 1.00x | **0.51x** 🟢 | **0.97x** 🟢 | **5.47x** 🔴 | **0.86x** 🟢 | 
| json_parsing | 1.00x | **0.37x** 🟢 | **0.82x** 🟢 | **8.50x** 🔴 | **5.27x** 🔴 | 
| memory_pressure | 1.00x | **0.70x** 🟢 | N/A | N/A | N/A | 
| object_creation | 1.00x | **0.94x** 🟢 | N/A | N/A | N/A | 
| startup_time | 1.00x | **0.54x** 🟢 | **0.90x** 🟢 | **5.02x** 🔴 | **0.62x** 🟢 | 
| string_manipulation | 1.00x | **0.51x** 🟢 | **0.98x** 🟢 | **3.01x** 🔴 | **0.59x** 🟢 | 

## Runtime Characteristics and Recommendations

| Runtime | Strengths | Weaknesses | Best Use Cases |
|---------|-----------|------------|---------------|
| Node.js | Mature ecosystem, stable performance, V8 optimizations | Slower startup time, higher memory usage | Production servers, enterprise applications |
| Bun | Fast array/JSON processing, good all-rounder, low memory usage | Newer ecosystem, some compatibility issues | High-performance applications, API servers, serverless functions |
| Deno | Security features, built-in TypeScript, modern APIs | Similar performance to Node.js, more limited ecosystem | Security-critical applications, TypeScript projects |
| Dart JIT | Strong typing, optimized for UI, good for development | Slower JIT performance, larger memory footprint | Flutter development, iterative coding, debugging |
| Dart AOT | Strong typing, optimized native code, small footprint | Limited server-side ecosystem compared to Node.js | Production Flutter apps, performance-critical code |

*Note: This benchmark suite provides a snapshot of performance across different JavaScript runtimes. Your specific use case may yield different results. Always benchmark your actual application code for the most accurate assessment.*

## Understanding the Results

- 🥇 **Fastest**: Indicates the runtime with the best performance for a specific benchmark
- 🟢 **Faster than Node.js**: Values lower than 1.00x represent better performance than Node.js
- 🔴 **Slower than Node.js**: Values higher than 1.00x represent worse performance than Node.js

### Key Observations

1. **Bun** consistently outperforms Node.js by **2-3x** across most benchmarks
2. **Deno** performs similarly to Node.js, with slight variations depending on the task
3. **Dart JIT** runs slower than JavaScript runtimes for most benchmarks
4. **Dart AOT** provides significant performance improvements over Dart JIT

### Selecting the Right Runtime

- For **high-performance applications**: **Bun** offers the best overall performance
- For **enterprise applications** requiring extensive library support: **Node.js** remains the most mature option
- For **security-focused applications**: **Deno** provides built-in security features with performance similar to Node.js
- For **UI-heavy applications**: **Dart AOT** excels for UI rendering and cross-platform development
- For **development/debugging**: **Dart JIT** offers better developer experience with hot reload
