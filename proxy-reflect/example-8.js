function createArray() {
    return new Proxy({}, {
        set(target, key, value) {
            target.length = target.length || 0;
            target.length++;
            target[key] = value;
        },
        get(target, key) {
            if (typeof key === "string" && key.match(/^\d+$/)) {
                if (!(key in target)) {
                    throw `Property ${key} not found`;
                }
            }
            return target[key];
        },
        deleteProperty(target, key) {
            if (key in target) {
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
console.log(languages);
// expect output: { '0': 'Python', length: 1 }

console.log(languages.length);
// expect output: 1

console.log(languages[1]);
// GENERATE ERROR: throw `Property 1 not found`;