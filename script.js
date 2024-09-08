var runStart = 0;

function startGame() {
    if (runWorkerId == 0) {
        blockWorkerId = setInterval(createBlock, 1000);
        moveBlockWorkerId = setInterval(moveBlock, 100);
        runWorkerId = setInterval(run, 100);
        runSound.play();
        runStart = 1;
        backgroundWorkerId = setInterval(moveBackground, 100);
        scoreWorkerId = setInterval(updateScore, 50);
        document.getElementById("startScreen").classList.add("hidden");
    }
}

//run sound
var runSound = new Audio ("run.mp3");
runSound.loop = true;

//jump sound
var jumpSound = new Audio ("jump.mp3");

//dead sound
var deadSound = new Audio ("dead.mp3");

function keyCheck (event){

//enter key
    if(event.which == 13){

        if (runWorkerId ==0) {

            blockWorkerId = setInterval (createBlock, 1000);
            moveBlockWorkerId = setInterval (moveBlock, 100);
           
            runWorkerId = setInterval(run,100);
            runSound.play();
            runStart = 1;

            backgroundWorkerId = setInterval (moveBackground, 100);
            scoreWorkerId = setInterval (updateScore, 50);
        }



        
    }

    //space key
    if(event.which == 32){
    
        if (runStart == 1){

        if (jumpWorkerId == 0) {
            clearInterval(runWorkerId);
            runSound.pause();
            jumpWorkerId = setInterval(jump,100);
            jumpSound.play();
        }
       } 
    }
}

//Player
var player = document.getElementById("player");

var runImageNumber = 1;
var runWorkerId = 0;

function run() {

    runImageNumber++;

    if(runImageNumber == 9){
      runImageNumber = 1;  
    }


    player.src = "Run ("+ runImageNumber +").png";
}

var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 390;

function jump(){

    jumpImageNumber++;

    //fly
    if(jumpImageNumber <= 7){ //jump imgs 2-7
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";

    }

    //land
    if(jumpImageNumber >= 8){ //jump imgs 8-1
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";

    }

    if(jumpImageNumber == 13){
        jumpImageNumber =1; 
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();
        jumpWorkerId = 0;
      }

    player.src = "Jump (" + jumpImageNumber +").png";

}

//background
var background = document.getElementById("background");

var backgroundX = 0;
var backgroundWorkerId = 0;

//move background
function moveBackground (){

    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";


}

//Score
var score = document.getElementById("score");

var newScore = 0;
var scoreWorkerId = 0;

//Update Score
function updateScore(){

    newScore++;
    score.innerHTML = newScore;
}

var blockWorkerId = 0;
var blockMarginLeft = 700;
var blockId = 1;

function createBlock(){

    var block = document.createElement ("div");
    block.className = "block";

    block.id = "block" + blockId;

    blockId++;
    
    var gap = Math.random() * (1000 - 400) + 400;


    blockMarginLeft = blockMarginLeft + gap;


    block.style.marginLeft = blockMarginLeft + "px";
    background.appendChild (block);

}

//Block Move
        var moveBlockWorkerId = 0;

function moveBlock (){

    for (var i=1; i<= blockId; i++){

        var currentBlock = document.getElementById("block"+ i);
        var currentMarginLeft = currentBlock.style.marginLeft;
     
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
    
        if(newMarginLeft < 157 & newMarginLeft > 57){
            if(playerMarginTop > 330){
                
                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;
                clearInterval(backgroundWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(backgroundWorkerId);
                clearInterval(moveBlockWorkerId);
                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
            }
    }
}

}

//Dead
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead() {

    deadImageNumber++;

if(deadImageNumber == 11){
    deadImageNumber = 10;
    player.style.marginTop = "390px";
    document.getElementById("endScreen").style.visibility = "visible";
    document.getElementById("text2").innerHTML = newScore;
}


    player.src = "Dead ("+deadImageNumber+").png" ;
    
}

function reload() {
    location.reload();
    
}

