// Memory pressure and garbage collection benchmark
// This benchmark tests how efficiently each runtime handles memory allocation and garbage collection

// Use the microtime module for more precise timing
const microtime = require('microtime');

// Create a class to allocate memory with
class MemoryChunk {
  constructor(size) {
    this.buffer = Buffer.alloc(size);
    // Write some data to ensure it's actually allocated
    for (let i = 0; i < size; i += 1024) {
      this.buffer[i] = i % 256;
    }
    this.id = Math.random();
  }
}

// Create an array to hold references temporarily
let memoryChunks = [];
const iterations = 100;
const chunkSize = 1024 * 1024; // 1MB chunks
const maxChunks = 100; // Maximum number of chunks to hold at once

// Start timing
const startTimeHr = process.hrtime();
const startTime = microtime.now();

// Metrics to track
let totalAllocated = 0;
let peakRSS = 0;
let currentRSS = 0;

// Helper to get current memory usage
function getMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  currentRSS = memoryUsage.rss / (1024 * 1024); // Convert to MB
  peakRSS = Math.max(peakRSS, currentRSS);
  return memoryUsage;
}

// Initial memory usage
console.log(`Initial memory usage: ${JSON.stringify(getMemoryUsage())}`);

// Run allocation pattern that triggers garbage collection
for (let i = 0; i < iterations; i++) {
  // Allocate a new chunk
  memoryChunks.push(new MemoryChunk(chunkSize));
  totalAllocated += chunkSize;
  
  // If we exceed our limit, remove some chunks to trigger GC
  if (memoryChunks.length > maxChunks) {
    // Remove older chunks but keep a random selection to maintain
    // some memory pressure and prevent simple optimizations
    const removeCount = Math.floor(maxChunks * 0.7);
    memoryChunks.splice(0, removeCount);
    
    // Explicitly suggest GC (note: this is advisory only)
    if (global.gc) {
      global.gc();
    }
  }
  
  // Check memory usage periodically
  if (i % 10 === 0) {
    getMemoryUsage();
  }
}

// Final cleanup - release all references
memoryChunks = [];

// Suggest final GC before measuring
if (global.gc) {
  global.gc();
}

// End timing
const endTimeHr = process.hrtime(startTimeHr);
const elapsedMs = (endTimeHr[0] * 1000) + (endTimeHr[1] / 1000000);
const endTime = microtime.now();
const elapsed = (endTime - startTime) / 1000; // Convert microseconds to milliseconds

// Final memory check
const finalMemory = getMemoryUsage();

console.log(`Total memory allocated: ${(totalAllocated / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Peak RSS usage: ${peakRSS.toFixed(2)} MB`);
console.log(`Final RSS usage: ${currentRSS.toFixed(2)} MB`);
console.log(`Duration: ${elapsed.toFixed(2)}ms`);