import Player from "./objects/Player.js";
import Enemy from "./objects/Enemy.js"

import ProjectileController from "./controllers/ProjectileController.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("restartBtn").addEventListener("click", restart);

canvas.width = 600;
canvas.height = 600;

var totalEnemies = document.getElementById("enemiesTxt").value;
var spawnedEnemies = 0;
var destroyedEnemies = 0;
var spawnInterval = 5;
var enemies = [];

var startIntervalNum = undefined;
var spawnIntervalNum = undefined;
var timerIntervalNum = undefined;
var secondsCount = 0;
var started = false;

const projectileController = new ProjectileController(canvas);
const player = new Player(
    canvas.width/2,
    canvas.height/1.5,
    projectileController
    );

/**
 * Main gameplay loop
 */
function loop() {
    setStyle();
    setStats();

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);

    projectileController.draw(context);
    player.draw(context);

    enemies.forEach(enemy => {
        if(projectileController.collideWith(enemy)){
            enemies.splice(enemies.indexOf(enemy), 1);
            destroyedEnemies++;
        }
        else {
            enemy.draw(context);
        }
    });

    if(destroyedEnemies == totalEnemies)
    {
        showEndStats();
        // Stops the counter here. Will not incorporate any shots after last enemy into final stats
        pause();
    }
}

/**
 * Enemy spawn loop
 */
function enemySpawn() {
    if(spawnedEnemies < totalEnemies)
    {
        var numberToSpawn = spawnInterval
        if(spawnedEnemies + spawnInterval > totalEnemies)
        {
            // If the next interval is more than the total if the enemies were added
            // Then get the difference and use that as the last wave
            numberToSpawn =  totalEnemies - spawnedEnemies
        }

        var wave = new Array(numberToSpawn).fill().map(() => (new Enemy(getRandomValue(0, canvas.width-50) + 50, -canvas.height, "red", 1)))
        enemies = enemies.concat(wave);

        spawnedEnemies += spawnInterval;
    }
}

/**
 * Timer loop
 */
function timerStart() {
    if(secondsCount < 60)
    {
        document.getElementById("timeRemaining").textContent = 60 - secondsCount;
    }
    

    // If reached the end of game, display stats
    if(secondsCount >= 60){
        showEndStats();
        pause();
    }
    secondsCount++;
}

/**
 * Loop to track the total enemies stat and destroyed enemies stat
 */
function setStats() {
    document.getElementById("totalEnemies").textContent = totalEnemies;
    document.getElementById("totalEnemiesDestroyed").textContent = destroyedEnemies;
}

/**
 * Shows the end stat window
 */
function showEndStats()
{
    var div = document.getElementById("endStatsDiv");
    var endStatTotalDestroyedSpan = document.getElementById("endStatTotalDestroyed");
    var endStatTotalShotsSpan = document.getElementById("endStatTotalShots");
    var endStatTotalMissedSpan = document.getElementById("endStatTotalMissed");
    var endStatTotalAccuracySpan = document.getElementById("endStatTotalAccuracy");


    endStatTotalDestroyedSpan.textContent = `Total enemies destroyed: ${destroyedEnemies}`;
    endStatTotalShotsSpan.textContent = `Total shots taken: ${projectileController.projectileCount}`;
    endStatTotalMissedSpan.textContent = `Total shots missed: ${projectileController.missedShots} (${(Math.round((projectileController.missedShots/projectileController.projectileCount)*100)/100)*100}%)`;
    endStatTotalAccuracySpan.textContent = `Total Accuracy: ${(Math.round(100*(destroyedEnemies/projectileController.projectileCount))/100)*100}%`;

    div.style.display = "block";
}

/**
 * Clears stats
 */
function clearStats() {
    console.log("Clearing stats");

    spawnedEnemies = 0;
    destroyedEnemies = 0;
    enemies = [];

    startIntervalNum = undefined;
    spawnIntervalNum = undefined;
    timerIntervalNum = undefined;
    secondsCount = 0;
    started = false;

    totalEnemies = document.getElementById("enemiesTxt").value;
    document.getElementById("timeRemaining").textContent = 60;
    document.getElementById("totalEnemies").textContent = 0;
    document.getElementById("totalEnemiesDestroyed").textContent = 0;
}

/**
 * Sets common style
 */
function setStyle() {
    context.shadowColor = "#d53";
    context.shadowBlur = 20;
    context.lineJoin = "bevel";
    context.lineWidth= 5;
}

/**
 * Function run when start button is clicked
 */
function start()
{
    if(!started)
    {
        console.log("Starting");
        started = true;

        totalEnemies = document.getElementById("enemiesTxt").value;
    
        startIntervalNum = setInterval(loop, 1000 / 60)
        spawnIntervalNum = setInterval(enemySpawn, 500)
        timerIntervalNum = setInterval(timerStart, 1000)
    }
    else
    {
        console.log("Already started!")
    }
}

/**
 * Pauses all of the intervals running
 */
function pause()
{
    if(startIntervalNum)
    {
        clearInterval(startIntervalNum);
    }
    if(spawnIntervalNum)
    {
        clearInterval(spawnIntervalNum);
    }
    if(timerIntervalNum)
    {
        clearInterval(timerIntervalNum);
    }
}

/**
 * Restarts the game with the current values within the number of enemies to spawn
 */
function restart()
{
    clearStats();
    if(timerIntervalNum)
    {
        clearInterval(timerIntervalNum);
        secondsCount = 0;
    }
    if(spawnIntervalNum)
    {
        clearInterval(spawnIntervalNum);
    }
    if(startIntervalNum)
    {
        clearInterval(startIntervalNum);
        context.clearRect(0, 0, canvas.width, canvas.height);

        document.getElementById("endStatsDiv").style.display = "none";
        projectileController.clearProjectileStats();
        
        setStyle();
        context.fillStyle = "black";
        context.fillRect(0,0,canvas.width,canvas.height);
        enemies = [];

        started = false;
        start();
    }
}


/**
 * Gets a random int between two values
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function getRandomValue(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
