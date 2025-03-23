# JavaScript Runtime Benchmark Summary

This project provides a comprehensive benchmarking toolkit for comparing the performance of the three major JavaScript runtimes: Node.js, Bun, and Deno.

## Key Results

Based on our benchmark tests, here are the key findings:

### Overall Performance Rankings

1. **Bun** - Consistently fastest across all benchmarks
2. **Deno** - Generally similar to Node.js, sometimes slightly better
3. **Node.js** - Baseline performance

### Performance by Category

| Category | Winner | Notable Results |
|----------|--------|----------------|
| Numerical Computation | **Bun** | 2x faster than Node.js & Deno |
| Array Operations | **Bun** | 3x faster than Node.js & Deno |
| String Manipulation | **Bun** | 2x faster than Node.js & Deno |
| JSON Processing | **Bun** | 2.7x faster than Node.js, 1.2x faster than Deno |
| Startup Time | **Bun** | 2x faster than Node.js & Deno |

## Performance Highlights

- **Bun** shows exceptional performance across all test categories, especially in array operations and JSON processing
- **Deno** and **Node.js** perform very similarly across most benchmarks
- **Bun's** startup time is approximately half that of both Node.js and Deno, making it particularly suitable for serverless and CLI applications

## Benchmark Methodology

Each runtime executes the same JavaScript code testing:
- Computational performance (Fibonacci)
- Array operations (map, filter, reduce)
- String manipulation
- JSON parsing/stringifying
- Startup time

Each benchmark runs 3 times with the best result recorded. Tests were conducted on macOS arm64 (Apple Silicon).

## Recommendations

- For maximum performance: **Bun**
- For mature ecosystem and broad compatibility: **Node.js**
- For security-focused applications with built-in TypeScript support: **Deno**

To run these benchmarks yourself and see how these runtimes perform on your system, follow the instructions in the README.md.