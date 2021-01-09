var PLAY = 1;
var END = 0;
var gameState = PLAY;
var BG, invisibleGround, BGImage;
var alien, alienImage;
var cloudImage, cloudsGroup;
var crabImage, crabsGroup;
var score;
var restart, restartImage;
var scoreBoard, scoreBoardImage;


function preload() {
  BGImage = loadImage("BG.final.png");
  scoreBoardImage = loadImage("download (7).png")
  alienImage = loadImage("tenor (1).gif");
  cloudImage = loadImage("download.png");
  crabImage = loadImage("crabs.gif");
  
}

function setup() {
  createCanvas(800, 235);

  var message = "This is a message";
  console.log(message)

  //create the group sprite.
  BG = createSprite(200, 120, 400, 20);
  BG.addImage("ground", BGImage);
  // BG.x = BG.width /2;
  
  scoreBoard = createSprite(700,45);
  scoreBoard.addImage("dash",scoreBoardImage);

  alien = createSprite(50, 213);
  alien.addImage("running", alienImage);
  alien.scale = 0.1;




  //creating a invisible ground to support the trex
  invisibleGround = createSprite(50, 215, 400, 10);
  invisibleGround.visible = false;

  score = 0;

  crabsGroup = new Group();
}

function draw() {

  background(180);
  //displaying score
  
  alien.collide(invisibleGround);
  if (gameState === PLAY) {
    BG.velocityX = -4;
    //scoring
    score = score + Math.round(getFrameRate() / 60);

    //making the ground infinite
    if (BG.x < 0) {
      BG.x = BG.width / 2;
    }
    if (keyDown("space") && alien.y >= 159) {
      alien.velocityY = -16;
    }
    spawnClouds();
    spawnCrabs();
    spawnBlock();

    alien.velocityY = alien.velocityY + 0.8

    drawSprites();
  }
  if (alien.isTouching(crabsGroup)) {
    gameState = END;  
  }

  if (gameState === END) {
    BG.velocityX = 0;
    alien.velocityY = 0;
  }
  fill("yellow");
  text("Score: " + score, 500, 50);

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(20, 30));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = alien.depth;
    alien.depth = alien.depth + 1;


  }
}

function spawnCrabs() {
  if (frameCount % 100 === 0) {
    var crab = createSprite(600, 120, 40, 10);
    crab.y = Math.round(random(190, 190));
    crab.addImage(crabImage);
    crab.scale = 0.1;
    crab.velocityX = -3;
    crabsGroup.add(crab);
    crab.lifetime = 200;
  }
}
function spawnBlock(){
  if(frameCount % 10 === 0) {
    var scoreBoard = createSprite()
  }
}