// Destructuring với mảng
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // Output: 1
console.log(second); // Output: 2
console.log(rest);   // Output: [3, 4, 5]

// Destructuring với đối tượng
const person = {
    name: 'John Doe',
    age: 30,
    address: '123 ABC Street',
};

const { name, age, address } = person;

console.log(name);    // Output: John Doe
console.log(age);     // Output: 30
console.log(address); // Output: 123 ABC Street