// variables are created for the game
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
// images are loaded here
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
 path=createSprite(200,200);
 path.addImage(pathImg);
 path.velocityY = 4;

//creating boy running
 boy = createSprite(70,580,20,20);
 boy.addAnimation("SahilRunning",boyImg);
 boy.scale=0.08;
  
// new groups are created cash , diamonds,jwellery,swords
 cashG=new Group();
 diamondsG=new Group();
 jwelleryG=new Group();
 swordGroup=new Group();
}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
    
//edges are created for the boy to collide the edges
  edges= createEdgeSprites();
  boy.collide(edges);
  
//code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
// different functions are created
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
//if cash , jewellery or diamond id touching the boy the score increases and destroy's itself
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+10
      
    } else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+5
    }
 
 // if the boy is touching swords the game is over everything is destroyed and the boy changes to gameOver image
   if(swordGroup.isTouching(boy)){
     gameState = END
     boy.addAnimation("SahilRunning",endImg)
     boy.scale = 1
     boy.x = 200
     boy.y = 300
     cashG.destroyEach()
     cashG.velocityYEach = 0
     diamondsG.destroyEach()
     diamondsG.velocityYEach = 0
     jwelleryG.destroyEach()
     jwelleryG.velocityYEach = 0
     swordGroup.destroyEach()
     swordGroup.velocityYEach = 0
   }
   
  drawSprites();

//displaying score 
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }
}
// function created for cash
 function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

// function created for diamonds
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

// function created for jwellery
function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

//function creared for swords
function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}