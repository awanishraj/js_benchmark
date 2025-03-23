// Async performance benchmark
// Tests Promise, async/await, and event loop handling

const microtime = require('microtime');

// Helper function to sleep for a given time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a sample async workload
async function runPromiseChain(depth) {
  let result = 1;
  
  // Chain promises depth times
  for (let i = 0; i < depth; i++) {
    result = await Promise.resolve(result * 2);
  }
  
  return result;
}

// Run concurrent promises
async function runPromiseConcurrent(count) {
  const promises = [];
  
  for (let i = 0; i < count; i++) {
    promises.push(Promise.resolve(i).then(x => x * 2));
  }
  
  return Promise.all(promises);
}

// Create a mixed workload with some real timing
async function runMixedAsyncWorkload() {
  const startTime = microtime.now();
  
  // 1. Sequential async operations with minimal delay
  let chainResult = 0;
  for (let i = 0; i < 1000; i++) {
    chainResult += await Promise.resolve(i);
  }
  
  // 2. Test microtask scheduling
  let microtaskResult = 0;
  await new Promise(resolve => {
    // Schedule multiple microtasks
    for (let i = 0; i < 1000; i++) {
      Promise.resolve(i).then(value => {
        microtaskResult += value;
        if (i === 999) resolve();
      });
    }
  });
  
  // 3. Test setTimeout vs setImmediate scheduling
  const timerResults = {
    immediate: 0,
    timeout: 0
  };
  
  await new Promise(resolve => {
    const startImmediateTime = microtime.now();
    
    // Use setImmediate on platforms that support it
    if (typeof setImmediate === 'function') {
      setImmediate(() => {
        timerResults.immediate = microtime.now() - startImmediateTime;
        
        const startTimeoutTime = microtime.now();
        setTimeout(() => {
          timerResults.timeout = microtime.now() - startTimeoutTime;
          resolve();
        }, 0);
      });
    } else {
      // Fallback for platforms without setImmediate
      const startTimeoutTime = microtime.now();
      setTimeout(() => {
        timerResults.timeout = microtime.now() - startTimeoutTime;
        resolve();
      }, 0);
    }
  });
  
  // 4. Test Promise.all with concurrent operations
  const concurrencyLevels = [10, 100, 1000];
  const concurrencyResults = {};
  
  for (const level of concurrencyLevels) {
    const concurrentStart = microtime.now();
    await runPromiseConcurrent(level);
    concurrencyResults[level] = microtime.now() - concurrentStart;
  }
  
  // 5. Test async/await error handling
  let errorHandlingTime = 0;
  try {
    const errorStart = microtime.now();
    await Promise.reject(new Error('Expected test error'));
  } catch (e) {
    errorHandlingTime = microtime.now() - errorStart;
  }
  
  const endTime = microtime.now();
  const totalTime = endTime - startTime;
  
  return {
    chainResult,
    microtaskResult,
    timerResults,
    concurrencyResults,
    errorHandlingTime,
    totalTime
  };
}

// Start measuring the full benchmark
const benchmarkStart = microtime.now();

// Run the async benchmark
(async () => {
  try {
    // Test chain depth performance
    const chainDepthStart = microtime.now();
    const chainDepthResult = await runPromiseChain(10000);
    const chainDepthTime = microtime.now() - chainDepthStart;
    
    // Run the mixed workload
    const workloadResults = await runMixedAsyncWorkload();
    
    // End timing
    const benchmarkEnd = microtime.now();
    const elapsed = (benchmarkEnd - benchmarkStart) / 1000; // Convert to milliseconds
    
    // Output results
    console.log(`Promise chain (depth=10000): ${chainDepthTime / 1000}ms`);
    console.log(`Microtask scheduling (1000 tasks): ${workloadResults.microtaskResult} sum`);
    
    if (workloadResults.timerResults.immediate > 0) {
      console.log(`setImmediate vs setTimeout: ${workloadResults.timerResults.immediate}μs vs ${workloadResults.timerResults.timeout}μs`);
    } else {
      console.log(`setTimeout(0) time: ${workloadResults.timerResults.timeout}μs`);
    }
    
    console.log(`Concurrency performance:`);
    for (const [level, time] of Object.entries(workloadResults.concurrencyResults)) {
      console.log(`  ${level} concurrent promises: ${time / 1000}ms`);
    }
    
    console.log(`Error handling time: ${workloadResults.errorHandlingTime / 1000}ms`);
    console.log(`Total async benchmark time: ${elapsed.toFixed(2)}ms`);
  } catch (error) {
    console.error(`Benchmark failed: ${error.message}`);
  }
})();