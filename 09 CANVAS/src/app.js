import { Circle } from "./circle.js";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
const c = canvas.getContext('2d');
const colors = ['red', 'pink', 'purple', 'blue', 'green', 'orange', 'yellow', 'black'];
let figureArray = [];


const pcs = 50;
for (let index = 0; index < pcs; index++) {
    const r = 155;
    let x = Math.random() * (window.innerWidth - r * 2) + r;
    let y = Math.random() * (window.innerHeight - r * 2) + r;
    let dx = (Math.random() * -0.5) * 10;
    let dy = (Math.random() * 0.5) * 10;
    let color = colors[Math.round(Math.random() * colors.length)];
    figureArray.push(new Circle(x, y, dx, dy, r, color, c))

}


function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    _handleCircles()
    requestAnimationFrame(animate);

}
animate();

function _handleCircles() {

    for (let index = 0; index < figureArray.length; index++) {
        figureArray[index].update();
        if (figureArray[index].r < 0.6) {
            figureArray.splice(index, 1);
            index--;
        }
    }
}