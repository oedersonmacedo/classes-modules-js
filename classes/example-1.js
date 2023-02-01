class ExampleOne {
}
console.log(ExampleOne);
// expect output: [class ExampleOne]

console.log(typeof ExampleOne);
// expect output: 'function'

const exampleOne = new ExampleOne();
console.log(exampleOne);
// expect output: ExampleOne {}

const ExampleTwo = class {
}

console.log(ExampleTwo);
// expect output: [class ExampleTwo]

console.log(typeof ExampleTwo);
// expect output: 'function'

const exampleTwo = new ExampleTwo();
console.log(exampleTwo);
// expect output: ExampleTwo {}