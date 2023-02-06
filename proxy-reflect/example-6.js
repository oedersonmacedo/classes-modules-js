function createArray() {
    return new Proxy({}, {
        set(target, key, value) {
            target.length = target.length || 0;
            target.length++;
            target[key] = value;
        },
        deleteProperty(target, key) {
            if (key in target && key !== 'length') {
                target.length--;
                delete target[key];
            }
        }
    });
}
const languages = createArray();
languages[0] = "Python";
languages[1] = "Ruby";
languages[2] = "JavaScript";
console.log(languages);
// expect output: { '0': 'Python', '1': 'Ruby', '2': 'JavaScript', length: 3 }

console.log(languages.length);
// expect output: 3

delete languages[1];
delete languages[2];
delete languages[3];
delete languages['length'];
console.log(languages);
// expect output: { '0': 'Python', length: 1 }

console.log(languages.length);
// expect output: 1