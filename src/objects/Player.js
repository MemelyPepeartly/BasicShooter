import Sprite from "./Sprite.js"

/**
 * Player object
 */
export default class Player extends Sprite {
    constructor(x, y, projectileController)
    {
        super();
        this.x = x;
        this.y = y;

        this.projectileController = projectileController;

        this.width = 50;
        this.height = 50;

        this.speed = 4;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }
    draw(ctx) {
        this.move();
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        this.shoot();
    }

    move() {
        if(this.downPressed) {
            this.y += this.speed;
        }
        if(this.upPressed) {
            this.y -= this.speed;
        }
        if(this.leftPressed) {
            this.x -= this.speed;
        }
        if(this.rightPressed) {
            this.x += this.speed;
        }
    }

    shoot() {
        if(this.shootPressed) {
            console.log("shoot");
            const speed = 5;
            const delay = 7;
            const damage = 1;
            const projectileX = this.x + this.width/2
            const projectileY = this.y;
            
            this.projectileController.shoot(projectileX, projectileY, speed, damage, delay)
        }
    }

    keydown = (event) => {
        if(event.code === "KeyW") {
            this.upPressed = true;
        }
        if(event.code === "KeyS") {
            this.downPressed = true;
        }
        if(event.code === "KeyA") {
            this.leftPressed = true;
        }
        if(event.code === "KeyD") {
            this.rightPressed = true;
        }

        if(event.code === "Space") {
            this.shootPressed = true;
        }
    }

    keyup = (event) => {
        if(event.code === "KeyW") {
            this.upPressed = false;
        }
        if(event.code === "KeyS") {
            this.downPressed = false;
        }
        if(event.code === "KeyA") {
            this.leftPressed = false;
        }
        if(event.code === "KeyD") {
            this.rightPressed = false;
        }

        if(event.code === "Space") {
            this.shootPressed = false;
        }
    }
}