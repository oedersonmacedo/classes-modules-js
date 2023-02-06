const PI = 3.141592;
const pow = function(base, exponential) {
    if (exponential === 0) return 1;
    return base * pow(base, exponential - 1);
}
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        return PI * pow(this.radius, 2);
    }
}
const circle = new Circle(10);
console.log(circle);
// expect output: Circle { radius: 10 }

console.log(circle.area);
// expect output: 314.1592