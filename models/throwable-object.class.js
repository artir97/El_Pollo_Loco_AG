class ThrowableObject extends MovableObject {
    IMAGES_FLYING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @constructor
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;

        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_FLYING_BOTTLE);

        this.throw(100, 150);
        this.animate();
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        const event = new Event('objectThrown');
        document.dispatchEvent(event);

        this.speedY = 30;
        this.applyGravity();
        if(world.character.otherDirection) {
            setInterval(() => {
                    this.x -= 10;
            }, 25);
        }else{
            setInterval(() => {
                this.x += 10;
            }, 25);
        }

    }

    /**
     * Animates the throwable object.
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_FLYING_BOTTLE);
            }
        }, 1000 / 10);
    }
}