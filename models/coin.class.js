class Coin extends MovableObject {
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    }
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coin.
     * @constructor
     * @param {number} x - The x-coordinate position of the coin.
     * @param {number} y - The y-coordinate position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);

        this.height = 100;
        this.width = 100;
        this.x = x;
        this.y = y;
    }
}