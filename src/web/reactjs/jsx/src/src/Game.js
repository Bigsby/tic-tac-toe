export default class Game {
    playerX = new Player("X", "#d3d300");
    playerO = new Player("O", "#d300d3");
    constructor() {
        this.currentPlayer = this.playerO;
        this.start();
    }

    setBoard(board) {
        this.boardDisplay = board;
    }

    setDisplay(display) {
        this.display = display;
    }

    start() {
        this.board = new GameBoard();
    }

    getValue(x, y) {
        return this.board.get(x, y);
    }

    updateCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    }

    handleClick(columnIndex, rowIndex, cell) {
        this.board.set(columnIndex, rowIndex, this.currentPlayer.letter);
        cell.updateValue({
            value: this.currentPlayer.letter,
            color: this.currentPlayer.color
        });
        this.updateCurrentPlayer();
    }
}

const defaultBoardColor = "#00d300";

function emtpyBoard() {
    return [
        [
            {
                value: "1",
                "color": defaultBoardColor
            }, {
                value: "2",
                "color": defaultBoardColor
            }, {
                value: "3",
                "color": defaultBoardColor
            }],
        [
            {
                value: "4",
                "color": defaultBoardColor
            }, {
                value: "5",
                "color": defaultBoardColor
            }, {
                value: "6",
                "color": defaultBoardColor
            }],
        [
            {
                value: "7",
                "color": defaultBoardColor
            }, {
                value: "8",
                "color": defaultBoardColor
            }, {
                value: "9",
                "color": defaultBoardColor
            }]
    ]
};

class Player {
    constructor(letter, color) {
        this._letter = letter;
        this._color = color;
    }

    get color() { return this._color; }
    get letter() { return this._letter; }
}

class GameBoard {
    constructor() {
        this.values = emtpyBoard();
    }

    get(x, y) {
        return this.values[x][y];
    }

    set(x, y, value) {
        this.values[x][y] = value;
    }

    isEmpty(x, y) {
        return !this.values[x][y];
    }

}