const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});




const direction = [
    { d: "right", x: 0, y: 0, src: '/player_right.png' },
    { d: "left", x: 0, y: 1, src: '/player_left.png' },
]
const bgr = new Image();
bgr.src = '/back.png';



class Player {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        //Math.random() * canvas.height;
        this.img = new Image();
        this.img.src = direction.src;
        this.spriteX = 498;
        this.spriteY = 327;
        this.frameX = direction.x;
        this.frameY = direction.y;
        this.speed = 1;
        this.direction = direction.d;

    }


    draw() {
        ctx.drawImage(this.img,
            this.spriteX * this.frameX,
            this.spriteY * this.frameY,
            this.spriteX,
            this.spriteY,
            this.x,
            this.y,
            this.spriteX,
            this.spriteY
        )
    }
    update() {

        switch (this.direction) {
            case 'right':
                this.frameRow();
                this.x = this.x >= canvas.width ? 0 : this.x + this.speed;
                break;
            case 'left':
                this.frameRow(0);
                this.x = this.x < 0 ? canvas.width : this.x - this.speed;
                break;
        }

        this.draw();
    }

    frameRow() {
        this.frameX = this.frameX == 3 ? this.frameX = 0 : this.frameX + 1;
        this.frameY = this.frameX == 3 ?
            this.frameY < 2 ?
            this.frameY + 1 : 0 :
            this.frameY
    }
}



let handle = [
    new Player(0, 0, direction[0]),
    new Player(canvas.width, 470, direction[1])
];

function addHandel() {

    handle.push(new Player(0, direction[Math.floor(Math.random(direction.length))]))

}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        bgr,
        0,
        0,
        canvas.width,
        canvas.height);
    handle.forEach(p => p.update());
    requestAnimationFrame(animate);
}

setInterval(() => {
    animate()
}, 3000);