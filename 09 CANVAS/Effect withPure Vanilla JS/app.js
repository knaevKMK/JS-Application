const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "rgba(0,0,0,0.1)"
    // window.addEventListener('resize', () => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // })

const ctx = canvas.getContext('2d');

let figArr = [];

let t = {
    x: undefined,
    y: undefined,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('mousemove', function(event) {
    t.x = event.x;
    t.y = event.y
})

class Figure {
    constructor(x, y, directX, directY, size, color) {
        this.x = x;
        this.y = y;
        this.directX = directX;
        this.directY = directY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directX = -this.directX;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directY = -this.directY;
        }
        let dx = t.x - this.x;
        let dy = t.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < t.radius + this.size) {
            if (t.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (t.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (t.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (t.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directX;
        this.y += this.directY;

    }
}


function init() {
    let pcs = 100
        // (canvas.height * canvas.width);

    for (let index = 0; index < pcs; index++) {
        let size = (Math.random() * 5) + 1;
        let x = Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2;
        let y = Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2;
        let directX = Math.random() * 5 - 2.5;
        let directY = Math.random() * 5 - 2.5;
        let color = '#8C5523';

        figArr.push(new Figure(x, y, directX, directY, size, color))
    }
}
init();
// console.log(figArr.length)

function animate() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < figArr.length; i++) {
        // console.log(figArr[i].x + ' : ' + figArr[i].y)
        figArr[i].update();
        figArr[i].draw();
    }
    requestAnimationFrame(animate);
    connect()
}
animate();

function connect() {
    for (let a = 0; a < figArr.length; a++) {
        for (let b = a; b < figArr.length; b++) {
            let distance = Math.pow((figArr[a].x - figArr[b].x), 2) +
                Math.pow((figArr[a].y - figArr[b].y), 2);

            if (distance < (canvas.width / 7) * canvas.height / 7) {
                ctx.strokeStyle = 'rgba(140,85,31,1)';
                ctx.beginPath();
                ctx.moveTo(figArr[a].x, figArr[a].y);
                ctx.lineTo(figArr[b].x, figArr[b].y);
                ctx.stroke();
            }
        }
    }
}