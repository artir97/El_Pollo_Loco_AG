class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Creates an instance of Level.
     * @constructor
     * @param {MovableObject[]} enemies - Array of enemy objects.
     * @param {MovableObject[]} clouds - Array of cloud objects.
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
     * @param {MovableObject[]} coins - Array of coin objects.
     * @param {MovableObject[]} bottles - Array of bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}