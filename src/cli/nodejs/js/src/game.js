const display = require("./display");
const keyboard = require("./keyboard");

const FG_YELLOW = "33";
const FG_MAGENTA = "35";
const XPlayer = new Player("X", FG_YELLOW);
const OPlayer = new Player("O", FG_MAGENTA);

let currentBoard;

function handleKey(key) {
    var keyPoint = new MatrixPoint(parseInt(key));

    setValue(parseInt(key), currentPlayer.letter, currentPlayer.color);
    currentPlayer = currentPlayer == XPlayer ? OPlayer : XPlayer;
    display.writeMessage(`Press the number to fill in with \x1b[${currentPlayer.color}m ${currentPlayer.letter}`);
}

function setValue(number, value, color) {
    let column = 2 + (((number - 1) % 3) * 4);
    let row = 2 + Math.floor((number - 1) / 3) * 2;

    display.goto(column, row);
    display.setColor(color);
    display.write(value);
    display.setColor(RESET);
}

exports.start = function () {
    currentBoard = new board();
    display.drawEmptyBoard();
    display.writeMessage(`Press the number to fill in with \x1b[${currentPlayer.color}m ${currentPlayer.letter}`);
    keyboard.listen(handleKey);
}

exports.board = class {
    constructor() {
        this.columns = new Array(3);
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            columns[rowIndex] = new Array(3);
        }
    }

    isEmpty(matrixPoint) {
        return !this.column[matrixPoint.column][matrixPoint.row];
    }
}

class Player {
    constructor(letter, color) {
        this.letter = letter;
        this.color = color;
    }
}

class MatrixPoint {
    constructor(number) {
        this.number = number;
    }

    get column() {
        return (this.number - 1) % 3;
    }

    get row() {
        return Math.floor((number - 1) / 3);
    }
}