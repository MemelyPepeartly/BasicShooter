import Projectile from "../objects/Projectile.js";

export default class ProjectileController {
    projectiles = [];
    timerTillNextProjectile = 0;

    projectileCount = 0;
    missedShots = 0;
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

                this.missedShots++;
            }
            projectile.draw(ctx);
        })
    }
    shoot(x, y, speed, damage, delay) {
        if(this.timerTillNextProjectile <= 0)
        {
            this.projectiles.push(new Projectile(x, y, speed, damage));
            this.timerTillNextProjectile = delay;
            this.projectileCount++;
        }
        this.timerTillNextProjectile--;
    }

    isProjectileOffScreen(projectile)
    {
        return projectile.y <= -projectile.height;
    }

    collideWith(sprite)
    {
        return this.projectiles.some(projectile => {
            if(projectile.collideWith(sprite)){
                this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
                return true;
            }

            return false;
        });
    }

    clearProjectileStats()
    {
        this.missedShots = 0;
        this.projectileCount = 0;
    }
}