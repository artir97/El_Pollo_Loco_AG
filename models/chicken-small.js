class ChickenSmall extends MovableObject {

    y = 380;
    height = 50;
    width = 55;
    energy = 5;
    offset = {
        top: -10,
        left: -10,
        right: -10,
        bottom: -10
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of ChickenSmall.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + 1000 * Math.random();
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate()
    }

    /**
     * Moves the small chicken to the left if it's not dead.
     * @returns {void}
     */
    smallChickenMoveLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * Plays the animation for the small chicken.
     * @returns {void}
     */
    playSmallChickenAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.checkSound(small_chicken_sound);
        small_chicken_sound.play();
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            small_chicken_sound.volume = 0;
        }
    }

    /**
     * Initiates animation loops for the small chicken.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.smallChickenMoveLeft(), 1000 / 60);
        setInterval(() => this.playSmallChickenAnimation(), 100);
    }
}