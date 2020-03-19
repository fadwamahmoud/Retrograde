window.onload = function(){
    //welcome message
storagename = localStorage.getItem("storagename");
document.getElementById("welcome").innerHTML = "Welcome, " + storagename;

//game
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


context.scale(20,20);





const player = {
    position : {
        x:0,
        y:0
    },
    matrix: null,
    score: 0,
} 

const colors = [
    null,
    'red',
    'blue',
    'violet',
    'pink',
    'yellow',
    'green',
    'orange',


];

function playerDrop(){
    if(!flag){
    player.position.y++;
    dropCounter=0;
    if(collide(arena, player)){
        player.position.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0; ///???

    }
    


}

function playerMove(dir){
    player.position.x += dir;
    if(collide(arena, player)){
        player.position.x -= dir;
    }

}


let dropCounter = 0;
let dropInterval = 1000; 
let lastTime = 0; //last time requestanimationframe called update


    document.addEventListener("keydown", event=>{
        if(event.keyCode === 40 && !flag){
    
            playerDrop();
        }
        else if(event.keyCode ===39 && !flag){
            playerMove(1);
        }
        else if(event.keyCode ===37 && !flag){
            playerMove(-1);
        }
        else if(event.keyCode ===81 && !flag){
            playerRotate(-1);
        }
        else if(event.keyCode ===87 && !flag){
            playerRotate(1);
        }
    })







function update(time = 0  && !flag){//initial call for update is 0, time since the page first loaded
    const deltaTime = time - lastTime; //i want to count 1 second starting from when update was called and lasttime it was called
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter>dropInterval){
        playerDrop();
    }
   
    draw();
    requestAnimationFrame(update);
}


function arenaSweep(){ //to count completed rows
    let rowCount = 1;
    outer : for(let y = arena.length -1; y>0 ; y--){
        for(let x = 0; x <arena[y].length;x++){
            //check if any of the rows has zero
            if(arena[y][x] === 0){
                continue outer;
            }

        
        }

        const row = arena.splice(y,1)[0].fill(0); //takes arena row out at index y
        arena.unshift(row); //put it on top of arena
        y++; //offset y

        player.score += rowCount *10;
        rowCount *= 2; //doublescore

    }

}



function draw(){
        
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height);   
    
    drawMatrix(player.matrix, player.position)
    drawMatrix(arena, {x:0, y:0})
}

function drawMatrix(matrix, offset){ //offset for moving pieces functionality
    matrix.forEach((row,y) => { //foreach item , index
        row.forEach((value,x) => {
            if(value!== 0){
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y , 1, 1); //xfor left y for top
            }

        });

        
    });
}

function createPiece(type){
    if(type == 'T'){
        return[
        [0,0,0],//to allow rotation 
        [1,1,1],
        [0,1,0],
        ];
   
    }
    else if(type == 'O'){
        return [
        [2,2],
        [2,2],

        ];
    }
    else if(type == 'L'){
        return[
        [0,3,0],
        [0,3,0],
        [0,3,3],

        ];
        

    }
    else if(type == 'J'){
        return[
        [0,4,0],
        [0,4,0],
        [4,4,0],

        ];
        
    }
    else if(type == 'I'){
        return[
        [0,5,0,0],
        [0,5,0,0],
        [0,5,0,0],
        [0,5,0,0],

        ];
        
    }
    else if(type == 'S'){
        return[
        [0,6,6],
        [6,6,0],
        [0,0,0],

        ];
        
    }
    else if(type == 'Z'){
        return[
        [7,7,0],
        [0,7,7],
        [0,0,0],

        ];
        
    }
}

function playerReset(){
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() |0]);
    player.position.y = 0;
    player.position.x = (arena[0].length / 2 |0) -
     (player.matrix[0].length / 2 |0); //to position piece in the middle
    if(collide(arena,player)){
        arena.forEach(row => row.fill(0)); 
        //if we reset plyer and collide immediately this means game over
        gameOver();
        updateScore();
        
        player.score =0;
        
    }
}

function playerRotate(dir){
    const pos = player.position.x;
    let offset = 1;
    rotate(player.matrix, dir)
    while(collide(arena, player)){ //to move away from walls if rotation occurs
        player.position.x += offset;
        offset = -(offset+ (offset > 0 ? 1 : -1))
        if(offset>player.matrix[0].length){ //we moved too much
            rotate(player.matrix, -dir);
            player.position.x = pos; //reset offset
            return;
        }

    }
}

function rotate(matrix, dir){
    for(let y =0; y< matrix.length; y++){
        for(let x =0; x< y; x++){
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ] //to switch positions

            if(dir>0){
                matrix.forEach(row => row.reverse());
            }
            else{
                matrix.reverse();
            }
        

        }
    }

}

function createMatrix(w,h){
    const matrix = [];
    while(h!==0){
        matrix.push(new Array(w).fill(0));
        h--;

    }
    return matrix;
}

const arena = createMatrix(12,20);

function merge(arena , player){
    player.matrix.forEach((row, y) =>{
        row.forEach((value, x)=>{
            if(value!==0){
                arena[y+player.position.y][x+player.position.x]  = value;
            }
        })
    })
}

function collide(arena, player){
    const m = player.matrix;
    const o = player.position;

    for(let y=0; y<m.length; y++){
        for(let x=0; x<m[y].length; x++){
            if(m[y][x]!==0 && (arena[y+ o.y] && arena[y+ o.y][x + o.x]) !==0){ //if player hits arena or another player
                return true;

            }
        
        }

    }
    return false; //????


}

function updateScore(){
    document.getElementById("scoreboard").innerText = player.score;
}

function gameOver(){
    clearInterval(timer);
        var gameOver = document.createElement("SPAN");
        gameOver.innerHTML = "GAME OVER";
        document.getElementById("gameover").appendChild(gameOver);
        document.getElementsByTagName("span")[0].classList.add("span");
        flag = true;

}

var gameTime = 59;
var flag = false;
var timer =  setInterval(()=>{
        document.getElementById("gametime").innerText = gameTime;
        gameTime--;
    

    if(gameTime<0){
        
        gameOver();
		
    }
} , 1000)
    



playerReset();
updateScore();
update();
timer;
}





