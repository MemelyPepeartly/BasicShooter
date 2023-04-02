import Sprite from "./Sprite.js";

export default class Enemy extends Sprite {
    constructor(x ,y, color, health)
    {
        super();

        this.x = x;
        this.y = y;
        this.color = color;
        this.health = health;
        this.width = 20;
        this.height = 20;
    }

    draw(ctx) {
        this.move();

        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    move()
    {
        this.y += this.getRandomValue(1, 5);
    }

    takeDamage(damage){
        this.health -= damage;
    }

    /**
     * Gets a random int between two values
     * @param {number} min 
     * @param {number} max 
     * @returns 
     */
    getRandomValue(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}