var PLAY = 1;
var END = 0;
var gameState=PLAY;
var backImage,back;
var player, player_running;
var ground;
var banana, bananaGroup, bananaImage;
var obstacle, obstacleGroup, obstacleImage;
var score=0;
var gameOver, gameOverImage, restart, restartImage;


function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}




function setup() {
  createCanvas(800,400);
  
  //background
  back = createSprite(0,0,800,400);
  back.addImage(backImage);
  back.scale=1.5;
  back.x = back.width/2;
  
  //player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.15;
  
  //groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  //adding the game over and restart
  gameOver = createSprite(400,150, 10, 10);
  gameOver.scale = 0.5;
  gameOver.addImage(gameOverImage);
  restart = createSprite(390,220, 10, 10);
  restart.scale = 0.3;
  restart.addImage(restartImage);
}






function draw() {
  background(255);
  
  //Ground settings
  ground = createSprite(400,350,800,5);
  ground.visible = false;
  player.collide(ground);
  
  
if(gameState===PLAY){
  
  //calling the functions
  food();
  obstacles();
    
//Making the background endless
   back.velocityX = -4;
  if(back.x<100){
  back.x=back.width/2;}
  
//Adding the jumping and gravity
  if(keyDown("space") ) {
      player.velocityY = -12;}
  player.velocityY = player.velocityY + 0.8;
    
//Increasing the score and destroying the banana after the player touches it
  if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
      score = score+2;}
  
  gameOver.visible=false;
  restart.visible=false;

//Increasing the size of monkey according to the score
  switch(score){
      case 10: player.scale=0.17;
              break;
      case 20: player.scale=0.19;
              break;
       case 30: player.scale=0.21;
              break;
      case 40: player.scale=0.23;
              break;
      case 50: player.scale=0.25;
              break;
      case 60: player.scale=0.27;
              break;
      case 70: player.scale=0.29;
              break;
      case 80: player.scale=0.31;
              break;
      case 90: player.scale=0.33;
              break;
      case 100: player.scale=0.35;
              break;
      default: break;
    }

  //setting the gamestate to end after touching an obstacle
if(obstacleGroup.isTouching(player)){ 
  gameState=END;
 }
}
  //what happens if we touch an obstacle
if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  back.velocityX = 0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  //restart button settings
  if(mousePressedOver(restart)){
      player.scale = 0.15;
      gameState=PLAY;
  }
  score = 0;
}
   
  drawSprites();
  
  //Dispalying the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}



// food function
function food() {
  if (frameCount%80 === 0) {
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 103;
    player.depth = banana.depth + 1;
    
    bananaGroup.add(banana);
  }
}

//obstacle function
function obstacles() {
  if(frameCount%300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
  }
}

