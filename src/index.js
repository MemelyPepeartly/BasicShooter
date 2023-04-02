import Player from "./objects/Player.js";
import Sprite from "./objects/Sprite.js";
import ProjectileController from "./controllers/ProjectileController.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const player = new Player(canvas.width/2, canvas.height/1.5)

function loop() {
    setStyle();

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);

    player.draw(context);
}

function setStyle() {
    context.shadowColor = "#d53";
    context.shadowBlur = 20;
    context.lineJoin = "bevel";
    context.lineWidth= 5;
}

setInterval(loop, 1000 / 60)
