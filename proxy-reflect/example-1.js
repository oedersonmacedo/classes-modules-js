function createArray() {
    return {};
}
const languages = createArray();
languages[0] = "Python";
languages[1] = "Ruby";
languages[2] = "JavaScript";
console.log(languages);
// expect output: { '0': 'Python', '1': 'Ruby', '2': 'JavaScript' }
undefined

console.log(languages.length);
// expect output: undefined