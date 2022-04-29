//create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = async function () {
    //load images
    this.load.image('lightOFF', '../assets/light OFF.png');
    this.load.image('lightON1', '../assets/light ON 1.png');
    this.load.image('lightON2', '../assets/light ON 2.png');
    this.load.image('lightON3', '../assets/light ON 3.png');
    this.load.image('cell', '../assets/battery.png');

    this.load.image('bg', '../assets/circuit1.png');
    this.load.image('bg2', '../assets/level2Circuit.png');
    this.load.image('dot', '../assets/Test dot for locating the bulb holder spots .png');
    this.load.image('holder', '../assets/cell holder.png');
    this.load.spritesheet('bulbSheet', '../assets/Spritesheets/spritesheet-horozontal- bulbs.png', { frameWidth: 581, frameHeight: 569 });

}

//called after preload ends

//Global variables



let iscellSnapped = [false, false, false]; //state variable stores if a particular cell is snapped to a location.


//Global variables for L2(as we cant declare it inside the next's onclick function)

//set variables
let screenheightL2 = window.innerHeight;
let screenwidthL2 = window.innerWidth;
let leftAlignmentL2 = 0.8 * screenwidthL2;
let topAlignmentL2 = 0.2 * screenheightL2;
// Create bg sprite
// Pic Aspect ratio - 1200/800
let bgWidthL2 = 1408, bgHeightL2 = 423;
let scaleFactorL2 = 0.45 * screenwidthL2 / bgWidthL2;
let scaleFactor2L2 = scaleFactorL2 * 0.35;
let distThreshholdL2 = 90;
let brightnessLevel = 0;

//rewrite the functions
function landingSpotFinderL2(a, b) {
    //first find the location of the corner of the circuit image
    let shiftx = screenwidthL2 * 0.2;
    let shifty = screenheightL2 * 0.2;
    //find the centre of the image(keep scaling in mind)

    shiftx += a * scaleFactorL2 * bgWidthL2;
    shifty += b * scaleFactorL2 * bgHeightL2;
    return {
        xCoordinate: shiftx,
        yCoordinate: shifty,
    };
    //example of use of above function
    // let value = landingSpotFinder(a, b);
    // let x = value.xCoordinate;
    // let y = value.yCoordinate;
}
function spriteNumberFinderL2(gameObject) {
    let index;
    if (gameObject.name == "1st_cell") index = 0;
    else if (gameObject.name == "2nd_cell") index = 1;
    else if (gameObject.name == "3rd_cell") index = 2;
    else if (gameObject.name == "1st_Bulb") index = 10;
    else if (gameObject.name == "2nd_Bulb") index = 11;
    else if (gameObject.name == "3rd_Bulb") index = 12;
    return index;
}
function nearOrNotL2(x1, y1, x2, y2, distThreshhold) {
    /* This function takes two coordinates and tells if they are close or not.
    If they are near, it returns TRUE else FALSE */
    if (Math.abs(x1 - x2) <= distThreshhold * 1.5 && Math.abs(y2 - y1) <= distThreshhold * 2) {
        return true;
    }
    else {
        return false;
    }
}


//Coordinate storage Variables 
let leftPercentBulbL2 = [0.2, 0.5, 0.8];  //here, 0.517= 51.7%
let topPercentBulbL2 = [0.18, 0.18, 0.18];  //here, 0.05= 5%
let bulbInitPosL2 = [
    [leftAlignmentL2, topAlignmentL2 * 1],
    [leftAlignmentL2, topAlignmentL2 * 2],
    [leftAlignmentL2, topAlignmentL2 * 3]
]; //intial position of the bateries (x, y coordinate)
let bulbTargetPosL2 = [
    [landingSpotFinderL2(leftPercentBulbL2[0], topPercentBulbL2[0]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[0], topPercentBulbL2[0]).yCoordinate],
    [landingSpotFinderL2(leftPercentBulbL2[1], topPercentBulbL2[1]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[1], topPercentBulbL2[1]).yCoordinate],
    [landingSpotFinderL2(leftPercentBulbL2[2], topPercentBulbL2[2]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[2], topPercentBulbL2[2]).yCoordinate]
]; //target position of the bateries (x, y coordinate)
let bulbCurrentPosL2 = [
    [leftAlignmentL2, topAlignmentL2 * 1],
    [leftAlignmentL2, topAlignmentL2 * 2],
    [leftAlignmentL2, topAlignmentL2 * 3]
]; //current position of the bateries (x, y coordinate)
let topPercentBulbSNAPPINGL2 = [-0.27, -0.27, -0.27];  //here, 0.05= 5%
let bulbSNAPPINGTargetPosL2 = [
    [landingSpotFinderL2(leftPercentBulbL2[0], topPercentBulbSNAPPINGL2[0]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[0], topPercentBulbSNAPPINGL2[0]).yCoordinate],
    [landingSpotFinderL2(leftPercentBulbL2[1], topPercentBulbSNAPPINGL2[1]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[1], topPercentBulbSNAPPINGL2[1]).yCoordinate],
    [landingSpotFinderL2(leftPercentBulbL2[2], topPercentBulbSNAPPINGL2[2]).xCoordinate, landingSpotFinderL2(leftPercentBulbL2[2], topPercentBulbSNAPPINGL2[2]).yCoordinate]
]; //target position of the bateries (x, y coordinate)

let isbulbSnapped = [false, false, false];


gameScene.create = async function () {
    let screenheight = window.innerHeight;
    let screenwidth = window.innerWidth;
    let leftAlignment = 0.8 * screenwidth;
    let topAlignment = 0.2 * screenheight;
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
    bg.name = "bgL1";


    // ---------level 2 BG------------------
    let screenheightL2 = window.innerHeight;
    let screenwidthL2 = window.innerWidth;
    let leftAlignmentL2 = 0.8 * screenwidth;
    let topAlignmentL2 = 0.2 * screenheight;
    // Create bg2 sprite
    // Pic Aspect ratio - 1200/800
    let bgWidthL2 = 1408, bgHeightL2 = 483;
    let scaleFactorL2 = 0.45 * screenwidthL2 / bgWidthL2;
    let scaleFactor2L2 = scaleFactor * 0.35;
    let distThreshholdL2 = 70;
    // console.log("This -> ", this);
    // console.log("Show the Background of Level 2");
    let bg2 = this.add.sprite(0, 0, 'bg2').setScale(scaleFactorL2);
    // console.log("This inside create():", this);
    bg2.setOrigin(0, 0); //change the  origin of the asset to top-left corner
    bg2.setPosition(screenwidthL2 * 0.2, screenheightL2 * 0.242); //place sprite postiion in the center
    bg2.visible = false;
    bg2.name = "bgL2";


    //----------------set draggable bulbs------------------
    //Bulb 1
    // let bulbTest = gameScene.add.sprite(leftAlignment, topAlignment * 1, 'bulbSheet').setScale(scaleFactor2 * 2).setInteractive();
    // bulbTest.depth = 1;
    // bulbTest.name = "BulbSpriteName"; // unique identifier for this game object( gameObject.name will give access to it)
    // gameScene.input.setDraggable(bulbTest);


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
    fixedBulb0.name = "fixedBulb0";


    //Fixed bulb for level 1
    let fixedBulb1 = this.add.sprite(0, 0, 'lightON1').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop1 = -0.2;
    let fixedBulbleft1 = 0.49;
    let fixedBulbXcoordinateValue1 = landingSpotFinder(fixedBulbleft1, fixedBulbTop1).xCoordinate;
    let fixedBulbYcoordinateValue1 = landingSpotFinder(fixedBulbleft1, fixedBulbTop1).yCoordinate;
    fixedBulb1.setPosition(fixedBulbXcoordinateValue1, fixedBulbYcoordinateValue1);
    fixedBulb1.visible = false;
    fixedBulb1.name = "fixedBulb1";


    //Fixed bulb for level 2
    let fixedBulb2 = this.add.sprite(0, 0, 'lightON2').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop2 = -0.2;
    let fixedBulbleft2 = 0.49;
    let fixedBulbXcoordinateValue2 = landingSpotFinder(fixedBulbleft2, fixedBulbTop2).xCoordinate;
    let fixedBulbYcoordinateValue2 = landingSpotFinder(fixedBulbleft2, fixedBulbTop2).yCoordinate;
    fixedBulb2.setPosition(fixedBulbXcoordinateValue2, fixedBulbYcoordinateValue2);
    fixedBulb2.visible = false;
    fixedBulb2.name = "fixedBulb2";


    //Fixed bulb for level 3
    let fixedBulb3 = this.add.sprite(0, 0, 'lightON3').setScale(scaleFactor2 * 1.7);
    let fixedBulbTop3 = -0.2;
    let fixedBulbleft3 = 0.49;//.49
    let fixedBulbXcoordinateValue3 = landingSpotFinder(fixedBulbleft3, fixedBulbTop3).xCoordinate;
    let fixedBulbYcoordinateValue3 = landingSpotFinder(fixedBulbleft3, fixedBulbTop3).yCoordinate;
    fixedBulb3.setPosition(fixedBulbXcoordinateValue3, fixedBulbYcoordinateValue3);
    fixedBulb3.name = "fixedBulb3";
    fixedBulb3.visible = false;

    //Cell 1
    let image0 = this.add.sprite(leftAlignment, topAlignment * 1, 'cell').setScale(scaleFactor2 * 2).setInteractive();
    image0.depth = 1;
    image0.name = "1st_cell"; // unique identifier for this game object( gameObject.name will give access to it)
    this.input.setDraggable(image0);

    //Cell 2
    let image1 = this.add.sprite(leftAlignment, topAlignment * 2, 'cell').setScale(scaleFactor2 * 2).setInteractive();
    image1.depth = 1;
    image1.name = "2nd_cell";
    this.input.setDraggable(image1);

    //Cell 3
    let image2 = this.add.sprite(leftAlignment, topAlignment * 3, 'cell').setScale(scaleFactor2 * 2).setInteractive(); 2 * 1.5
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


    function spriteNumberFinder(gameObject) {
        let index;
        if (gameObject.name == "1st_cell") index = 0;
        else if (gameObject.name == "2nd_cell") index = 1;
        else if (gameObject.name == "3rd_cell") index = 2;
        else if (gameObject.name == "1st_Bulb") index = 10;
        else if (gameObject.name == "2nd_Bulb") index = 11;
        else if (gameObject.name == "3rd_Bulb") index = 12;
        // else if (gameObject.name == "testBulb") index = 13;
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

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        let index = spriteNumberFinderL2(gameObject);
        if (index < 5) {
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
        }

        else {


            bulbCurrentPosL2[index - 10][0] = dragX;
            bulbCurrentPosL2[index - 10][1] = dragY;

            //change the cell holder location
            //Bulb holder 1
            image3.x = bulbTargetPosL2[0][0];
            image3.y = bulbTargetPosL2[0][1];

            //Bulb holder 2
            image4.x = bulbTargetPosL2[1][0];
            image4.y = bulbTargetPosL2[1][1];

            //Bulb holder 3
            image5.x = bulbTargetPosL2[2][0];
            image5.y = bulbTargetPosL2[2][1];


            //Show Cell holder
            let indexL2 = index - 10;
            switch (indexL2) {
                case 0:
                    image3.visible = true;
                    if (isbulbSnapped[indexL2] == true) { //was it snapped earlier
                        //hide unhidden bulbs at that location
                        gameScene.add.displayList.list[12].alpha = 0;
                        gameScene.add.displayList.list[13].alpha = 0;
                        gameScene.add.displayList.list[14].alpha = 0;

                        //calculate birghtness level here
                        brightnessLevel = -1;
                        for (let i = 0; i <= 2; i++) {
                            if (isbulbSnapped[i]) {
                                brightnessLevel += 1;
                            }
                        }
                        if (isbulbSnapped[1] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[17].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[16].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[15].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                        if (isbulbSnapped[2] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[20].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[19].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[18].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                    }
                    isbulbSnapped[indexL2] = false;
                    break;
                case 1:
                    image4.visible = true;
                    if (isbulbSnapped[indexL2] == true) { //was it snapped earlier
                        //hide unhidden bulbs at that location
                        gameScene.add.displayList.list[15].alpha = 0;
                        gameScene.add.displayList.list[16].alpha = 0;
                        gameScene.add.displayList.list[17].alpha = 0;

                        //calculate birghtness level here
                        brightnessLevel = -1;
                        for (let i = 0; i <= 2; i++) {
                            if (isbulbSnapped[i]) {
                                brightnessLevel += 1;
                            }
                        }
                        if (isbulbSnapped[0] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[14].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[13].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[12].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                        if (isbulbSnapped[2] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[20].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[19].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[18].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                    }
                    isbulbSnapped[indexL2] = false;
                    break;
                case 2:
                    image5.visible = true;
                    if (isbulbSnapped[indexL2] == true) { //was it snapped earlier
                        //hide unhidden bulbs at that location
                        gameScene.add.displayList.list[18].alpha = 0;
                        gameScene.add.displayList.list[19].alpha = 0;
                        gameScene.add.displayList.list[20].alpha = 0;

                        //calculate birghtness level here
                        brightnessLevel = -1;
                        for (let i = 0; i <= 2; i++) {
                            if (isbulbSnapped[i]) {
                                brightnessLevel += 1;
                            }
                        }
                        if (isbulbSnapped[0] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[14].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[13].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[12].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                        if (isbulbSnapped[1] == true) {
                            //turn off other bulbs[not hiding]

                            if (brightnessLevel == 1) {
                                gameScene.add.displayList.list[17].alpha = 1;
                            }
                            else if (brightnessLevel == 2) {
                                gameScene.add.displayList.list[16].alpha = 1;
                            }
                            else if (brightnessLevel == 3) {
                                gameScene.add.displayList.list[15].alpha = 1;
                            }
                            else {
                                console.log("error");
                            }
                        }
                    }
                    isbulbSnapped[indexL2] = false;
                    break;
                default:
                // empty code block
            }


            //Hide the unHidden bulbs in holder location
            // for (let i = 12; i <= 20; i++) {
            //     if(isbulbSnapped[0]==true & index-10==0){

            //     }
            //     else if(){

            //     }
            //     else if(){

            //     }
            //     else{
            //         gameScene.add.displayList.list[i].alpha = 0;
            //     }

            // }
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.alpha = 1;
            // gameObject.anims.currentFrame = 1;
            // console.log(gameObject);
            // gameObject.anims.create({
            //     key: "ship1_anim",
            //     frames: gameObject.anims.generateFrameNumbers("bulbSheet"),
            //     frameRate: 20,
            //     repeat: -1
            // });

        }
        // else {
        //     gameObject.alpha = 1;
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        //     //put the glowwer and floater code here
        // }
    });
    this.input.on('dragend', function (pointer, gameObject) {
        let index = spriteNumberFinder(gameObject);
        if (index < 5) {
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
        }
        else {
            // Here I set the code for the level 2

            //----------------------------------------------
            //------------- LEVEL 2 DRAGEND-----------------
            //----------------------------------------------

            if (nearOrNotL2(bulbCurrentPosL2[index - 10][0], bulbCurrentPosL2[index - 10][1], bulbTargetPosL2[index - 10][0], bulbTargetPosL2[index - 10][1], distThreshholdL2)) {
                //TARGET REACHED
                gameObject.x = bulbSNAPPINGTargetPosL2[index - 10][0];
                gameObject.y = bulbSNAPPINGTargetPosL2[index - 10][1];
                gameObject.alpha = 0.001;
                // for (let i = 0; i <= 25; i++) {
                //     console.log(gameScene.add.displayList.list[i].name, ' ', i);
                // }

                //depending on the bulb set light's alpha values
                isbulbSnapped[index - 10] = true;
                brightnessLevel = 0;
                for (let i = 0; i <= 2; i++) {
                    if (isbulbSnapped[i]) {
                        brightnessLevel += 1;
                    }
                    // gameScene.add.displayList.list[i].name
                }


                if (brightnessLevel == 0) {
                    //hide all the location hidden bulbs
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                }
                else if (brightnessLevel == 1) {

                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[14].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[17].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[20].alpha = 1;
                    }
                }
                else if (brightnessLevel == 2) {
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[13].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[16].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[19].alpha = 1;
                    }
                }
                else if (brightnessLevel == 3) {
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[12].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[15].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[18].alpha = 1;
                    }
                }
                else {
                    console.log("error in calculating the brightness level");
                }
                // console.log("Dragend - properties", brightnessLevel, isbulbSnapped);
                // gameScene.add.displayList.list[i].name




                // gameScene.add.displayList.list[14].alpha = 1;

                // gameObject.setFrame(Phaser.Utils.Array.gameObject.textures.get('bulbSheet').getFrameNames()[1]);

                switch (index - 10) {
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
                iscellSnapped[index - 10] = true;
            }
            else {
                gameObject.alpha = 1;
                gameObject.x = bulbInitPosL2[index - 10][0];
                gameObject.y = bulbInitPosL2[index - 10][1];
                iscellSnapped[index - 10] = false;
                //depending on the bulb set light's alpha values
                brightnessLevel = 0;
                for (let i = 0; i <= 2; i++) {
                    if (isbulbSnapped[i]) {
                        brightnessLevel += 1;
                    }
                    // gameScene.add.displayList.list[i].name
                }


                if (brightnessLevel == 0) {
                    //hide all the location hidden bulbs
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                }
                else if (brightnessLevel == 1) {

                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[14].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[17].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[20].alpha = 1;
                    }
                }
                else if (brightnessLevel == 2) {
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[13].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[16].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[19].alpha = 1;
                    }
                }
                else if (brightnessLevel == 3) {
                    for (let i = 12; i <= 20; i++) {
                        gameScene.add.displayList.list[i].alpha = 0;
                    }
                    if (isbulbSnapped[0]) {
                        gameScene.add.displayList.list[12].alpha = 1;
                    }
                    if (isbulbSnapped[1]) {
                        gameScene.add.displayList.list[15].alpha = 1;
                    }
                    if (isbulbSnapped[2]) {
                        gameScene.add.displayList.list[18].alpha = 1;
                    }
                }
                else {
                    console.log("error in calculating the brightness level");
                }
            }
            switch (index - 10) {
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
                if (isbulbSnapped[i] == true) {
                    cellCount += 1;
                }
            }
            //all bulbs hidden
            fixedBulb0.visible = false;
            fixedBulb1.visible = false;
            fixedBulb2.visible = false;
            fixedBulb3.visible = false;

            // show correct bulb(brightness)
            // console.log(gameObject);

            //--------------add brightness here ----------


            // switch (cellCount) {
            //     case 0:
            //         fixedBulb0.visible = true;
            //         break;
            //     case 1:
            //         fixedBulb1.visible = true;
            //         break;
            //     case 2:
            //         fixedBulb2.visible = true;
            //         break;
            //     case 3:
            //         fixedBulb3.visible = true;
            //         break;
            //     default:
            //     // empty code block
            // }
        }
    });

    //cell holder 1
    let image3 = this.add.sprite(cellTargetPos[0][0], cellTargetPos[0][1], 'holder').setScale(scaleFactor2 * 1.5);
    image3.name = "holder1";
    image3.visible = false;

    //cell holder 2
    let image4 = this.add.sprite(cellTargetPos[1][0], cellTargetPos[1][1], 'holder').setScale(scaleFactor2 * 1.5);
    image4.name = "holder2";
    image4.visible = false;

    //cell holder 3
    let image5 = this.add.sprite(cellTargetPos[2][0], cellTargetPos[2][1], 'holder').setScale(scaleFactor2 * 1.5);
    image5.name = "holder3";
    image5.visible = false;
}

//-------------------------------------------------------------
//                     Level 1 - TUTORIAL   
//-------------------------------------------------------------


let tutorialLevel = 1;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//show Blur
async function showBlurScreen() {
    document.getElementById("screenblur").classList.add("appear");
    document.getElementById("screenblur").style.display = "block";
    await sleep(200);
    document.getElementById("screenblur").classList.remove("appear");
}

//hide Blur
async function hideBlurScreen() {
    document.getElementById("screenblur").classList.add("disappear");
    await sleep(200);
    document.getElementById("screenblur").style.display = "none";
    document.getElementById("screenblur").classList.remove("disappear");
}

//show element
async function showElement(htmlobj) {
    htmlobj.classList.add("apppear");
    await sleep(200);
    htmlobj.style.display = "none";
    htmlobj.classList.remove("apppear");
}

//hide element
async function hideElement(htmlobj) {
    htmlobj.classList.add("disapppear");
    await sleep(200);
    htmlobj.style.display = "none";
    htmlobj.classList.remove("disapppear");
}

//L1 popup ONCLICK
document.getElementById("L1tutorial1").onclick = async function () {
    hideElement(document.getElementById("L1tutorial1"));
    hideBlurScreen();
    if (tutorialLevel == 1) {
        tutorialLevel = 2;
    }

}

//main tutorial
tutorialLevel1();
async function tutorialLevel1() {
    while (tutorialLevel != 3) {
        await sleep(1000);
        if (tutorialLevel == 2 && iscellSnapped[0] && iscellSnapped[1] && iscellSnapped[2]) {
            //show question now
            // console.log("batteries in place");
            document.getElementById("question1Containerid").style.display = "block";
        }
    }
    while (tutorialLevel == 3) {
        await sleep(1000);
        if (tutorialLevel == 3 && isbulbSnapped[0] && isbulbSnapped[1] && isbulbSnapped[2]) {
            //show question now
            // console.log("batteries in place");
            //delete the HTML elements

            // let tempHTMLStr = "<div class='questionText' id='question1Text'> What did you observe just now? <br> <br></div><div class='optionsText' id = 'options1Text'> The bulbs💡 lights up brightly when there are <b class='bolder' > LESS</b > bulbs💡 connected to the cell🔋</div ><div class='optionsText' id='options2Text' style='transform:translate(-50%,10%);'> The bulbs💡 lights up brightly when there are <b class='bolder'>MORE</b> bulbs💡 connected to the cell🔋</div><div id='AnswerDivid'>";

            document.getElementById("options1Text").style.background = "linear-gradient(to bottom, #00529f, rgb(0, 146, 191))";
            document.getElementById("options1Text").style.color = "#bef1ff";

            document.getElementById("options2Text").style.background = "linear-gradient(to bottom, #00529f, rgb(0, 146, 191))";
            document.getElementById("options2Text").style.color = "#bef1ff";


            document.getElementById("options1Text").style.pointerEvents = "auto";
            document.getElementById("options2Text").style.pointerEvents = "auto";
            // document.getElementById("question1Containerid").innerHTML = tempHTMLStr;
            document.getElementById("options1Text").innerHTML = "The bulbs💡 lights up brightly when there are <b class='bolder'>LESS</b > bulbs💡 connected to the cell🔋";
            document.getElementById("options2Text").innerHTML = "The bulbs💡 lights up brightly when there are <b class='bolder'>MORE</b> bulbs💡 connected to the cell🔋";

            document.getElementById("AnswerDivid").innerHTML = "";
            document.getElementById("question1Containerid").style.display = "block";
            // document.getElementById("options1Text").style.display = "none";
            tutorialLevel = 4;
        }
    }
}


document.getElementById("options1Text").onclick = function () {
    console.log("OPTION 1 CLICKED");
    //first question stage
    if (tutorialLevel == 2) {
        //tell answer is incorrect, and show correct law
        document.getElementById("AnswerDivid").innerText = "The bulb💡 is brightest when there are MORE batteries🔋🔋🔋 connected to it";
        document.getElementById("AnswerDivid").style.color = "#ff003c";
        //deactivating options
        document.getElementById("options1Text").style.pointerEvents = "none";
        document.getElementById("options2Text").style.pointerEvents = "none";

        //highlighting the selected option
        //highlighting the selected option
        document.getElementById("options1Text").style.background = "linear-gradient(to left, rgb(255, 45, 164), #ff003c)";
        document.getElementById("options1Text").style.color = "white";

        //show next button
        tutorialLevel = 3;
        document.getElementById("NextBtn").style.bottom = "5%";
        document.getElementById("NextBtn").style.right = "5%";
        document.getElementById("NextBtn").style.left = "auto";
        document.getElementById("NextBtn").style.display = "block";
    }
}

document.getElementById("options2Text").onclick = function () {
    console.log("OPTION 2 CLICKED");
    //first question stage
    if (tutorialLevel == 2) {
        //tell answer is Correct, and show correct law
        document.getElementById("AnswerDivid").innerText = "🎉Correct answer!🥳";
        document.getElementById("AnswerDivid").style.color = "#035c2b";
        //deactivating options
        document.getElementById("options1Text").style.pointerEvents = "none";
        document.getElementById("options2Text").style.pointerEvents = "none";

        //highlighting the selected option
        document.getElementById("options2Text").style.background = "linear-gradient(to left, #62ff2e, #aaff64)";
        //show next button
        tutorialLevel = 3;
        document.getElementById("NextBtn").style.bottom = "5%";
        document.getElementById("NextBtn").style.right = "5%";
        document.getElementById("NextBtn").style.left = "auto";
        document.getElementById("NextBtn").style.display = "block";
    }
    if (tutorialLevel == 4) {
        //tell answer is Correct, and show correct law
        document.getElementById("AnswerDivid").innerText = "🎉Correct answer!🥳";
        document.getElementById("AnswerDivid").style.color = "#035c2b";
        //deactivating options
        document.getElementById("options1Text").style.pointerEvents = "none";
        document.getElementById("options2Text").style.pointerEvents = "none";

        //highlighting the selected option
        document.getElementById("options2Text").style.background = "linear-gradient(to left, #62ff2e, #aaff64)";
        //show next button
        tutorialLevel = 5;
        document.getElementById("NextBtn").style.bottom = "5%";
        document.getElementById("NextBtn").style.right = "5%";
        document.getElementById("NextBtn").style.left = "auto";
        document.getElementById("NextBtn").style.display = "block";
    }

}
document.getElementById("NextBtn").onclick = async function () {
    if (tutorialLevel == 3) { //Level 1 complete
        this.style.display = "none";
        document.getElementById("question1Containerid").style.display = "none";

        //show 
        let htmlString = "<h1 id='crossBtn'>&times;</h1><br>Connect the Bulbs💡 to the curcit and see what happens !<br><br>";

        document.getElementById("L1tutorial1").innerHTML = htmlString;
        document.getElementById("L1tutorial1").style.display = "block";
        showBlurScreen();

        // hide all
        for (let i = 0; i <= 11; i++) {
            gameScene.add.displayList.scene.add.displayList.list[i].visible = false;
            // console.log("i:", i, gameScene.add.displayList.scene.add.displayList.list[i].name);
        }

        //SET LEVEL 2 SCENE HERE
        //set bg
        gameScene.add.displayList.scene.add.displayList.list[1].visible = true;

        //set draggable bulbs
        //Bulb 1
        let bulb0 = gameScene.add.sprite(leftAlignmentL2, topAlignmentL2 * 1, 'bulbSheet').setScale(scaleFactor2L2 * 2).setInteractive();
        bulb0.depth = 2;
        bulb0.name = "1st_Bulb"; // unique identifier for this game object( gameObject.name will give access to it)
        gameScene.input.setDraggable(bulb0);

        //Cell 2
        let bulb1 = gameScene.add.sprite(leftAlignmentL2, topAlignmentL2 * 2, 'bulbSheet').setScale(scaleFactor2L2 * 2).setInteractive();
        bulb1.depth = 2;
        bulb1.name = "2nd_Bulb";
        gameScene.input.setDraggable(bulb1);

        //Cell 3
        let bulb2 = gameScene.add.sprite(leftAlignmentL2, topAlignmentL2 * 3, 'bulbSheet').setScale(scaleFactor2L2 * 2).setInteractive();
        bulb2.depth = 2;
        bulb2.name = "3rd_Bulb";
        gameScene.input.setDraggable(bulb2);

        //---------------------HIDDEN BULBS IN HOLDER LOC -------------
        //Set the glowers here; those are the bulbs fixed in the holder locations which glow depending on number of total no of the bulbs connected.

        //LOCATION 1(INDEX-0)
        let bulbHidden0low = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[0][0], bulbSNAPPINGTargetPosL2[0][1], 'lightON1').setScale(scaleFactor2L2 * 2);
        bulbHidden0low.depth = 1;
        bulbHidden0low.name = "1st_Location_Hidden_Bulb_Low";
        bulbHidden0low.alpha = 0;

        let bulbHidden0Medium = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[0][0], bulbSNAPPINGTargetPosL2[0][1], 'lightON2').setScale(scaleFactor2L2 * 2);
        bulbHidden0Medium.depth = 1;
        bulbHidden0Medium.name = "1st_Location_Hidden_Bulb_Medium";
        bulbHidden0Medium.alpha = 0;

        let bulbHidden0High = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[0][0], bulbSNAPPINGTargetPosL2[0][1], 'lightON3').setScale(scaleFactor2L2 * 2);
        bulbHidden0High.depth = 1;
        bulbHidden0High.name = "1st_Location_Hidden_Bulb_High";
        bulbHidden0High.alpha = 0;


        //LOCATION 2(INDEX-1)
        let bulbHidden1low = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[1][0], bulbSNAPPINGTargetPosL2[1][1], 'lightON1').setScale(scaleFactor2L2 * 2);
        bulbHidden1low.depth = 1;
        bulbHidden1low.name = "2nd_Location_Hidden_Bulb_Low";
        bulbHidden1low.alpha = 0;

        let bulbHidden1Medium = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[1][0], bulbSNAPPINGTargetPosL2[1][1], 'lightON2').setScale(scaleFactor2L2 * 2);
        bulbHidden1Medium.depth = 1;
        bulbHidden1Medium.name = "2nd_Location_Hidden_Bulb_Medium";
        bulbHidden1Medium.alpha = 0;

        let bulbHidden1High = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[1][0], bulbSNAPPINGTargetPosL2[1][1], 'lightON3').setScale(scaleFactor2L2 * 2);
        bulbHidden1High.depth = 1;
        bulbHidden1High.name = "2nd_Location_Hidden_Bulb_High";
        bulbHidden1High.alpha = 0;


        //LOCATION 3(INDEX-2)
        let bulbHidden2low = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[2][0], bulbSNAPPINGTargetPosL2[2][1], 'lightON1').setScale(scaleFactor2L2 * 2);
        bulbHidden2low.depth = 1;
        bulbHidden2low.name = "3rd_Location_Hidden_Bulb_Low";
        bulbHidden2low.alpha = 0;

        let bulbHidden2Medium = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[2][0], bulbSNAPPINGTargetPosL2[2][1], 'lightON2').setScale(scaleFactor2L2 * 2);
        bulbHidden2Medium.depth = 1;
        bulbHidden2Medium.name = "3rd_Location_Hidden_Bulb_Medium";
        bulbHidden2Medium.alpha = 0;

        let bulbHidden2High = gameScene.add.sprite(bulbSNAPPINGTargetPosL2[2][0], bulbSNAPPINGTargetPosL2[2][1], 'lightON3').setScale(scaleFactor2L2 * 2);
        bulbHidden2High.depth = 1;
        bulbHidden2High.name = "3rd_Location_Hidden_Bulb_High";
        bulbHidden2High.alpha = 0;
    }
    // else if(tutorialLevel){

    // }

}

//***************************************************************
//                        LEVEL 2                                
//***************************************************************


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

}