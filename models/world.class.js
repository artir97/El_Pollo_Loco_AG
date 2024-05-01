class World {
    character = new Character();
    level = level1;
    endBoss = this.level.enemies[this.level.enemies.length - 1];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    healthBarEndBoss = new HealthBarEndboss();
    throwableObjects = [];
    enemy_hurt = new Audio('audio/enemy_hurt.mp3');

    /**
     * Represents the World in the game
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {KeyboardEvent} keyboard - The keyboard input for controlling the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Checks if the game sound is turned on and adjusts the volume of the specified sound accordingly.
     * @param {HTMLAudioElement} sound - The audio element whose volume will be adjusted.
     */
    checkSoundWorld(sound){
        if(soundTurnedOn()){
            sound.volume = 1;
        }else{
            sound.volume = 0;
        }
    }

    /**
     * Initiates the game loop by repeatedly executing collision checks and object throw actions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects()
        }, 200);
    }

    /**
     * Checks for collisions between various game elements.
     */
    checkCollisions() {
        this.checkCollisionWithEnemy();
        this.checkCollisionWithCoin();
        this.checkCollisionWithBottle();
        this.checkCollisionBottleWithEndboss();
        this.checkCollisionBottleWithChicken();
    }

    /**
     * Checks collision with enemies, applies sound effects, and removes defeated enemies.
     */
    checkCollisionWithEnemy() {
        this.checkSoundWorld(this.enemy_hurt);
        this.level.enemies.forEach((enemy, index) => {
            this.characterJumpsOnEnemy(enemy);
            this.characterCollidesWithEnemy(enemy);
            if (enemy.energy <= 0) {
                    this.level.enemies.splice(index, 1);
            }
        });
    }

    /**
     * Handles character jumping on an enemy.
     * @param {Object} enemy - The enemy object.
     */
    characterJumpsOnEnemy(enemy) {
        if (this.character.isAboveGround()) {
            if (this.character.isColliding(enemy)) {
                enemy.hit();
                this.enemy_hurt.play();
                this.character.jump();
            }
        }
    }

    /**
     * Handles character collision with an enemy.
     * @param {Object} enemy - The enemy object.
     */
    characterCollidesWithEnemy(enemy) {
        if (this.character.isColliding(enemy)) {
            if (enemy.energy > 0) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        }
    }

    /**
     * Checks for collision between the character and coins, and handles coin collection.
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let indexCollectedCoin = this.level.coins.indexOf(coin);

                this.character.collectCoin();
                this.level.coins.splice(indexCollectedCoin, 1);
                this.coinBar.setPercentage(this.character.coins);
            }
        });
    }


    /**
     * Checks for collision between the character and bottles, and handles bottle collection.
     * @returns {boolean} Indicates whether a bottle was collected.
     */
    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                let indexCollectedBottle = this.level.bottles.indexOf(bottle);

                this.character.collectBottle();
                this.level.bottles.splice(indexCollectedBottle, 1);
                this.bottleBar.setPercentage(this.character.bottles);

                return true;
            }
        });
    }

    /**
     * Checks if the character throws a bottle based on keyboard input, and manages the throwable objects.
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);

                this.character.bottles -= 20;
                this.bottleBar.setPercentage(this.character.bottles);
            }
        }
    }

    /**
     * Checks collision between throwable objects (bottles) and chicken enemies, and handles the consequences.
     */
    checkCollisionBottleWithChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    let indexOfEnemy = this.level.enemies.indexOf(enemy);
                    this.level.enemies[indexOfEnemy].hit();
                    this.enemy_hurt.play();
                }
            });
        });
    }

    /**
     * Checks collision between throwable objects (bottles) and the end boss, and handles the consequences.
     */
    checkCollisionBottleWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endBoss.isColliding(bottle)) {
                this.endBoss.hit();
                this.healthBarEndBoss.setPercentage(this.endBoss.energy);
                this.enemy_hurt.play();
            }
        });
    }

    /**
     * Sets the world reference for the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Clears the canvas, translates the context based on the camera position, and draws all objects and bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.drawCharacterBars();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws the character's health, coin, and bottle bars on the canvas.
     */
    drawCharacterBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all objects onto the canvas, including character, clouds, enemies, coins, bottles, health bar of the end boss, and throwable objects.
     */
    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.healthBarEndBoss);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds the given array of objects to the map by calling the addToMap method for each object.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map.
     * If the object has the 'otherDirection' property set to true, it flips the image horizontally before drawing it.
     * @param {MovableObject} mo - The movable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {MovableObject} mo - The movable object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {MovableObject} mo - The movable object whose image is being restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}