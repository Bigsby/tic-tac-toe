const display = require("./display");
const keyboard = require("./keyboard");

const FG_BLACK = "30";
const FG_YELLOW = "33";
const BG_YELLOW = "43";
const FG_MAGENTA = "35";
const BG_MAGENTA = "45";

const completionTypes = Object.freeze({
    draw: 0,
    column: 1,
    row: 2,
    diagonal: 3
});

const KEY_MESSAGE = `
${display.escapeColor(display.RESET)}Press 'R' to Restart
Press 'Q' to Quit`

let currentPlayer;
let currentBoard;

class CompleteResult {
    constructor(type, sequence) {
        this.type = type;
        this.sequence = sequence;
        this.player = currentPlayer;
    }
}

class Board {
    constructor() {
        this.values = new Array(3);
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            this.values[rowIndex] = new Array(3);
        }
    }

    isEmpty(matrixPoint) {
        return !this.values[matrixPoint.row][matrixPoint.column];
    }

    setValue(matrixPoint, value) {
        this.values[matrixPoint.row][matrixPoint.column] = value;
    }

    areThreeEqual(x1, y1, x2, y2, x3, y3) {
        return this.values[x1][y1] && this.values[x1][y1] == this.values[x2][y2] && this.values[x2][y2] == this.values[x3][y3];
    }

    isOver() {
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            if (this.areThreeEqual(0, columnIndex, 1, columnIndex, 2, columnIndex)) {
                return new CompleteResult(completionTypes.column, columnIndex, this.values[0][columnIndex]);
            }
        }

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (this.areThreeEqual(rowIndex, 0, rowIndex, 1, rowIndex, 2)) {
                return new CompleteResult(completionTypes.row, rowIndex, this.values[rowIndex][1]);
            }
        }

        if (this.areThreeEqual(0, 0, 1, 1, 2, 2)) {
            return new CompleteResult(completionTypes.diagonal, 0, this.values[1][1]);
        }

        if (this.areThreeEqual(2, 0, 1, 1, 0, 2)) {
            return new CompleteResult(completionTypes.diagonal, 1, this.values[1][1]);
        }

        let isFull = true;
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
                if (!this.values[rowIndex][columnIndex]) {
                    return false;
                }
            }
        }

        return new CompleteResult(completionTypes.draw);
    }
}

class Player {
    constructor(letter, color, background) {
        this.letter = letter;
        this.color = color;
        this.background = background;
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
        return Math.floor((this.number - 1) / 3);
    }
}

const XPlayer = new Player("X", FG_YELLOW, BG_YELLOW);
const OPlayer = new Player("O", FG_MAGENTA, BG_MAGENTA);

function setPlayerAndDisplayMessage() {
    currentPlayer = currentPlayer == XPlayer ? OPlayer : XPlayer;
    display.writeMessage(`Press the number to fill in with ${display.escapeColor(currentPlayer.color)} ${currentPlayer.letter}
${KEY_MESSAGE}`);
}

function highlightRow(row) {
    let displayRow = rowToDisplayPosition(row);
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        display.writeInPosition(columnToDisplayPosition(columnIndex), displayRow, currentPlayer.letter, FG_BLACK, currentPlayer.background);
    }
}

function highlightColumn(column) {
    let displayColumn = columnToDisplayPosition(column);
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        display.writeInPosition(displayColumn, rowToDisplayPosition(rowIndex), currentPlayer.letter, FG_BLACK, currentPlayer.background);
    }
}

function hightlightDiagonal(diagonal) {
    display.writeInPosition(
        columnToDisplayPosition(1),
        rowToDisplayPosition(1),
        currentPlayer.letter,
        FG_BLACK,
        currentPlayer.background);

    if (diagonal == 1) {
        display.writeInPosition(
            columnToDisplayPosition(0),
            rowToDisplayPosition(2),
            currentPlayer.letter,
            FG_BLACK,
            currentPlayer.background);
        display.writeInPosition(
            columnToDisplayPosition(2),
            rowToDisplayPosition(0),
            currentPlayer.letter,
            FG_BLACK,
            currentPlayer.background);
    } else {
        display.writeInPosition(
            columnToDisplayPosition(0),
            rowToDisplayPosition(0),
            currentPlayer.letter,
            FG_BLACK,
            currentPlayer.background);
        display.writeInPosition(
            columnToDisplayPosition(2),
            rowToDisplayPosition(2),
            currentPlayer.letter,
            FG_BLACK,
            currentPlayer.background);
    }
}

function displayOver(overResult) {

    switch (overResult.type) {
        case completionTypes.draw:
        display.writeMessage(`It's a draw!
${KEY_MESSAGE}`);    
            return;
        case completionTypes.row:
            highlightRow(overResult.sequence);
            break;
        case completionTypes.column:
            highlightColumn(overResult.sequence);
            break;
        case completionTypes.diagonal:
            hightlightDiagonal(overResult.sequence);
            break;
    }

    display.writeMessage(`Player ${display.escapeColor(overResult.player.color)} ${overResult.player.letter} ${display.escapeColor(display.RESET)} won!
${KEY_MESSAGE}`);
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

function columnToDisplayPosition(column) {
    return 2 + (column * 4);

}

function rowToDisplayPosition(row) {
    return 2 + (row * 2);
}

function setValue(matrixPoint, value, color) {
    currentBoard.setValue(matrixPoint, value);
    let displayRow = rowToDisplayPosition(matrixPoint.row);
    let displayColumn = columnToDisplayPosition(matrixPoint.column);

    display.writeInPosition(displayColumn, displayRow, value, color);
}

function start() {
    currentBoard = new Board();
    currentPlayer = OPlayer;
    display.drawEmptyBoard();
    setPlayerAndDisplayMessage();
    keyboard.listen(handleKey);
}
exports.start = start;