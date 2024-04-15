class ChickenSmall extends MovableObject {

    y = 380;
    height = 50;
    width = 55;
    energy = 5;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    small_chicken_sound = new Audio('audio/chicken_chirping.mp3');
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + 1000 * Math.random();
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate()
    }

    animate() {

        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.small_chicken_sound.play();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.small_chicken_sound.pause();
            }
        }, 100)
    }
}