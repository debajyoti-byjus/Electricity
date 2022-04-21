//create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = function () {
    //load images
    this.load.image('lightOFF', '../assets/light OFF.png');
    this.load.image('lightON1', '../assets/light ON 1.png');
    this.load.image('lightON2', '../assets/light ON 2.png');
    this.load.image('lightON3', '../assets/light ON 3.png');
    this.load.image('cell', '../assets/battery.png');

    this.load.image('bg', '../assets/circuit1.png');
    this.load.image('dot', '../assets/Test dot for locating the bulb holder spots .png');
    this.load.image('holder', '../assets/cell holder.png');
}

//called after preload ends
gameScene.create = function () {
    let screenheight = window.innerHeight;
    let screenwidth = window.innerWidth;
    let leftAlignment = 0.8 * screenwidth;
    let topAlignment = 0.25 * screenheight;
    // Create bg sprite
    // Pic Aspect ratio - 1200/800
    let bgWidth = 1408, bgHeight = 423;
    let scaleFactor = 0.45 * screenwidth / bgWidth;
    let scaleFactor2 = scaleFactor * 0.35;
    let distThreshhold = 70;
    let bg = this.add.sprite(0, 0, 'bg').setScale(scaleFactor);
    // Phaser.Display.Align.In.Center(bg, this.add.zone(400, 300, 800, 600));    //  Center the picture in the game
    bg.setOrigin(0, 0); //change the  origin of the asset to top-left corner
    bg.setPosition(screenwidth * 0.2, screenheight * 0.242); //place sprite postiion in the center


    function landingSpotFinder(a, b) {
        //first find the location of the corner of the circuit image
        let shiftx = screenwidth * 0.2;
        let shifty = screenheight * 0.2;
        //find the centre of the image(keep scaling in mind)

        shiftx += a * scaleFactor * bgWidth;
        shifty += b * scaleFactor * bgHeight;
        return {
            xCoordinate: shiftx,
            yCoordinate: shifty,
        };
        //example of use of above function
        // let value = landingSpotFinder(a, b);
        // let x = value.xCoordinate;
        // let y = value.yCoordinate;
    }
    let leftPercent = [0.2, 0.5, 0.8];  //here, 0.517= 51.7%
    let topPercent = [1.15, 1.15, 1.15];  //here, 0.05= 5%
    // let testDot = this.add.sprite(0, 0, 'dot');// TEST DOT for finding the position of the bulb holder locations in the circut
    // let DotXcoordinateValue = landingSpotFinder(1, 1).xCoordinate;
    // let DotYcoordinateValue = landingSpotFinder(1, 1).yCoordinate;
    // testDot.setPosition(DotXcoordinateValue, DotYcoordinateValue);

    //Fixed bulb for level 0
    let fixedBulb0 = this.add.sprite(0, 0, 'lightOFF').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop0 = -0.2;
    let fixedBulbleft0 = 0.49;
    let fixedBulbXcoordinateValue0 = landingSpotFinder(fixedBulbleft0, fixedBulbTop0).xCoordinate;
    let fixedBulbYcoordinateValue0 = landingSpotFinder(fixedBulbleft0, fixedBulbTop0).yCoordinate;
    fixedBulb0.setPosition(fixedBulbXcoordinateValue0, fixedBulbYcoordinateValue0);

    //Fixed bulb for level 1
    let fixedBulb1 = this.add.sprite(0, 0, 'lightON1').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop1 = -0.2;
    let fixedBulbleft1 = 0.49;
    let fixedBulbXcoordinateValue1 = landingSpotFinder(fixedBulbleft1, fixedBulbTop1).xCoordinate;
    let fixedBulbYcoordinateValue1 = landingSpotFinder(fixedBulbleft1, fixedBulbTop1).yCoordinate;
    fixedBulb1.setPosition(fixedBulbXcoordinateValue1, fixedBulbYcoordinateValue1);
    fixedBulb1.visible = false;

    //Fixed bulb for level 2
    let fixedBulb2 = this.add.sprite(0, 0, 'lightON2').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop2 = -0.2;
    let fixedBulbleft2 = 0.49;
    let fixedBulbXcoordinateValue2 = landingSpotFinder(fixedBulbleft2, fixedBulbTop2).xCoordinate;
    let fixedBulbYcoordinateValue2 = landingSpotFinder(fixedBulbleft2, fixedBulbTop2).yCoordinate;
    fixedBulb2.setPosition(fixedBulbXcoordinateValue2, fixedBulbYcoordinateValue2);
    fixedBulb2.visible = false;

    //Fixed bulb for level 3
    let fixedBulb3 = this.add.sprite(0, 0, 'lightON3').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop3 = -0.2;
    let fixedBulbleft3 = 0.49;//.49
    let fixedBulbXcoordinateValue3 = landingSpotFinder(fixedBulbleft3, fixedBulbTop3).xCoordinate;
    let fixedBulbYcoordinateValue3 = landingSpotFinder(fixedBulbleft3, fixedBulbTop3).yCoordinate;
    fixedBulb3.setPosition(fixedBulbXcoordinateValue3, fixedBulbYcoordinateValue3);
    fixedBulb3.visible = false;

    //Cell 1
    var image0 = this.add.sprite(leftAlignment, topAlignment * 1, 'cell').setScale(scaleFactor2 * 2).setInteractive();
    image0.depth = 1;
    image0.name = "1st_cell"; // unique identifier for this game object( gameObject.name will give access to it)
    this.input.setDraggable(image0);
    //Cell 2
    var image1 = this.add.sprite(leftAlignment, topAlignment * 2, 'cell').setScale(scaleFactor2 * 2).setInteractive();
    image1.depth = 1;
    image1.name = "2nd_cell";
    this.input.setDraggable(image1);
    //Cell 3
    var image2 = this.add.sprite(leftAlignment, topAlignment * 3, 'cell').setScale(scaleFactor2 * 2).setInteractive(); 2 * 1.5
    image2.depth = 1;
    image2.name = "3rd_cell";
    this.input.setDraggable(image2);


    //Coordinate storage Variables 
    let cellInitPos = [
        [leftAlignment, topAlignment * 1],
        [leftAlignment, topAlignment * 2],
        [leftAlignment, topAlignment * 3]
    ]; //intial position of the bateries (x, y coordinate)
    let cellTargetPos = [
        [landingSpotFinder(leftPercent[0], topPercent[0]).xCoordinate, landingSpotFinder(leftPercent[0], topPercent[0]).yCoordinate],
        [landingSpotFinder(leftPercent[1], topPercent[1]).xCoordinate, landingSpotFinder(leftPercent[1], topPercent[1]).yCoordinate],
        [landingSpotFinder(leftPercent[2], topPercent[2]).xCoordinate, landingSpotFinder(leftPercent[2], topPercent[2]).yCoordinate]
    ]; //target position of the bateries (x, y coordinate)
    let cellCurrentPos = [
        [leftAlignment, topAlignment * 1],
        [leftAlignment, topAlignment * 2],
        [leftAlignment, topAlignment * 3]
    ]; //current position of the bateries (x, y coordinate)
    let iscellSnapped = [false, false, false]; //state variable stores if a particular cell is snapped to a location.

    function spriteNumberFinder(gameObject) {
        let index;
        if (gameObject.name == "1st_cell") index = 0;
        if (gameObject.name == "2nd_cell") index = 1;
        if (gameObject.name == "3rd_cell") index = 2;
        return index;
    }
    function nearOrNot(x1, y1, x2, y2, distThreshhold) {
        /* This function takes two coordinates and tells if they are close or not.
        If they are near, it returns TRUE else FALSE */
        if (Math.abs(x1 - x2) <= distThreshhold * 2 && Math.abs(y2 - y1) <= distThreshhold) {
            return true;
        }
        else {
            return false;
        }
    }
    // let propName = getPropName(){ //returns "image3" or "image4" or "image5"

    // }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        let index = spriteNumberFinder(gameObject);
        // console.log(cellCurrentPos[index][0]);
        // console.log(cellCurrentPos[index][1]);

        cellCurrentPos[index][0] = dragX;
        cellCurrentPos[index][1] = dragY;

        //Show Cell holder
        switch (index) {
            case 0:
                image3.visible = true;
                break;
            case 1:
                image4.visible = true;
                break;
            case 2:
                image5.visible = true;
                break;
            default:
            // empty code block
        }

        gameObject.x = dragX;
        gameObject.y = dragY;
        if (nearOrNot(cellCurrentPos[index][0], cellCurrentPos[index][1], cellTargetPos[index][0], cellTargetPos[index][1], distThreshhold)) {
            // console.log("Target reached");
        }
    });
    this.input.on('dragend', function (pointer, gameObject) {
        let index = spriteNumberFinder(gameObject);
        //if cell is near a holder location then place the cell in that location.
        if (nearOrNot(cellCurrentPos[index][0], cellCurrentPos[index][1], cellTargetPos[index][0], cellTargetPos[index][1], distThreshhold)) {

            //TARGET REACHED
            gameObject.x = cellTargetPos[index][0];
            gameObject.y = cellTargetPos[index][1];

            switch (index) {
                case 0:
                    image3.visible = false;
                    break;
                case 1:
                    image4.visible = false;
                    break;
                case 2:
                    image5.visible = false;
                    break;
                default:
                // empty code block
            }
            iscellSnapped[index] = true;

        }
        else {
            gameObject.x = cellInitPos[index][0];
            gameObject.y = cellInitPos[index][1];
            iscellSnapped[index] = false;
        }
        switch (index) {
            case 0:
                image3.visible = false;
                break;
            case 1:
                image4.visible = false;
                break;
            case 2:
                image5.visible = false;
                break;
            default:
            // empty code block
        }

        //find no. of connected cells
        let cellCount = 0;
        for (let i = 0; i <= 3; i++) {
            if (iscellSnapped[i] == true) {
                cellCount += 1;
            }
        }
        //all bulbs hidden
        fixedBulb0.visible = false;
        fixedBulb1.visible = false;
        fixedBulb2.visible = false;
        fixedBulb3.visible = false;
        // show correct bulb(brightness)
        switch (cellCount) {
            case 0:
                fixedBulb0.visible = true;
                break;
            case 1:
                fixedBulb1.visible = true;
                break;
            case 2:
                fixedBulb2.visible = true;
                break;
            case 3:
                fixedBulb3.visible = true;
                break;
            default:
            // empty code block
        }
    });

    //cell holder 1
    var image3 = this.add.sprite(cellTargetPos[0][0], cellTargetPos[0][1], 'holder').setScale(scaleFactor2 * 1.5);
    image3.name = "holder1";
    image3.visible = false;
    console.log(image3);

    //cell holder 2
    var image4 = this.add.sprite(cellTargetPos[1][0], cellTargetPos[1][1], 'holder').setScale(scaleFactor2 * 1.5);
    image4.name = "holder2";
    image4.visible = false;


    //cell holder 3
    var image5 = this.add.sprite(cellTargetPos[2][0], cellTargetPos[2][1], 'holder').setScale(scaleFactor2 * 1.5);
    image5.name = "holder3";
    image5.visible = false;

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
let timer1 = 0;
gameScene.update = function () {
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.scale.refresh();
    // this.bg.x += 1;
    // Phaser.Actions.RotateAroundDistance([this.container], this.center, this.rotateSpeed, 250);
    // const angleDeg = Math.atan2(this.container.y - this.center.y, this.container.x - this.center.x) * 180 / Math.PI;
    // this.container.angle = angleDeg + 90 // container should face the center point
    // if (timer1 <= 5000) {
    //     gameScene.add.displayList.scene.add.displayList.list[4]._scaleX += 0.001;
    //     gameScene.add.displayList.scene.add.displayList.list[4]._scaleY += 0.001;
    //     timer1 += 1;
    // }
    // Phaser.Actions.ScaleXY(gameScene.gameObject, 0.5);
}

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
