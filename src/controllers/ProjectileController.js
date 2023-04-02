import Projectile from "../objects/Projectile.js";

export default class ProjectileController {
    projectiles = [];
    timerTillNextProjectile = 0;
    contructor(canvas)
    {
        this.canvas = canvas;
    }

    draw(ctx) {

        this.projectiles.forEach((projectile) => {
            if(this.isProjectileOffScreen(projectile))
            {
                const index = this.projectiles.indexOf(projectile);
                this.projectiles.splice(index, 1);
            }
            projectile.draw(ctx);
        })
    }
    shoot(x, y, speed, damage, delay) {
        if(this.timerTillNextProjectile <= 0)
        {
            this.projectiles.push(new Projectile(x, y, speed, damage));
            this.timerTillNextProjectile = delay;
        }
        this.timerTillNextProjectile--;
    }

    isProjectileOffScreen(projectile)
    {
        return projectile.y <= -projectile.height;
    }
}