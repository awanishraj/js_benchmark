// JSON parsing benchmark

// Generate a complex nested JSON object
function generateNestedObject(depth, breadth) {
  if (depth <= 0) {
    return { value: Math.random() };
  }
  
  const obj = {};
  for (let i = 0; i < breadth; i++) {
    obj[`property${i}`] = generateNestedObject(depth - 1, breadth);
  }
  return obj;
}

// Create a complex object and stringify it
const depth = 7;
const breadth = 5;
const complexObject = generateNestedObject(depth, breadth);
const jsonString = JSON.stringify(complexObject);

// Start measuring time
const startTime = Date.now();

// Parse and stringify multiple times
let result;
const iterations = 100;

for (let i = 0; i < iterations; i++) {
  // Parse JSON
  const parsed = JSON.parse(jsonString);
  
  // Modify object
  parsed.modified = i;
  
  // Stringify again
  result = JSON.stringify(parsed);
}

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`JSON size: ${jsonString.length} bytes`);
console.log(`Iterations: ${iterations}`);
console.log(`Duration: ${duration}ms`);
