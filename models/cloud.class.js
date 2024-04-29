class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of Cloud.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 500 * Math.random();
        this.animate();
    }

    /**
     * Initiates animation for the cloud, making it move left.
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }
}