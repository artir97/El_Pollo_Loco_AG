class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.1;

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =  500 * Math.random();
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

    moveLeft(){
        setInterval(()=> {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}