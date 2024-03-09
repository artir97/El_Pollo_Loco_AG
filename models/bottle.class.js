class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x,y){
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
       
        this.height = 90;
        this.width = 70;
        this.x = x;
        this.y = y;
    }
}