// IT GENERATES AN ERROR WHEN CALLED INSIDE A FUNCTION

function fn1() {
    import Circle from './circle';
    const circle = new Circle(10);
    console.log(circle);
    console.log(circle.area);
}
fn1();
