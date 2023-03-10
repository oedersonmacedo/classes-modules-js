import {PI as pi, pow} from './math.mjs';
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        return pi * pow(this.radius, 2);
    }
}
const circle = new Circle(10);
console.log(circle);
// expect output: Circle { radius: 10 }

console.log(circle.area);
// expect output: 314.1592