class Shape {
    toString() {
        return `area: ${this.calculateArea()}`;
    }
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    
    calculateArea() {
        return Math.pow(this.side, 2);
    }

    toString() {
        return `side: ${this.side} ${super.toString()}`;
    }

    static fromArea(area) {
        return new Square(Math.sqrt(area));
    }
}
const square = Square.fromArea(16);
console.log(square.toString());
// expect output: 'side: 4 area: 16'

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    toString() {
        return `radius: ${this.radius} ${super.toString()}`;
    }

    static fromArea(area) {
        return new Circle(Math.ceil(Math.sqrt(area / Math.PI)));
    }
}
const circle = Circle.fromArea(314.159265);
console.log(circle.toString());
// expect output: radius: '10 area: 314.1592653589793'