const display = require("./display");
const keyboard = require("./keyboard");
const gameObjects = require("./gameObjects");

const COLOR_YELLOW = "3";
const COLOR_MAGENTA = "5";



const KEY_MESSAGE = `Press 'R' to Restart\nPress 'Q' to Quit`

let currentPlayer;
let currentBoard;

class MatrixPoint {
    constructor(number) {
        this.number = number;
    }

    get column() {
        return (this.number - 1) % 3;
    }

    get row() {
        return Math.floor((this.number - 1) / 3);
    }
}

const XPlayer = new gameObjects.Player("X", COLOR_YELLOW);
const OPlayer = new gameObjects.Player("O", COLOR_MAGENTA);

function setPlayerAndDisplayMessage() {
    currentPlayer = currentPlayer == XPlayer ? OPlayer : XPlayer;
    display.writePlayerMessage("Press the number to fill in with ", currentPlayer.letter, currentPlayer.color);
}

function highlightRow(row) {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        display.writeInPosition(columnIndex, row, currentPlayer.letter, currentPlayer.color, true);
    }
}

function highlightColumn(column) {
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        display.writeInPosition(column, rowIndex, currentPlayer.letter, currentPlayer.color, true);
    }
}

function hightlightDiagonal(diagonal) {
    display.writeInPosition(1, 1, currentPlayer.letter, currentPlayer.color, true);

    if (diagonal == 1) {
        display.writeInPosition(0, 2, currentPlayer.letter, currentPlayer.color, true);
        display.writeInPosition(2, 0, currentPlayer.letter, currentPlayer.color, true);
    } else {
        display.writeInPosition(0, 0, currentPlayer.letter, currentPlayer.color, true);
        display.writeInPosition(2, 2, currentPlayer.letter, currentPlayer.color, true);
    }
}

function displayOver(overResult) {

    switch (overResult.type) {
        case gameObjects.completionTypes.draw:
        display.writePlayerMessage("It's a draw!");    
            return;
        case gameObjects.completionTypes.row:
            highlightRow(overResult.sequence);
            break;
        case gameObjects.completionTypes.column:
            highlightColumn(overResult.sequence);
            break;
        case gameObjects.completionTypes.diagonal:
            hightlightDiagonal(overResult.sequence);
            break;
    }

    display.writePlayerMessage("Player ", currentPlayer.letter, currentPlayer.color, " won!");
}

function handleKey(key) {

    if (key == "r") {
        start();
        return;
    }

    if (currentBoard.isOver()) {
        return;
    }

    var keyPoint = new MatrixPoint(parseInt(key));

    if (!currentBoard.isEmpty(keyPoint)) {
        return;
    }

    setValue(keyPoint, currentPlayer.letter, currentPlayer.color);

    let isOverResult = currentBoard.isOver();

    if (isOverResult) {
        displayOver(isOverResult);
    } else {
        setPlayerAndDisplayMessage();
    }
}

function setValue(matrixPoint, value, color) {
    currentBoard.setValue(matrixPoint, value);

    display.writeInPosition(matrixPoint.column, matrixPoint.row, value, color);
}

function start() {
    currentBoard = new gameObjects.Board();
    currentPlayer = OPlayer;
    display.drawEmptyBoard();
    setPlayerAndDisplayMessage();
    display.writeFooterMessage(KEY_MESSAGE);
    keyboard.listen(handleKey);
}
exports.start = start;