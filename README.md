# BasicShooter
A small shooter game in which the user can set how many enemies they would like to spawn. 
The player is given a minute to shoot down enemies, at the end of which, stats will be displayed.

The W, S, A, D keys are used to move the main square, and spacebar is used to shoot.

## Stats
Stats displayed are total enemies destroyed, shots taken, shots missed, and overall accuracy

## Note
Ensure you are clicked away from the "restart" button before using spacebar to shoot, otherwise the browser will assume
you are using space to click the button and restart.

## Pitfalls
The game does not take into account speed at which the enemies come on screen, therefore, it is possible to add more enemies than the 
game will be able to spawn in within the given time limit. 

# Troubleshooting
If pushing start doesn't create the game canvas, and there is a CORS error in the console, it is because a local web server is needed to run it with the scripts.
Simplest way to run is to install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code.