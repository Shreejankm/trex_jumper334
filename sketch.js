var PLAY = 1;
var END = 0;
var gameState = 1;

var sword,monster,fruit1,fruit2,fruit3,fruit4;
var swordImage,monsterImage,fruit1Image,fruit2Image,
fruit3Image,fruit4Image;

var gameOver;
var gameOverImage;

var score;

function preload(){
  swordImage = loadImage("sword.png");
  
  monsterImage = loadImage("alien1.png","alien2.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  cutting = loadSound("knifeSwooshSound.mp3");
  over = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
 
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
  background("lightblue");
  
  if(gameState === PLAY){
    fruits();
    Enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score + 2;
    cutting.play();
  }
  
  if(sword.isTouching(enemyGroup)){
    gameState = END;
    sword.addImage(gameOverImage);
    over.play();
  }
  
  if(gameState === END){
    sword.x = 200;
    sword.y = 200;
  }
  
  if(keyDown("space")){
    gameState = PLAY;
    score = 0;
    fruits();
    Enemy();

    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  }

  text("Score: "+ score, 500,50);
  
  drawSprites();
}

function fruits(){
  if(World.frameCount % 80 === 0){
    fruit = createSprite(600,200,20,20);
    fruit.lifetime = 90;
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if(r === 1){
      fruit.addImage(fruit1Image);
    } else if (r === 2){
      fruit.addImage(fruit2Image);
    } else if ( r === 3){
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -(7+(score/4));
    fruitGroup.add(fruit);
  }
    
}

function Enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(600,200,20,20);
    monster.lifetime = 80;
    monster.addAnimation("moving",monsterImage);
    monster.scale = 1;
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    enemyGroup.add(monster);
  }
}
