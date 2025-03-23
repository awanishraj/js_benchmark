# JavaScript Runtime Benchmark Results

Benchmark run on 3/23/2025, 1:14:59 PM

## System Information

- OS: darwin arm64
- Node.js: v23.7.0
- Bun: 1.2.5
- Deno: 2.2.4 (stable, release, aarch64-apple-darwin)

## Benchmark Results

### array_operations

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 19.11 | 🥇 Fastest |
| Deno | 53.85 | ✅ Success |
| Node.js | 55.23 | ✅ Success |

**Details for fastest run (Bun):**
```
Array size: 1000000
Sum of filtered values: 333333666666
Duration: 5ms
```

### fibonacci

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 9.36 | 🥇 Fastest |
| Node.js | 18.09 | ✅ Success |
| Deno | 18.42 | ✅ Success |

**Details for fastest run (Bun):**
```
Fibonacci(40) = 102334155
Duration: 0ms
```

### json_parsing

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 714.09 | 🥇 Fastest |
| Deno | 1573.64 | ✅ Success |
| Node.js | 1925.17 | ✅ Success |

**Details for fastest run (Bun):**
```
JSON size: 3497756 bytes
Iterations: 100
Duration: 696ms
```

### startup_time

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 8.88 | 🥇 Fastest |
| Node.js | 17.91 | ✅ Success |
| Deno | 18.13 | ✅ Success |

**Details for fastest run (Bun):**
```
Runtime successfully started
```

### string_manipulation

| Runtime | Time (ms) | Status |
|---------|-----------|--------|
| Bun | 19.10 | 🥇 Fastest |
| Node.js | 36.42 | ✅ Success |
| Deno | 36.55 | ✅ Success |

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

## Overall Performance Winner

**Bun** - won 5 out of 5 benchmarks

## Relative Performance

*Using Node.js as the baseline (1.00x) - lower is better, higher is worse*

| Benchmark | Node.js | Bun | Deno | 
|-----------|------------|------------|------------|
| array_operations | 1.00x | **0.35x** 🟢 | **0.98x** 🟢 | 
| fibonacci | 1.00x | **0.52x** 🟢 | **1.02x** 🔴 | 
| json_parsing | 1.00x | **0.37x** 🟢 | **0.82x** 🟢 | 
| startup_time | 1.00x | **0.50x** 🟢 | **1.01x** 🔴 | 
| string_manipulation | 1.00x | **0.52x** 🟢 | 1.00x | 

## Runtime Characteristics and Recommendations

| Runtime | Strengths | Weaknesses | Best Use Cases |
|---------|-----------|------------|---------------|
| Node.js | Mature ecosystem, stable performance | Slower startup time, higher memory usage | Production servers, enterprise applications |
| Bun | Fast array/JSON processing, good all-rounder | Newer ecosystem, some compatibility issues | High-performance applications, API servers |
| Deno | Security features, built-in TypeScript | Similar performance to Node.js | Security-critical applications, TypeScript projects |

*Note: This benchmark suite provides a snapshot of performance across different JavaScript runtimes. Your specific use case may yield different results. Always benchmark your actual application code for the most accurate assessment.*

## Understanding the Results

- 🥇 **Fastest**: Indicates the runtime with the best performance for a specific benchmark
- 🟢 **Faster than Node.js**: Values lower than 1.00x represent better performance than Node.js
- 🔴 **Slower than Node.js**: Values higher than 1.00x represent worse performance than Node.js

### Key Observations

1. **Bun** consistently outperforms Node.js by **2-3x** across most benchmarks
2. **Deno** performs similarly to Node.js, with slight variations depending on the task

### Selecting the Right Runtime

- For **high-performance applications**: **Bun** offers the best overall performance
- For **enterprise applications** requiring extensive library support: **Node.js** remains the most mature option
- For **security-focused applications**: **Deno** provides built-in security features with performance similar to Node.js
