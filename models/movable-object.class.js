class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    lastTimeMoved = new Date().getTime();
    coin_sound = new Audio('audio/collect_coin.mp3');
    bottle_sound = new Audio('audio/collect_bottle.mp3');

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     * Checks if the object is idle.
     * @param {number} idleDuration - The duration threshold for idle state in milliseconds.
     * @returns {boolean} - Indicates if the object is idle.
     */
    isIdle(idleDuration) {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - this.lastTimeMoved;
        return elapsedTime >= idleDuration;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump for the object.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} - Indicates if the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - Indicates if the object is dead.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Reduces the energy of the object when hit.
     * For Endboss instances, energy is reduced by 3; for other instances, energy is reduced by 5.
     * @returns {void}
     */
    hit() {
        if(this instanceof Endboss) {
            this.energy -= 3;
        }else {
            this.energy -= 5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - Indicates if a collision occurred.
     */
    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    }


    /**
     * Collects a coin.
     */
    collectCoin() {
        this.checkSound(this.coin_sound);
        this.coins += 20;
        this.coin_sound.play();
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Collects a bottle.
     */
    collectBottle() {
        this.checkSound(this.bottle_sound);
        this.bottles += 20;
        this.bottle_sound.play()
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Indicates if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y <= 140;
        }
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Plays animation for the object.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}