import { Circle } from "./circle.js";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const c = canvas.getContext('2d');
const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'black'];
let figureArray = [];
const pcs = 20;


for (let index = 0; index < pcs; index++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let dx = (Math.random() * 0.5) * 60;
    let dy = (Math.random() * 0.5) * 40;
    let color = colors[Math.round(Math.random() * colors.length)];
    const r = 155;
    figureArray.push(new Circle(x, y, dx, dy, r, color, c))

}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < figureArray.length; index++) {
        figureArray[index].update();
    }
}
animate();