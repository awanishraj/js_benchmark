// Object creation and property access benchmark
// This benchmark tests JavaScript engine optimizations related to object shape/hidden class transitions

// More precise timing with microtime
const microtime = require('microtime');

// Helper to create a random property name
const getRandomProperty = () => `prop_${Math.floor(Math.random() * 1000)}`;

// Start timing
const startTime = microtime.now();

// Test 1: Monomorphic object creation
// This is the fastest case - all objects have the same "shape"
function monomorphicTest() {
  const iterations = 1000000;
  let result = 0;
  
  // Create objects with a consistent property pattern
  for (let i = 0; i < iterations; i++) {
    const obj = {
      a: i,
      b: i * 2,
      c: i * 3,
      d: i % 10
    };
    
    // Access properties in consistent order
    result += obj.a + obj.b + obj.c + obj.d;
  }
  
  return result;
}

// Test 2: Polymorphic object creation
// This is a harder case - objects have different shapes
function polymorphicTest() {
  const iterations = 500000;
  let result = 0;
  
  // Create objects with inconsistent property patterns
  for (let i = 0; i < iterations; i++) {
    const shape = i % 5;
    let obj;
    
    // Create different object shapes based on iteration
    switch (shape) {
      case 0:
        obj = { a: i, b: i * 2 };
        break;
      case 1:
        obj = { a: i, c: i * 3 };
        break;
      case 2:
        obj = { b: i, d: i * 4 };
        break;
      case 3:
        obj = { a: i, b: i * 2, c: i * 3 };
        break;
      case 4:
        obj = { a: i, d: i * 4, e: i * 5 };
        break;
    }
    
    // Access common properties if they exist
    result += obj.a || 0;
    result += obj.b || 0;
  }
  
  return result;
}

// Test 3: Object prototype access
// Tests the optimization of prototype chain lookups
function prototypeTest() {
  const iterations = 500000;
  let result = 0;
  
  // Create a prototype chain
  const baseProto = {
    baseMethod1: function(x) { return x * 2; },
    baseMethod2: function(x) { return x + 10; }
  };
  
  const midProto = Object.create(baseProto);
  midProto.midMethod = function(x) { return x * 3; };
  
  // Create objects with the prototype chain
  for (let i = 0; i < iterations; i++) {
    const obj = Object.create(midProto);
    obj.ownProp = i;
    
    // Mix of accessing own properties and prototype methods
    result += obj.ownProp;
    result += obj.baseMethod1(i);
    result += obj.midMethod(i);
  }
  
  return result;
}

// Test 4: Object property assignment - hidden class transitions
// Tests how well engines handle property transitions
function objectTransitionTest() {
  const iterations = 200000;
  let result = 0;
  
  for (let i = 0; i < iterations; i++) {
    // Create an empty object and add properties
    const obj = {};
    
    // Adding properties in the same order helps JIT optimize
    obj.a = i;
    obj.b = i * 2;
    obj.c = i * 3;
    
    // Adding dynamic properties is slower
    if (i % 2 === 0) {
      obj.d = i * 4;
    }
    
    // Property access
    result += obj.a + obj.b + obj.c + (obj.d || 0);
  }
  
  return result;
}

// Run tests
const monoResult = monomorphicTest();
const polyResult = polymorphicTest();
const protoResult = prototypeTest();
const transResult = objectTransitionTest();

// End timing
const endTime = microtime.now();
const elapsed = (endTime - startTime) / 1000; // Convert microseconds to milliseconds

// Log results
console.log(`Monomorphic object test result: ${monoResult}`);
console.log(`Polymorphic object test result: ${polyResult}`);
console.log(`Prototype chain test result: ${protoResult}`);
console.log(`Object transition test result: ${transResult}`);
console.log(`Duration: ${elapsed.toFixed(2)}ms`);