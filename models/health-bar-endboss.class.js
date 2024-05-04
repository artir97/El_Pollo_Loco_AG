class HealthBarEndboss extends MovableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    percentage = 100;

    /**
     * Creates an instance of HealthBarEndboss.
     * @constructor
     */
    constructor() {
        super(); // Call the constructor of MovableObject
        this.loadImages(this.IMAGES);
        this.x = 2500;
        this.y = -5;
        this.width = 300;
        this.height = 70;
        this.speed = 5.0;
        this.setPercentage(this.percentage);
        this.animate();
    }

    /**
     * Initiates the animation loop for moving the end boss health bar.
     * @function
     */
    animate() {
        setInterval(() => this.endBossHealthBarMoveLeft(), 1000 / 60);

    }

    /**
     * Moves the end boss health bar to the left if the character is within a specified distance range from the end boss.
     * @function
     */
    endBossHealthBarMoveLeft() {
        if (this.checkDistanceBetween(world.character, world.endBoss, 0, 350)) {
            this.moveLeft();
        }
    }
}
