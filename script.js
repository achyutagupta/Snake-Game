const musicsound = new Audio("music/music.mp3");
const movesound = new Audio("music/move.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const foodsound = new Audio("music/food.mp3");
let snakearr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 10;

function main(ctime) {
  window.requestAnimationFrame(main);
  console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  start();
}
function gpause(){
  musicsound.pause()
  alert("Game Paused!!, press ok to resume");
}
function collide(snake){
  if(snake[0].x>=18||snake[0].y>=18||snake[0].x<=0||snake[0].y<=0){
    return true;
  }
  else {
    return false;
  }
}
function start() {
  musicsound.play();
  // if you bump anywhere
  if(collide(snakearr)==true){
    gameoversound.play();
    musicsound.pause();
    inputDir={x:0,y:0};
    alert("Game Over! Please Try Again");
    snakearr = [{x:13,y:15}];
    musicsound.play();
  }

  // If you have eaten the food, increment the score and regenerate the food
  if(snakearr[0].x==food.x && snakearr[0].y==food.y){
    foodsound.play();
    snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())}
  }

  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  
  
  

  // display of head
  
  board.innerHTML="";
  snakearr.forEach((e, index) => {
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    if(index == 0){
      snakeelement.classList.add("head");
    } 
    else{
      snakeelement.classList.add("snake");
    }
    board.appendChild(snakeelement);
  });




  // display of food



  foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);

  window.requestAnimationFrame(main);
  window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
    }
  });
}
