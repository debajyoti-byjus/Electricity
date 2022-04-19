//create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = function () {
    //load images
    this.load.image('lightOFF', '../assets/light OFF.png');
    this.load.image('lightON1', '../assets/light ON1.png');
    this.load.image('lightON2', '../assets/light ON2.png');
    this.load.image('lightON3', '../assets/light ON3.png');
    this.load.image('bg', '../assets/circuit2.png');
}
//called after preload ends
gameScene.create = function () {
    let screenheight = window.innerHeight;
    let screenwidth = window.innerWidth;
    let leftAlignment = 0.8 * screenwidth;
    let topAlignment = 0.2 * screenheight;
    // Create bg sprite
    // Pic Aspect ratio - 1200/800
    let bg = this.add.sprite(0, 0, 'bg').setScale(0.7);
    bg.setOrigin(0, 0); //change the  origin of the asset to top-left corner
    bg.setPosition(60, 90); //place sprite postiion in the center


    var image0 = this.add.sprite(leftAlignment, topAlignment, 'lightOFF').setScale(0.4).setInteractive();
    console.log(image0);
    // image0.scale.setTo(0.5, 0.5);
    this.input.setDraggable(image0);
    //  The pointer has to move 16 pixels before it's considered as a drag
    // this.input.dragDistanceThreshold = 0;
    // this.input.on('dragstart', function (pointer, gameObject) {
    //     // gameObject.setTint(0xff0000);
    // });
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    // this.input.on('dragend', function (pointer, gameObject) {
    //     // gameObject.clearTint();
    // });


    // Light ON 1
    var image1 = this.add.sprite(leftAlignment, topAlignment * 2, 'lightON1').setScale(0.4).setInteractive();
    // image1.scale.setTo(0.5, 0.5);
    this.input.setDraggable(image1);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    // Light ON 2
    var image2 = this.add.sprite(leftAlignment, topAlignment * 3, 'lightON2').setScale(0.4).setInteractive();
    // image2.scale.setTo(0.5, 0.5);
    this.input.setDraggable(image2);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    // Light ON 3
    var image3 = this.add.sprite(leftAlignment, topAlignment * 4, 'lightON3').setScale(0.4).setInteractive();
    // image3.scale.setTo(0.5, 0.5);
    this.input.setDraggable(image3);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
}



// set the configuration of the scene
let config = {
    type: Phaser.AUTO, //Phaser will use WebGL if available or it will use the canvas API
    width: window.innerWidth,
    height: window.innerHeight,
    scene: gameScene
};

//Create a new Game, pass the configuration
let game = new Phaser.Game(config); 