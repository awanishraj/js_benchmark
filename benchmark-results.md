# JavaScript Runtime Benchmark Results

Benchmark run on 4/13/2025, 1:01:26 AM

## System Information

- OS: darwin arm64
- Node.js: v23.7.0
- Bun: 1.2.5
- Deno: 2.2.4 (stable, release, aarch64-apple-darwin)
- Dart: SDK

## Benchmark Results

### array_operations

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 18.86 | 🥇 Fastest |
| Deno | 54.08 | ✅ Success |
| Node.js | 55.46 | ✅ Success |
| Dart | 118.73 | ✅ Success |

**Details for fastest run (Bun):**
```
Array size: 1000000
Sum of filtered values: 333333666666
Duration: 4ms
```

### async_performance

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 21.06 | 🥇 Fastest |
| Node.js | 23.04 | ✅ Success |
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
| Dart | N/A | ❌ Error: Dart benchmark file not available |

### fibonacci

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 9.43 | 🥇 Fastest |
| Node.js | 18.26 | ✅ Success |
| Deno | 19.02 | ✅ Success |
| Dart | 104.56 | ✅ Success |

**Details for fastest run (Bun):**
```
Fibonacci(40) = 102334155
Duration: 0ms
```

### json_parsing

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 719.75 | 🥇 Fastest |
| Deno | 1607.59 | ✅ Success |
| Node.js | 1938.98 | ✅ Success |
| Dart | 5722.91 | ✅ Success |

**Details for fastest run (Bun):**
```
JSON size: 3497514 bytes
Iterations: 100
Duration: 702ms
```

### memory_pressure

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 23.21 | 🥇 Fastest |
| Node.js | 30.55 | ✅ Success |
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
| Dart | N/A | ❌ Error: Dart benchmark file not available |

**Details for fastest run (Bun):**
```
Initial memory usage: {"rss":33046528,"heapTotal":1778688,"heapUsed":227664,"external":39616,"arrayBuffers":0}
Total memory allocated: 100.00 MB
Peak RSS usage: 132.50 MB
Final RSS usage: 132.50 MB
Duration: 5.90ms
```

### object_creation

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 33.36 | 🥇 Fastest |
| Node.js | 35.14 | ✅ Success |
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
| Dart | N/A | ❌ Error: Dart benchmark file not available |

**Details for fastest run (Bun):**
```
Monomorphic object test result: 3000001500000
Polymorphic object test result: 224999350000
Prototype chain test result: 749998500000
Object transition test result: 159999000000
Duration: 17.23ms
```

### startup_time

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 8.98 | 🥇 Fastest |
| Node.js | 18.57 | ✅ Success |
| Deno | 18.57 | ✅ Success |
| Dart | 102.39 | ✅ Success |

**Details for fastest run (Bun):**
```
Runtime successfully started
```

### string_manipulation

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 20.10 | 🥇 Fastest |
| Deno | 36.58 | ✅ Success |
| Node.js | 37.22 | ✅ Success |
| Dart | 114.91 | ✅ Success |

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

| Benchmark | Node.js | Bun | Deno | Dart | 
|-----------|------------|------------|------------|------------|
| array_operations | 1.00x | **0.34x** 🟢 | **0.98x** 🟢 | **2.14x** 🔴 | 
| async_performance | 1.00x | **0.91x** 🟢 | N/A | N/A | 
| fibonacci | 1.00x | **0.52x** 🟢 | **1.04x** 🔴 | **5.73x** 🔴 | 
| json_parsing | 1.00x | **0.37x** 🟢 | **0.83x** 🟢 | **2.95x** 🔴 | 
| memory_pressure | 1.00x | **0.76x** 🟢 | N/A | N/A | 
| object_creation | 1.00x | **0.95x** 🟢 | N/A | N/A | 
| startup_time | 1.00x | **0.48x** 🟢 | 1.00x | **5.51x** 🔴 | 
| string_manipulation | 1.00x | **0.54x** 🟢 | **0.98x** 🟢 | **3.09x** 🔴 | 

## Runtime Characteristics and Recommendations

| Runtime | Strengths | Weaknesses | Best Use Cases |
|---------|-----------|------------|---------------|
| Node.js | Mature ecosystem, stable performance, V8 optimizations | Slower startup time, higher memory usage | Production servers, enterprise applications |
| Bun | Fast array/JSON processing, good all-rounder, low memory usage | Newer ecosystem, some compatibility issues | High-performance applications, API servers, serverless functions |
| Deno | Security features, built-in TypeScript, modern APIs | Similar performance to Node.js, more limited ecosystem | Security-critical applications, TypeScript projects |
| Dart | Strong typing, optimized for UI, AOT compilation | Limited server-side ecosystem compared to Node.js | Cross-platform apps, Flutter development, UI-heavy applications |

*Note: This benchmark suite provides a snapshot of performance across different JavaScript runtimes. Your specific use case may yield different results. Always benchmark your actual application code for the most accurate assessment.*

## Understanding the Results

- 🥇 **Fastest**: Indicates the runtime with the best performance for a specific benchmark
- 🟢 **Faster than Node.js**: Values lower than 1.00x represent better performance than Node.js
- 🔴 **Slower than Node.js**: Values higher than 1.00x represent worse performance than Node.js

### Key Observations

1. **Bun** consistently outperforms Node.js by **2-3x** across most benchmarks
2. **Deno** performs similarly to Node.js, with slight variations depending on the task
3. **Dart** performance varies based on task type; strong in computational tasks

### Selecting the Right Runtime

- For **high-performance applications**: **Bun** offers the best overall performance
- For **enterprise applications** requiring extensive library support: **Node.js** remains the most mature option
- For **security-focused applications**: **Deno** provides built-in security features with performance similar to Node.js
- For **UI-heavy applications**: **Dart** excels for UI rendering and cross-platform development
