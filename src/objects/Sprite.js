/**
 * Default sprite for extending to other classes
 */
export default class Sprite{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.speed = 4;
    }

    /**
     * Draws the element within the given context
     * @param {HTMLCanvasElement} ctx 
     */
    draw(ctx) {}

    /**
     * Controls the sprites movement
     */
    move() {}
}