let playerO = "O";
let playerX = "X";
let currplayer = playerO;

//               0  1  2   3  4  5  6  7 8 
let gameBoard = ["","","","","","","","",""];
let gameCells;

let winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

let gameover = false;
let restartButton

window.onload = function() {
    gameCells = document.getElementsByClassName("game-cell");
    for (let cell of gameCells) {
        cell.addEventListener("click",placeCell);
    }
    restartButton = document.getElementById("game-restart-button");
    restartButton.addEventListener("click", restartGame);
}

function placeCell() { 
    if (gameover) {
        return;
    }
    
    const index = parseInt(this.getAttribute("data-cell-index"));
    if (gameBoard[index] != "") {
        return ;
    }

    this.innerText = currplayer;
    gameBoard[index] = currplayer;
    
    // change players
    currplayer = (currplayer == playerO) ? playerX : playerO;

    // check winner
    checkWinner();
}

function checkWinner (){
    for (let wincondition of winningConditions) {
        let a = gameBoard[wincondition[0]];
        let b = gameBoard[wincondition[1]];
        let c= gameBoard[wincondition[2]];

        if (a == b && b == c && a != "") {
            // upadte styling for winingc cells
            for (let i =0; i < gameBoard.length; i++) {
                if (wincondition.includes(i)){
                    gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameover = true;
            return;
        }
    }
}    

function restartGame(){
    gameover = false ;
    gameBoard = ["","","","","","","","",""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell")
    }
}