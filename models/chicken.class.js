class Chicken extends MovableObject {

    y = 350;
    height = 80;
    width = 100;
    energy = 5;
    offset = {
        top: -10,
        left: -10,
        right: -10,
        bottom: -10
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Creates an instance of Chicken.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + 500 * Math.random();
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Moves the chicken to the left if it's not dead.
     * @returns {void}
     */
    chickenMoveLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * Plays the animation for the chicken.
     * @returns {void}
     */
    playChickenAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.checkSound(this.chicken_sound);
        this.chicken_sound.play();
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.chicken_sound.volume = 0;
        }
    }

    /**
     * Initiates animation loops for the chicken.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.chickenMoveLeft(), 1000 / 60);
        setInterval(() => this.playChickenAnimation(), 100);
    }
}