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
        super();
        this.loadImages(this.IMAGES);
        this.x = 440;
        this.y = 40;
        this.width = 250;
        this.height = 70;
        this.speed = 2.5;
        this.setPercentage(this.percentage);
    }
}
