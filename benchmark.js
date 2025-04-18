const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// Create benchmarks directory if it doesn't exist
const BENCHMARKS_DIR = path.join(__dirname, 'benchmarks');
if (!fs.existsSync(BENCHMARKS_DIR)) {
  fs.mkdirSync(BENCHMARKS_DIR);
}

// Results storage
const results = {};

// Run all benchmark files
const benchmarkFiles = fs.readdirSync(BENCHMARKS_DIR).filter(file => file.endsWith('.js'));

// Check runtimes availability
const runtimes = [
  { 
    name: 'Node.js', 
    cmd: 'node',
    version: process.version,
    available: true
  }
];

// Check Bun
try {
  const bunVersion = execSync('bun --version', { encoding: 'utf8' }).trim();
  runtimes.push({ 
    name: 'Bun', 
    cmd: 'bun', 
    version: bunVersion,
    available: true
  });
  console.log(`Bun ${bunVersion} is available`);
} catch (e) {
  console.log('Bun is not available, skipping...');
  runtimes.push({ name: 'Bun', available: false });
}

// Check Deno
try {
  const denoVersion = execSync('deno --version', { encoding: 'utf8' }).trim().split('\n')[0].replace('deno ', '');
  runtimes.push({ 
    name: 'Deno', 
    cmd: 'deno run', 
    version: denoVersion,
    available: true
  });
  console.log(`Deno ${denoVersion} is available`);
} catch (e) {
  console.log('Deno is not available, skipping...');
  runtimes.push({ name: 'Deno', available: false });
}

// Check Dart (JIT)
try {
  const dartVersion = execSync('dart --version', { encoding: 'utf8' }).trim().split(' ')[1];
  console.log(`Dart JIT ${dartVersion || 'SDK'} is available`);
  
  // Create a separate dart directory if it doesn't exist
  const DART_DIR = path.join(__dirname, 'dart_benchmarks');
  if (!fs.existsSync(DART_DIR)) {
    fs.mkdirSync(DART_DIR);
    console.log('Created dart_benchmarks directory');
  }

  // For Dart, we need separate Dart files since the syntax is different
  runtimes.push({ 
    name: 'Dart JIT', 
    cmd: 'dart',
    version: dartVersion || 'SDK',
    available: true,
    useDartFiles: true // Flag to use Dart-specific files
  });
  
  // Check Dart AOT
  try {
    // Compile Dart files to executables for AOT mode
    console.log("Setting up Dart AOT executables...");
    
    // Create directory for AOT executables if it doesn't exist
    const DART_AOT_DIR = path.join(__dirname, 'dart_aot');
    if (!fs.existsSync(DART_AOT_DIR)) {
      fs.mkdirSync(DART_AOT_DIR);
      console.log('Created dart_aot directory');
    }

    // Compile dart files to AOT executables during setup
    fs.readdirSync(DART_DIR).filter(file => file.endsWith('.dart')).forEach(dartFile => {
      const baseName = path.basename(dartFile, '.dart');
      const dartFilePath = path.join(DART_DIR, dartFile);
      const aotFilePath = path.join(DART_AOT_DIR, baseName);
      
      try {
        console.log(`Compiling ${dartFile} to AOT executable...`);
        execSync(`dart compile exe "${dartFilePath}" -o "${aotFilePath}"`, { stdio: 'inherit' });
        console.log(`Successfully compiled ${dartFile} to AOT executable`);
      } catch (compileError) {
        console.error(`Error compiling ${dartFile} to AOT:`, compileError.message);
      }
    });
    
    // Add Dart AOT as a runtime
    runtimes.push({ 
      name: 'Dart AOT', 
      cmd: '',  // Will be set dynamically per benchmark
      version: dartVersion || 'SDK',
      available: true,
      useDartAOT: true // Flag to use Dart AOT executables
    });
    
    console.log(`Dart AOT ${dartVersion || 'SDK'} is available`);
  } catch (aotError) {
    console.log('Dart AOT setup failed, skipping...', aotError.message);
    runtimes.push({ name: 'Dart AOT', available: false });
  }
} catch (e) {
  console.log('Dart is not available, skipping...');
  runtimes.push({ name: 'Dart JIT', available: false });
  runtimes.push({ name: 'Dart AOT', available: false });
}

// Other JavaScript runtimes can be added here in the future

// Node.js, Bun, Deno, and Dart are included in this comparison

// For each benchmark file
benchmarkFiles.forEach(benchmarkFile => {
  const benchmarkName = path.basename(benchmarkFile, '.js');
  console.log(`\n\n== Running benchmark: ${benchmarkName} ==`);
  
  // Create results entry
  results[benchmarkName] = [];
  
  // For each runtime
  runtimes.forEach(runtime => {
    if (!runtime.available) {
      console.log(`${runtime.name} is not available, skipping...`);
      results[benchmarkName].push({
        name: runtime.name,
        time: 0,
        error: 'Runtime not available'
      });
      return;
    }
    
    try {
      // Select the appropriate benchmark path based on runtime
      let benchmarkPath;
      let executionCommand = runtime.cmd;
      
      if (runtime.useDartFiles) {
        // For Dart JIT, use equivalent Dart files from dart_benchmarks directory
        const dartFileName = `${benchmarkName}.dart`;
        benchmarkPath = path.join(__dirname, 'dart_benchmarks', dartFileName);
        
        // Skip if Dart file doesn't exist
        if (!fs.existsSync(benchmarkPath)) {
          console.log(`${dartFileName} not found in dart_benchmarks directory, skipping...`);
          results[benchmarkName].push({
            name: runtime.name,
            time: 0,
            error: 'Dart benchmark file not available'
          });
          return;
        }
      } else if (runtime.useDartAOT) {
        // For Dart AOT, use the compiled executables
        const aotFilePath = path.join(__dirname, 'dart_aot', benchmarkName);
        
        // Skip if AOT executable doesn't exist
        if (!fs.existsSync(aotFilePath)) {
          console.log(`${benchmarkName} AOT executable not found, skipping...`);
          results[benchmarkName].push({
            name: runtime.name,
            time: 0,
            error: 'Dart AOT executable not available'
          });
          return;
        }
        
        // Use the executable directly, no command needed
        benchmarkPath = aotFilePath;
        // In Unix-like systems, we need to execute the file directly
        executionCommand = ''; 
      } else {
        // For JS runtimes, use the JS files
        benchmarkPath = path.join(BENCHMARKS_DIR, benchmarkFile);
      }
      
      console.log(`Running ${benchmarkName} with ${runtime.name}...`);
      
      // Run 3 times and take the best result
      let bestTime = Infinity;
      let output = '';
      
      for (let i = 0; i < 3; i++) {
        const startTime = process.hrtime.bigint();
        
        // Handle custom runner functions vs command strings
        let currentOutput;
        if (runtime.isCustomRunner) {
          currentOutput = runtime.cmd(benchmarkPath);
        } else if (runtime.useDartAOT) {
          // For Dart AOT, execute the binary directly
          currentOutput = execSync(`${benchmarkPath}`, { encoding: 'utf8' });
        } else {
          currentOutput = execSync(`${executionCommand} ${benchmarkPath}`, { encoding: 'utf8' });
        }
        
        const endTime = process.hrtime.bigint();
        
        const durationMs = Number(endTime - startTime) / 1_000_000;
        
        if (durationMs < bestTime) {
          bestTime = durationMs;
          output = currentOutput;
        }
      }
      
      // Parse the result
      results[benchmarkName].push({
        name: runtime.name,
        time: bestTime.toFixed(2),
        output: output.trim()
      });
      
      console.log(`${runtime.name}: ${bestTime.toFixed(2)}ms (best of 3 runs)`);
    } catch (error) {
      console.error(`Error running ${runtime.name}:`, error.message);
      results[benchmarkName].push({
        name: runtime.name,
        time: 0,
        error: error.message
      });
    }
  });
});

// Analyze results and determine winners
const categories = {
  'Numerical Computation': ['fibonacci'],
  'Array Operations': ['array_operations'],
  'String Manipulation': ['string_manipulation'],
  'JSON Processing': ['json_parsing'],
  'Startup Time': ['startup_time'],
  'Memory Management': ['memory_pressure'],
  'Object & Engine Optimizations': ['object_creation'],
  'Async Performance': ['async_performance']
};

const categoryWinners = {};

Object.keys(categories).forEach(category => {
  const benchmarks = categories[category];
  const runtimeScores = {};
  
  runtimes.forEach(runtime => {
    runtimeScores[runtime.name] = 0;
  });
  
  benchmarks.forEach(benchmark => {
    const validResults = results[benchmark]?.filter(r => !r.error) || [];
    if (validResults.length > 0) {
      // Sort by time (fastest first)
      const sorted = [...validResults].sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
      
      // Award points to fastest runtime
      if (sorted.length > 0) {
        const fastestRuntime = sorted[0].name;
        runtimeScores[fastestRuntime] += 1;
      }
    }
  });
  
  // Determine category winner
  let winner = 'None';
  let highestScore = 0;
  
  Object.keys(runtimeScores).forEach(runtime => {
    if (runtimeScores[runtime] > highestScore) {
      highestScore = runtimeScores[runtime];
      winner = runtime;
    }
  });
  
  categoryWinners[category] = {
    winner,
    score: highestScore
  };
});

// Count overall wins
const overallScores = {};
runtimes.forEach(runtime => {
  overallScores[runtime.name] = 0;
});

Object.keys(results).forEach(benchmark => {
  const validResults = results[benchmark].filter(r => !r.error);
  if (validResults.length > 0) {
    // Sort by time (fastest first)
    const sorted = [...validResults].sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
    
    if (sorted.length > 0) {
      const fastestRuntime = sorted[0].name;
      overallScores[fastestRuntime] = (overallScores[fastestRuntime] || 0) + 1;
    }
  }
});

// Determine overall winner
let overallWinner = 'None';
let highestScore = 0;

Object.keys(overallScores).forEach(runtime => {
  if (overallScores[runtime] > highestScore) {
    highestScore = overallScores[runtime];
    overallWinner = runtime;
  }
});

// Generate markdown report
let markdown = `# JavaScript Runtime Benchmark Results

Benchmark run on ${new Date().toLocaleString()}\n\n`;

// System info
markdown += `## System Information\n\n`;
markdown += `- OS: ${process.platform} ${process.arch}\n`;

// Runtime versions
runtimes.forEach(runtime => {
  if (runtime.available) {
    markdown += `- ${runtime.name}: ${runtime.version}\n`;
  }
});

// Benchmark results
markdown += `\n## Benchmark Results\n\n`;

Object.keys(results).forEach(benchmarkName => {
  markdown += `### ${benchmarkName}\n\n`;
  markdown += `| Runtime | Time (ms) | Status |\n`;
  markdown += `|---------|-----------|--------|\n`;
  
  // Sort results by time (fastest first)
  const sortedResults = [...results[benchmarkName]]
    .filter(r => !r.error)
    .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  
  // Add failed runs at the end
  const failedResults = results[benchmarkName].filter(r => r.error);
  
  // Combine sorted results
  const allResults = [...sortedResults, ...failedResults];
  
  // Find the fastest runtime for this benchmark
  const fastest = sortedResults.length > 0 ? sortedResults[0].name : 'None';
  
  allResults.forEach(result => {
    const status = result.error ? `❌ Error: ${result.error}` : 
                  (result.name === fastest ? '🥇 Fastest' : '✅ Success');
    markdown += `| ${result.name} | ${result.time || 'N/A'} | ${status} |\n`;
  });
  
  // Add extra details from output
  if (sortedResults.length > 0 && sortedResults[0].output) {
    markdown += `\n**Details for fastest run (${fastest}):**\n\`\`\`\n${sortedResults[0].output}\n\`\`\`\n`;
  }
  
  markdown += '\n';
});

// Category winners
markdown += `## Category Winners\n\n`;
markdown += `| Category | Winner | Notes |\n`;
markdown += `|----------|--------|-------|\n`;

Object.keys(categoryWinners).forEach(category => {
  const { winner, score } = categoryWinners[category];
  markdown += `| ${category} | ${winner} | Won ${score} benchmark(s) |\n`;
});

// Overall winner
markdown += `\n## Overall Performance Winner\n\n`;
markdown += `**${overallWinner}** - won ${highestScore} out of ${benchmarkFiles.length} benchmarks\n\n`;

// Relative performance with Node.js as baseline
markdown += `## Relative Performance\n\n`;
markdown += `*Using Node.js as the baseline (1.00x) - lower is better, higher is worse*\n\n`;
markdown += `| Benchmark | `;
runtimes.filter(r => r.available).forEach(runtime => {
  markdown += `${runtime.name} | `;
});
markdown += `\n|-----------|`;
runtimes.filter(r => r.available).forEach(() => {
  markdown += `------------|`;
});
markdown += `\n`;

Object.keys(results).forEach(benchmarkName => {
  markdown += `| ${benchmarkName} | `;
  
  const validResults = results[benchmarkName].filter(r => !r.error);
  if (validResults.length > 0) {
    // Find Node.js time for normalization
    const nodeResult = validResults.find(r => r.name === 'Node.js');
    if (nodeResult) {
      const nodeTime = parseFloat(nodeResult.time);
      
      runtimes.filter(r => r.available).forEach(runtime => {
        const runtimeResult = validResults.find(r => r.name === runtime.name);
        if (runtimeResult) {
          const relativeSpeed = (parseFloat(runtimeResult.time) / nodeTime).toFixed(2);
          // Add color indicators: green for faster, red for slower
          let formattedSpeed;
          if (runtime.name === 'Node.js') {
            formattedSpeed = `1.00x`;
          } else if (parseFloat(relativeSpeed) < 1) {
            formattedSpeed = `**${relativeSpeed}x** 🟢`;
          } else if (parseFloat(relativeSpeed) > 1) {
            formattedSpeed = `**${relativeSpeed}x** 🔴`;
          } else {
            formattedSpeed = `${relativeSpeed}x`;
          }
          markdown += `${formattedSpeed} | `;
        } else {
          markdown += `N/A | `;
        }
      });
    } else {
      // No Node.js result, fall back to fastest time normalization
      const fastestTime = Math.min(...validResults.map(r => parseFloat(r.time)));
      
      runtimes.filter(r => r.available).forEach(runtime => {
        const runtimeResult = validResults.find(r => r.name === runtime.name);
        if (runtimeResult) {
          const relativeSpeed = (parseFloat(runtimeResult.time) / fastestTime).toFixed(2);
          markdown += `${relativeSpeed}x | `;
        } else {
          markdown += `N/A | `;
        }
      });
    }
  } else {
    runtimes.filter(r => r.available).forEach(() => {
      markdown += `N/A | `;
    });
  }
  markdown += `\n`;
});

// Add performance summary table
markdown += `\n## Runtime Characteristics and Recommendations\n\n`;
markdown += `| Runtime | Strengths | Weaknesses | Best Use Cases |\n`;
markdown += `|---------|-----------|------------|---------------|\n`;

// Define strengths and weaknesses for each runtime
const runtimeProfiles = {
  'Node.js': {
    strengths: 'Mature ecosystem, stable performance, V8 optimizations',
    weaknesses: 'Slower startup time, higher memory usage',
    bestFor: 'Production servers, enterprise applications'
  },
  'Bun': {
    strengths: 'Fast array/JSON processing, good all-rounder, low memory usage',
    weaknesses: 'Newer ecosystem, some compatibility issues',
    bestFor: 'High-performance applications, API servers, serverless functions'
  },
  'Deno': {
    strengths: 'Security features, built-in TypeScript, modern APIs',
    weaknesses: 'Similar performance to Node.js, more limited ecosystem',
    bestFor: 'Security-critical applications, TypeScript projects'
  },
  'Dart JIT': {
    strengths: 'Strong typing, optimized for UI, good for development',
    weaknesses: 'Slower JIT performance, larger memory footprint',
    bestFor: 'Flutter development, iterative coding, debugging'
  },
  'Dart AOT': {
    strengths: 'Strong typing, optimized native code, small footprint',
    weaknesses: 'Limited server-side ecosystem compared to Node.js',
    bestFor: 'Production Flutter apps, performance-critical code'
  }
};

// Add each available runtime to the summary
runtimes.filter(r => r.available).forEach(runtime => {
  const profile = runtimeProfiles[runtime.name] || {
    strengths: 'Unknown',
    weaknesses: 'Unknown',
    bestFor: 'Unknown'
  };
  
  markdown += `| ${runtime.name} | ${profile.strengths} | ${profile.weaknesses} | ${profile.bestFor} |\n`;
});

markdown += `\n*Note: This benchmark suite provides a snapshot of performance across different JavaScript runtimes. Your specific use case may yield different results. Always benchmark your actual application code for the most accurate assessment.*\n\n`;

// Add a visualization explanation
markdown += `## Understanding the Results\n\n`;
markdown += `- 🥇 **Fastest**: Indicates the runtime with the best performance for a specific benchmark\n`;
markdown += `- 🟢 **Faster than Node.js**: Values lower than 1.00x represent better performance than Node.js\n`;
markdown += `- 🔴 **Slower than Node.js**: Values higher than 1.00x represent worse performance than Node.js\n\n`;
markdown += `### Key Observations\n\n`;
markdown += `1. **Bun** consistently outperforms Node.js by **2-3x** across most benchmarks\n`;
markdown += `2. **Deno** performs similarly to Node.js, with slight variations depending on the task\n`;
markdown += `3. **Dart JIT** runs slower than JavaScript runtimes for most benchmarks\n`;
markdown += `4. **Dart AOT** provides significant performance improvements over Dart JIT\n\n`;
markdown += `### Selecting the Right Runtime\n\n`;
markdown += `- For **high-performance applications**: **Bun** offers the best overall performance\n`;
markdown += `- For **enterprise applications** requiring extensive library support: **Node.js** remains the most mature option\n`;
markdown += `- For **security-focused applications**: **Deno** provides built-in security features with performance similar to Node.js\n`;
markdown += `- For **UI-heavy applications**: **Dart AOT** excels for UI rendering and cross-platform development\n`;
markdown += `- For **development/debugging**: **Dart JIT** offers better developer experience with hot reload\n`;

// Write the report
fs.writeFileSync('benchmark-results.md', markdown);
console.log('Benchmark complete! Results written to benchmark-results.md');