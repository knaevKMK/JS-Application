export function Circle(x, y, dx, dy, r, color, c) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.fill();
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.r >= window.innerWidth || this.x - this.r <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > window.innerHeight || this.y - this.r <= 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
}