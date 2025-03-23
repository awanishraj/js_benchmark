// String manipulation benchmark

// Create a large string
const size = 500000;
let text = 'a'.repeat(size);

// Start measuring time
const startTime = Date.now();

// String operations
let result = '';

// String replacement
text = text.replace(/a/g, 'b');

// String splitting and joining
const parts = text.split('b', 1000);
result = parts.join('-');

// String template literals
for (let i = 0; i < 1000; i++) {
  result = `${result.substring(0, 100)}${i}`;
}

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`String size: ${size}`);
console.log(`Result length: ${result.length}`);
console.log(`Duration: ${duration}ms`);
