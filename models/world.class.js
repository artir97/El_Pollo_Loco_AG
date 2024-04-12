class World {
    character = new Character();
    level = level1;
    endboss = this.level.enemies[this.level.enemies.length - 1];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    healthBarEndboss = new HealthBarEndboss();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects()
        }, 200);
    }


    checkCollisions() {
        this.checkCollisionWithEnemy();
        this.checkCollisionWithCoin();
        this.checkCollisionWithBottle();
        this.checkCollisionBottleWithEndboss();
        this.checkCollisionBottleWithChicken();
    }


    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {

            if (this.character.isAboveGround()) {
                if (this.character.isColliding(enemy)) {
                    enemy.hit();
                    this.character.jump();
                }
            }

            if (this.character.isColliding(enemy)) {
                if (enemy.energy > 0) {
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.energy);
                }
            }


        });
    }


    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let indexCollectedCoin = this.level.coins.indexOf(coin);

                this.character.collectCoin();
                this.level.coins.splice(indexCollectedCoin, 1);
                this.coinbar.setPercentage(this.character.coins);
            }
        });
    }


    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                let indexCollectedBottle = this.level.bottles.indexOf(bottle);

                this.character.collectBottle();
                this.level.bottles.splice(indexCollectedBottle, 1);
                this.bottlebar.setPercentage(this.character.bottles);

                return true;
            }
        })
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);

                this.character.bottles -= 20;
                this.bottlebar.setPercentage(this.character.bottles);
            }
        }
    }


    checkCollisionBottleWithChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    console.log('Collision with Enemy');
                    console.log(this.level.enemies.indexOf(enemy));
                    let indexOfEnemy = this.level.enemies.indexOf(enemy);
                    this.level.enemies[indexOfEnemy].hit();
                    console.log(this.level.enemies[indexOfEnemy]);
                }
            })
        })
    }


    checkCollisionBottleWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.healthBarEndboss.setPercentage(this.endboss.energy);
            }
        })
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.healthBarEndboss);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}