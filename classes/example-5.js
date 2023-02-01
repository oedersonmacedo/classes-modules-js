function Square(side) {
    this.side = side;
}

Square.prototype.calculateArea = function() {
    return Math.pow(this.side, 2);
}

Square.prototype.toString = function() {
    return `side: ${this.side} area: ${this.calculateArea()}`;
}

Square.fromArea = function(area) {
    return new Square(Math.sqrt(area));
}

const square = Square.fromArea(16);
console.log(square.toString());
// expect output: 'side: 4 area: 16'