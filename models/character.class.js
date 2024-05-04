class Character extends MovableObject {

    y = 40;
    height = 300;
    width = 150;
    speed = 10;
    offset = {
        top: 120,
        left: 25,
        right: 25,
        bottom: 10
    }
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    player_hurt_sound = new Audio('audio/player_hurt.mp3');
    walking_sound = new Audio('audio/walking.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    /**
     * Creates an instance of Character.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * Moves the character based on user input and updates game world accordingly.
     * @returns {void}
     */
    moveCharacter() {
        this.checkSound(this.walking_sound);
        this.walking_sound.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.canJump()) {
            this.jump()
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} - Indicates if the character can move right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} - Indicates if the character can move left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} - Indicates if the character can jump.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Moves the character to the right.
     * @returns {void}
     */
    moveRight() {
        this.otherDirection = false;
        super.moveRight();
        this.resetIdleTimer();
        this.walking_sound.play();
    }

    /**
     * Moves the character to the left.
     * @returns {void}
     */
    moveLeft() {
        this.otherDirection = true;
        super.moveLeft();
        this.resetIdleTimer();
        this.walking_sound.play();
    }

    /**
     * Makes the character jump.
     * @returns {void}
     */
    jump() {
        super.jump();
        this.resetIdleTimer();
    }

    /**
     * Plays appropriate animation based on character state.
     * @returns {void}
     */
    playCharacterAnimation() {
        this.checkSound(background_sound);
        this.checkSound(this.player_hurt_sound);
        if (this.isDead()) {
            this.playCharacterDeadAnimation();
            stopGame();
        } else if (this.isHurt()) {
            this.player_hurt_sound.play();
            this.snoring_sound.pause();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.snoring_sound.pause();
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.snoring_sound.pause();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Plays dead animation for the character and displays game over screen.
     * @returns {void}
     */
    playCharacterDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.showGameOverScreen();
        this.walking_sound.volume = 0;
        background_sound.volume = 0;
    }

    /**
     * Plays idle animation for the character based on idle duration.
     * @returns {void}
     */
    playCharacterIdleAnimation() {
        this.checkSound(this.snoring_sound);
        if (this.isIdle(1000)) {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.isIdle(5000)) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.snoring_sound.loop;
            this.snoring_sound.play();
        }
    }

    /**
     * This method updates the last time the character moved to the current time.
     */

    resetIdleTimer() {
        this.lastTimeMoved = new Date().getTime();
    }

    /**
     * Listens for the 'objectThrown' event and resets the idle timer when the event is triggered.
     * This method adds an event listener for the 'objectThrown' event and calls resetIdleTimer() when the event is triggered.
     */
    resetIdleOnThrow() {
        document.addEventListener('objectThrown', () => {
            this.resetIdleTimer();
        });
    }

    /**
     * Initiates animation loops for character movement and state.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);4
        setInterval(() => this.playCharacterAnimation(), 1000 / 24);
        setInterval(() => this.playCharacterIdleAnimation(), 1000 / 5);
        this.resetIdleOnThrow();
    }
}