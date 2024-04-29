class Endboss extends MovableObject {
    offset = {
        top: 90,
        left: 0,
        right: 0,
        bottom: 10
    }
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of Endboss.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.y = -30;
        this.height = 500;
        this.width = 300;
        this.animate();
    }

    /**
     * Initiates animation for the end boss.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.playEndBossAnimation(), 200);
    }



    /**
     * Plays the end boss alert animation.
     * @returns {void}
     */
    playEndBossAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);

    }

    /**
     * Plays the end boss hurt animation if the boss is hurt.
     * @returns {void}
     */
    playEndBossHurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Plays the end boss dead animation and displays the game over screen if the boss is dead.
     * @returns {void}
     */
    playEndBossDeadAnimation() {
        if (this.isDead()) {
            const gameOverScreen = document.getElementById('gameOverScreen');

            this.playAnimation(this.IMAGES_DEAD);
            gameOverScreen.classList.remove('d-none');
            gameOverScreen.classList.add('d-flex');
            background_sound.pause();
        }
    }

    /**
     * Plays the animations for the end boss.
     * @returns {void}
     */
    playEndBossAnimation() {
        this.playEndBossAlertAnimation();
        this.playEndBossHurtAnimation();
        this.playEndBossDeadAnimation();

    }
}