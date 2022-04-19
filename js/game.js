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
    let topAlignment = 0.25 * screenheight;
    // Create bg sprite
    // Pic Aspect ratio - 1200/800
    let bg = this.add.sprite(0, 0, 'bg').setScale(0.4 * screenwidth / 1200);
    // Phaser.Display.Align.In.Center(bg, this.add.zone(400, 300, 800, 600));    //  Center the picture in the game
    // bg.setOrigin(0, 0); //change the  origin of the asset to top-left corner
    bg.setPosition(screenwidth / 2.5, screenheight / 2); //place sprite postiion in the center


    var image0 = this.add.sprite(leftAlignment, topAlignment * 1, 'lightOFF').setScale(0.3 * screenwidth / 1200).setInteractive();
    // console.log(image0);
    // image0.scale.setTo(0.5, 0.5);
    this.input.setDraggable(image0);
    //  The pointer has to move 16 pixels before it's considered as a drag
    // this.input.dragDistanceThreshold = 0;

    let bulbPositionX, bulbPositionY;
    this.input.on('dragstart', function (pointer, gameObject) {
        // save the initial position of the bulbs4
        bulbPositionX = gameObject.x;
        bulbPositionY = gameObject.y;
    });
    this.input.on('dragend', function (pointer, gameObject) {
        // gameObject.setTint(0xff0000);
        gameObject.x = bulbPositionX;
        gameObject.y = bulbPositionY;
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    // this.input.on('dragend', function (pointer, gameObject) {
    //     // gameObject.clearTint();
    // });


    // Light ON 1
    var image1 = this.add.sprite(leftAlignment, topAlignment * 2, 'lightOFF').setScale(0.3 * screenwidth / 1200).setInteractive();
    this.input.setDraggable(image1);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    // Light ON 2
    var image2 = this.add.sprite(leftAlignment, topAlignment * 3, 'lightOFF').setScale(0.3 * screenwidth / 1200).setInteractive();
    this.input.setDraggable(image2);
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

// gameScene.update = function () {
//     // game.scale.pageAlignHorizontally = true;
//     // game.scale.pageAlignVertically = true;
//     game.scale.refresh();
//     // this.bg.x += 1;
// }

// let canvas = document.get
// window.addEventListener("resize", redraw);
// function redraw() {
//     document.querySelector("canvas").style.top = "10px";
// }

    // let window_height = window.innerHeight;
    // let window_width = window.innerWidth;
    // if (window_width / window_height >= 1.77) {
    //     //--------LANDSCAPE orientation (ASPECT RATIO > 16/9)-----
    //     // in landscape the width of the activeArea div is 177.77*height
    //     canvas_height = 0.60 * window_height;  //55% of total height
    //     canvas_width = 0.80 * 1.5 * window_height; //85% of activeArea width(-which itself is 1.5 times the total height)
    //     canvas.width = canvas_width;
    //     canvas.height = canvas_height;
    //     canvas.style.bottom = "21.5%";
    //     drawlaser(canvas_height, canvas_width);
    //     console.log(canvas_height + " = canvas_height");
    //     console.log(canvas_width + " = canvas_width");
    //     aspectRatioIndicator = 1
    // }
    // else {
    //     aspectRatioIndicator = 0
    //     //----------PORTRAIT ORIENTATION----------
    //     canvas_width = 0.65 * window_width; //85% of activeArea width(-which itself is 1.5 times the total height)
    //     canvas_height = 0.5 * canvas_width;  //55% of total height
    //     canvas.width = canvas_width;
    //     canvas.height = canvas_height;
    //     var btm = (window_height - canvas_height * 0.93) / 2;
    //     canvas.style.bottom = btm.toString();
    //     drawlaser(canvas_height, canvas_width);
    // }
// };
