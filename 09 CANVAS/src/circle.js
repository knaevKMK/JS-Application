export function Circle(x, y, dx, dy, r, color, c) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = Math.random() * r + 1;
    this.c = c;


    this.draw = function() {


        // border color
        //   this.c.strokeStyle = color;
        //fill color;

        c.fillStyle = color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        //fill inside

        c.fill();
        //execute
        // this.c.stroke();
    }

    this.update = function() {
        if (this.x + this.r >= window.innerWidth || this.x - this.r <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > window.innerHeight || this.y - this.r <= 0) {
            this.dy = -this.dy;
        }
        if (this.r > 0.5) {
            this.r -= 0.1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
}