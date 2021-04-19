//ADD 2 or 1 player game and alternating ball release
window.onload=function() {
    info();
    player1score= 0;
    player2score= 0;
    canv= document.getElementById("game");
    display=canv.getContext("2d"); //creation of a CanvasRenderingContext2D object
    document.addEventListener("keydown", keyPush); //when key is pressed, change variables accordingly
    document.addEventListener("keyup", keyUp); //when key is released, set velocity to 0.
    state = setInterval(game,1000/25); 
    document.getElementById("score1").innerHTML = `${player1score}`;
    document.getElementById("score2").innerHTML = `${player2score}`;
}
function playagain() {
    endgame();
    info();
    player1score= 0;
    player2score= 0;
    document.getElementById("score1").innerHTML = `${player1score}`;
    document.getElementById("score2").innerHTML = `${player2score}`;
    state = setInterval(game,1000/25);
}
function continuegame(){
    endgame();
    state = setInterval(game,1000/25);
}
function endgame() {
    document.getElementById("score1").innerHTML = `${player1score}`;
    document.getElementById("score2").innerHTML = `${player2score}`;
    clearInterval(state);
}
function info(){
    pixelsize = 5;
    col = 2*60;
    row = 2*40;
    playerheight = 2*4

    //the one on the left
    player1Col = 2*54;

    //the one on the right
    player2Col = 2*6;

    //S = start, E= end
    playery1S = 2*18;
    playery1E = 2*22;
    playery2S = 2*18;
    playery2E = 2*22;

    //players' velocity
    direction1y = 0;
    direction2y = 2;

    ballx = ((col/2)-1);
    bally = ((row/2)-1);
    ballvelx = 1;
    ballvely = 2;
    
}
function game() {
    //player
    playery1S+=direction1y;
    playery1E+=direction1y;

    //AI, will change velocity according to location of ball
    if (playery2S <= bally){
        playery2S+=direction2y;
        playery2E+=direction2y;
    }
    if( playery2S > bally){
        playery2S-=direction2y;
        playery2E-=direction2y;
    }

    //ball
    ballx+=ballvelx;
    bally+=ballvely;

    //Cant pass walls (stops both players at wall)
    if (playery1E > row-1){
        playery1S= row-8;
        playery1E= row;
    }
    if (playery1S < 0){
        playery1S=0;
        playery1E=8;
    }
    if (playery2E > row){
        playery2S= row-8;
        playery2E= row;
    }
    if (playery2S < 0){
        playery2S=0;
        playery2E=8;
    }

    //changes ball direction when hit player
    if (bally >= playery1S-1 && bally < (playery1E+1)-6 && ballx == player1Col){
        ballvelx= -1*2; //hit top of player 1
        ballvely= -1*2;
    }
    else if (bally >= (playery1E+1)-6 && bally < (playery1E+1)-4 && ballx == player1Col){
        ballvelx= -1*4; //hit middle of player1
        ballvely= 0;
    }
    else if (bally >= (playery1E+1)-4 && bally < playery1E+2 && ballx == player1Col){
        ballvelx= -1*2; //hit bottom of player 1
        ballvely= 1*2;
    }
    if (bally >= playery2S-1 && bally < (playery2E+1)-6 && ballx == player2Col){
        ballvelx= 1*2; //hit top of player 2
        ballvely= -1*2;
    }
    else if (bally >= (playery2E+1)-6 && bally < (playery2E+1)-4 && ballx == player2Col){
        ballvelx= 1*4; //hit middle of player2
        ballvely= 0;
    }
    else if (bally >= (playery2E+1)-4 && bally < (playery2E+2) && ballx == player2Col){
        ballvelx= 1*2; //hit top of player 2
        ballvely= 1*2;
    }

    //ball hits wall
    if (bally < 0){
        ballvely= 1*2; //(currently unbeatable) make it 1*4 so AI is beatable
    }
    if (bally > row-1){
        ballvely= -1*2;  //make it 1*4 so AI is beatable
    }

    if (ballx > col-1){
        // player2 wins
        player2score+=1;
        if (player2score < 5){
            ballx = ((col/2)-1);
            bally = ((row/2)-1);
            ballvelx = -1;
            ballvely = -2;
            continuegame();
        }
        else{
            endgame();
        }
    }
    if (ballx < 0){
        // player1 wins
        player1score+=1;
        if (player1score < 5){
            ballx = ((col/2)-1);
            bally = ((row/2)-1);
            ballvelx = 1;
            ballvely = 2;
            continuegame();
        }
        else{
            endgame(); 
        }

    }

    //render display
    display.fillStyle="black"; 
    display.fillRect(0,0,canv.width,canv.height); 
    //render divider in the middle
    display.fillStyle="white";
    for(var i=0; i<row; i++){
        display.fillRect(((col/2)-1)*pixelsize,i*pixelsize,pixelsize,pixelsize); 
        i+=2;
    }
    //render player1 position
    display.fillStyle="white";
    for(var i=playery1S; i<playery1E; i++){
        display.fillRect(player1Col*pixelsize,i*pixelsize,pixelsize,pixelsize);
    }
    //render player2 position
    for(var i=playery2S; i<playery2E; i++){
        display.fillRect(player2Col*pixelsize,i*pixelsize,pixelsize,pixelsize);
    }
    //render ball
    display.fillRect(ballx*pixelsize,bally*pixelsize,pixelsize,pixelsize);


}
function keyUp(){
    direction1y = 0;
}
function keyPush(evt){
    //cant have a velocity faster than 6 for player1
    if (Math.abs(direction1y) < 6){
        switch(evt.keyCode) {
            //down or s
            case 38:
                direction1y+=-2;
                break;
            case 87:
                direction1y+=-2;
                break;
            //up or w
            case 40:
                direction1y+=2;
                break;
            case 83:
                direction1y+=2;
                break;
        }
    }
}