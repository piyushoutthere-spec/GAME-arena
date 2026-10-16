function opgame(gamePath){
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    let gameFrame = document.getElementById("gameFrame");
    gameFrame.src = gamePath;

    gameFrame.onload = function(){
        gameFrame.contentWindow.focus();
    };
}

function baTmenu() {
    document.getElementById("gameFrame").src = "about:blank";
    document.getElementById("game").style.display = "none";
    document.getElementById("menu").style.display = "block";
}