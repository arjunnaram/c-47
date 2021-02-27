var tHunter,tHunterImg
var coinImage,coinsGroup
var score=0;
var invGround;
var obstacleImage, obstaclesGroup;
var gameState = 'play'

function preload(){
    tHunterImg=loadAnimation("images/mario1.png","images/mario2.png","images/mario3.png")
    backgroundImage = loadImage("images/background.jpg");
    coinImage = loadImage("images/sprite_0.png")



    obstacleImage = loadAnimation("images/obstacle1.png","images/obstacle2.png","images/obstacle3.png","images/obstacle4.png");
}

function setup() {
  createCanvas(800,400);


  ground = createSprite(0,00,800,400);
  ground.addImage("ground",backgroundImage);
  ground.x = ground.width /2;
  ground.scale=1.3;
  ground.velocityX=-4;
  tHunter=createSprite(84, 230, 50, 50);
 // backgroundImage = loadImage("background.jpg");
  tHunter.addAnimation("running",tHunterImg)
  tHunter.scale=0.5
  invGround = createSprite(100,320,400,20);
  invGround.visible=false;

  coinsGroup = new Group();
  obstaclesGroup = new Group();


}

function draw() {
  //background() 
if (gameState==='play'){
  if (ground.x<150){
    ground.x=ground.width/2
  }
console.log(tHunter.y)  
  if (keyDown("space") && tHunter.y > 200){
    tHunter.velocityY=-14;
  }
  tHunter.velocityY+=0.8

  
     
  for (var i = 0; i < coinsGroup.length; i++) {
    if (coinsGroup.get(i).isTouching(tHunter)) {
      coinsGroup.get(i).destroy()
      score++;

    }
  }

   // checking for collision of mario with obstacles
   if (obstaclesGroup.isTouching (tHunter)){
        

    gameState = "end";
    coinsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    tHunter.velocityY=0; 
    ground.velocityX=0;
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
   }

  spawnCoins();
  spawnObstacles()
}
if (gameState==='end') {

console.log("game over")
}
tHunter.collide(invGround)

  drawSprites();

  text("Coins "+score,600,50)
}


function spawnCoins(){

  if (frameCount % 80===0){
    var coin =createSprite(800,200,20,20)
    coin.y = Math.round(random(100,250))
    coin.addImage(coinImage)
    coin.scale=0.5
    coin.velocityX=-4
    coin.lifetime = 200
    coinsGroup.add(coin)

  }   
}
//function to spawn obstacles        
function spawnObstacles(){
  
  if (frameCount%60===0) {

      var obstacle = createSprite(800,280,10,10);
      obstacle.addAnimation("moving",obstacleImage);
      obstacle.scale=1;
      obstacle.velocityX=- (6 + score/10);
      obstacle.lifetime=200;
      obstaclesGroup.add(obstacle);         
    
  }
  
}
