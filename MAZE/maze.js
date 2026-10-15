const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tilesize = 25;

canvas.height = tilesize*22;
canvas.width = tilesize*22;

const player = {
    x : tilesize,
    y : tilesize,
    radius : tilesize/4,
    prePos: {}
};

let animation;
let rightpressed = false;
let leftpressed = false;
let upressed = false;
let downpressed = false;
const map = [
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1],
    [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1],
    [1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,1],
    [1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1],
    [1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
    [1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1],
    [1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1],
    [1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1]
];

var tiles = [];
for (var i = 0; i<map.length;i++) {
    tiles[i] = [];
    for(var j=0; j<map [i].length;j++) {
        tiles[i][j] = {x:0, y:0, type:""};
    }
};

function drawBoard(){
    ctx.fillStyle = "#03011f";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawMaze(){
    for (var i = 0; i<map.length;i++) {
        for(var j=0; j<map [i].length;j++) {
            let tileX = j*tilesize;
            let tileY = i*tilesize;
            tiles[i][j].x = tileX;
            tiles[i][j].y = tileY;
            if(map[i][j] === 1){
                tiles[i][j].type = "wall";
                drawWall(tileX,tileY);
            }
            else{
                drawEmpty(tileX,tileY)
            }
        }
    }
}

function drawWall(x,y){
    ctx.fillStyle = "#6cacc5";
    ctx.fillRect(x,y,tilesize,tilesize);
}

function drawEmpty(x,y){
    ctx.fillStyle="#30011f";
    ctx.fillRect(x,y,tilesize,tilesize);
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x + tilesize/2, player.y + tilesize/2,player.radius,0,2*Math.PI);
    ctx.fillStyle ="red";
    ctx.fill();
    ctx.closePath();
}

function updatePosition(){
    player.prePos = {x: player.x, y:player.y}
    if (rightpressed){
        player.x += 2;
    }
    if (leftpressed){
        player.x -= 2;
    }
    if (upressed){
        player.y -= 2;
    }
    if (downpressed){
        player.y += 2;
    }
}

function checkCollision(){    
    if(player.x + tilesize> canvas.width){
        console.log("That is where you started");
        player.x = player.prePos.x;
    }
    if(player.y + tilesize>= canvas.height-tilesize){
        console.log("YOU WON!");
        cancelAnimationFrame(animation);
        gameover();
        return;
    }
        for (var i = 0; i<map.length;i++) {
            for(var j=0; j<map [i].length;j++) {
                var b = tiles[i][j];
                if(
                    player.x + tilesize/2 + player.radius> b.x &&
                    player.x + tilesize/2 - player.radius< b.x + tilesize &&
                    player.y + tilesize/2 + player.radius> b.y &&
                    player.y + tilesize/2 - player.radius< b.y + tilesize &&
                    b.type === "wall"
                ) {
                    player.x = player.prePos.x;
                    player.y = player.prePos.y;
            
             }
        }
}   }

function gameover(){
    canvas.style.visibility ="hidden";
    var win = document.querySelector(".win");
    win.style.visibility = "visible";
}

document.addEventListener("keydown",function(e){
    if(e.keyCode === 37){
        leftpressed = true;
    } else if (e.keyCode === 39){
        rightpressed=true;
    }else if (e.keyCode===38){
        upressed=true;
    } else if (e.keyCode===40){
        downpressed=true;
    }
})


document.addEventListener("keyup",function(e){
    if(e.keyCode === 37){
        leftpressed = false;
    } else if (e.keyCode === 39){
        rightpressed=false;
    }else if (e.keyCode===38){
        upressed=false;
    } else if (e.keyCode===40){
        downpressed=false;
    }
})

function update(){
    updatePosition();
    drawBoard();
    drawMaze();

    drawPlayer();
    checkCollision();
    animation = requestAnimationFrame(update);
}

animation = requestAnimationFrame(update);