export default class Player extends Sprite{
    constructor(x , y)
    {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.speed = 4;
    }
    draw() {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}