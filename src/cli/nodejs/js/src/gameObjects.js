exports.Player = class Player {
    constructor(letter, color) {
        this.letter = letter;
        this.color = color;
    }
}

exports.Board = class Board {
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

class CompleteResult {
    constructor(type, sequence) {
        this.type = type;
        this.sequence = sequence;
    }
}
exports.CompleteResult = CompleteResult;

const completionTypes = Object.freeze({
    draw: 0,
    column: 1,
    row: 2,
    diagonal: 3
});
exports.completionTypes = completionTypes;