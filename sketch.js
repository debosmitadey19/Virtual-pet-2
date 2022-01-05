var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var foodObj;
var fedTime,lastFed,feed,addFood

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj = new Food();

  foodStock = database.ref('Food');
  
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(500,65);
  addFood.mousePressed(addFoods)
}



function draw() {
  background(46,139,87);
 
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textsize(15);
  if(Lastfed >= 12){
    text("Last Feed:" + lastFed %12 + "PM",350,30);
  }
  else if (Lastfed==0){
    text("Last Feed: 12AM ",350,30);
  }
  else{
    text("Last Feed:  " + lastFed + "AM",350,30);
  }

  drawSprites();

  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
 
  function feedDog(){
    dog.addImage(dogImg1);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }

  function addFood(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
}