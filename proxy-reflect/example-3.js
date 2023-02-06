function createArray() {
    return new Proxy({}, {
        set(target, key, value) {
        }
    });
}
const languages = createArray();
languages[0] = "Python";
languages[1] = "Ruby";
languages[2] = "JavaScript";
console.log(languages);
// expect output: {}

console.log(languages.length);
// expect output: undefined