// Array operations benchmark

// Create a large array
const size = 1000000;
const arr = Array.from({ length: size }, (_, i) => i);

// Measure time
const startTime = Date.now();

// Perform array operations
let sum = 0;

// Map
const mapped = arr.map(x => x * 2);

// Filter
const filtered = mapped.filter(x => x % 3 === 0);

// Reduce
sum = filtered.reduce((acc, curr) => acc + curr, 0);

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`Array size: ${size}`);
console.log(`Sum of filtered values: ${sum}`);
console.log(`Duration: ${duration}ms`);
