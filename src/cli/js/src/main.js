const board = require("./board");
const display = require("./display");
const keyboard = require("./keyboard");

const XPlayer = "X";
const OPlayer = "O";

let currentPlayer = XPlayer;

function handleKey(key) {
    board.set(parseInt(key), currentPlayer);
    currentPlayer = currentPlayer == XPlayer ? OPlayer : XPlayer;
}

function start(){
    board.draw();
    
    display.writeMessage("Press the number to fill in with " + currentPlayer);

    keyboard.listen(handleKey);
}



start();