const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

function loop() {
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);
}

setInterval(loop, 1000 / 60)
