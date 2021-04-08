const canvas = document.querySelector('canvas');
console.log(canvas)
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const t = {
    x: undefined,
    y: undefined
};
const circleArr = [];
let hue = 0;
class Circle {
    constructor() {
        this.x = t.x;
        this.y = t.y;
        this.size = Math.random() * 11 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%,50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }
    draw() {
        c.fillStyle = this.color;
        //   c.strokeStyle = 'blue';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        // c.stroke()
    }
}

function init() {
    for (let index = 0; index < 20; index++) {
        circleArr.push(new Circle());
    }
}
console.log(circleArr.length)
init();
console.log(circleArr.length)

function handleCircles() {
    for (let index = 0; index < circleArr.length; index++) {
        circleArr[index].update();
        circleArr[index].draw();
        if (circleArr[index].size <= 0.3) {
            circleArr.splice(index, 1);
            index--;
        }
    }

}
// canvas.addEventListener("click", () => {
//     t.x = event.x;
//     t.y = event.y;
//     console.log(circleArr.length)
//     init();

// })

canvas.addEventListener("mousemove", () => {
    t.x = event.x;
    t.y = event.y;
    console.log(circleArr.length)
    init();

})


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    // c.fillStyle = 'rgba(0,0,0,0.02)';
    // c.fillRect(0, 0, canvas.width, canvas.height)
    handleCircles();
    hue += 5;
    requestAnimationFrame(animate);
}
animate();