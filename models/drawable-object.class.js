class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Checks whether to turn the sound on or off.
     * @param {Audio} sound - The sound to be checked.
     * @returns {void}
     */
    checkSound(sound) {
        if (soundTurnedOn()) {
            sound.volume = 1;
        } else {
            sound.volume = 0;
        }
    }

    /**
     * Displays the game over screen by removing the 'd-none' class and adding the 'd-flex' class.
     */
    showGameOverScreen() {
        const gameOverScreen = document.getElementById('gameOverScreen');
        gameOverScreen.classList.remove('d-none');
        gameOverScreen.classList.add('d-flex');
    }

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the drawable object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    /**
     * Loads images from an array of paths into the image cache.
     * @param {string[]} arr - Array of image paths.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Sets the percentage value and updates the image accordingly.
     * @param {number} percentage - The percentage value.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the percentage value.
     * @returns {number} - The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage > 5) {
            return 1;
        } else {
            return 0;
        }
    }
}