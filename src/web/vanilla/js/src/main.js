(function () {
    "use strict";

    let boardTable = document.getElementById("board");
    let textDisplay = document.getElementById("text");
    let CELL_DEFAULT_COLOR = "green";
    let CELL_DEFAULT_BACKGROUND = "transparent";
    let REVERSE_COLOR = "#333";

    let completionTypes = Object.freeze({
        draw: 0,
        row: 1,
        column: 2,
        diagonal: 3
    });

    let xPlayer = {
        letter: "X",
        color: "yellow"
    };
    let oPlayer = {
        letter: "O",
        color: "magenta"
    };
    let currentPlayer;

    function emtpyBoard() {
        return [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    let currentBoard = emtpyBoard();

    function getCell(column, row) {
        return boardTable.querySelector(`tbody tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
    }

    function columnFromNumber(number) {
        return (number - 1) % 3;
    }

    function rowFromNumber(number) {
        return Math.floor((number - 1) / 3);
    }

    function setPlayerAndText() {
        currentPlayer = currentPlayer == xPlayer ? oPlayer : xPlayer;
        textDisplay.innerHTML = `Press or click number to fill in with <span style="color:${currentPlayer.color}">${currentPlayer.letter}</span>`;
    }

    function areThreeEqual(x1, y1, x2, y2, x3, y3) {
        return currentBoard[x1][y1] && currentBoard[x1][y1] == currentBoard[x2][y2] && currentBoard[x2][y2] == currentBoard[x3][y3];
    }

    function isOver() {
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            if (areThreeEqual(0, columnIndex, 1, columnIndex, 2, columnIndex)) {
                return {
                    type: completionTypes.column,
                    sequence: columnIndex,
                    player: currentPlayer
                };
            }
        }

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (areThreeEqual(rowIndex, 0, rowIndex, 1, rowIndex, 2)) {
                return {
                    type: completionTypes.row,
                    sequence: rowIndex,
                    player: currentPlayer
                };
            }
        }

        if (areThreeEqual(0, 0, 1, 1, 2, 2)) {
            return {
                type: completionTypes.diagonal,
                sequence: 0,
                player: currentPlayer
            };
        }

        if (areThreeEqual(2, 0, 1, 1, 0, 2)) {
            return {
                type: completionTypes.diagonal,
                sequence: 1,
                player: currentPlayer
            };
        }

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
                if (!currentBoard[rowIndex][columnIndex]) {
                    return false;
                }
            }
        }

        return {
            type: completionTypes.draw
        };
    }

    function setColorAndBackground(cell, color, background) {
        cell.style.color = color;
        cell.style.background = background;
    }

    function highlightWinner(result) {
        switch (result.type) {
            case completionTypes.row:
                for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
                    setColorAndBackground(getCell(result.sequence, columnIndex), REVERSE_COLOR, currentPlayer.color);
                }
                
                break;
            case completionTypes.column:
                for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                    setColorAndBackground(getCell(rowIndex, result.sequence), REVERSE_COLOR, currentPlayer.color);
                }
                break;
            case completionTypes.diagonal:
                setColorAndBackground(getCell(1, 1), REVERSE_COLOR, currentPlayer.color);
                if (result.sequence == 0) {
                    setColorAndBackground(getCell(0, 0), REVERSE_COLOR, currentPlayer.color);
                    setColorAndBackground(getCell(2, 2), REVERSE_COLOR, currentPlayer.color);
                } else {
                    setColorAndBackground(getCell(2, 0), REVERSE_COLOR, currentPlayer.color);
                    setColorAndBackground(getCell(0, 2), REVERSE_COLOR, currentPlayer.color);
                }
                break;
        }
    }

    function setIsOverText(result) {
        if (result.type == completionTypes.draw) {
            textDisplay.innerHTML = "It's a draw!";
        }
        else {
            textDisplay.innerHTML = `Player <span style="color:${currentPlayer.color}">${currentPlayer.letter}</span> won!`;
            highlightWinner(result);
        }
    }

    function handleClick(number) {
        if (isOver()) {
            return;
        }

        let column = columnFromNumber(number);
        let row = rowFromNumber(number);

        if (currentBoard[column][row]) {
            return;
        }

        let cell = getCell(column, row);
        cell.innerText = currentBoard[column][row] = currentPlayer.letter;
        cell.style.color = currentPlayer.color;

        let isOverResult = isOver();

        if (isOverResult) {
            setIsOverText(isOverResult);
        } else {
            setPlayerAndText();
        }
    }

    function fillInEmptyBoard() {
        for (let number = 1; number <= 9; number++) {
            let column = columnFromNumber(number);
            let row = rowFromNumber(number);
            let cell = getCell(column, row);
            cell.innerText = number;
            setColorAndBackground(cell, CELL_DEFAULT_COLOR, CELL_DEFAULT_BACKGROUND);
            cell.onclick = function () {
                handleClick(number);
            };
        }
    }

    function start() {
        fillInEmptyBoard();
        currentBoard = emtpyBoard();
        currentPlayer = oPlayer;
        setPlayerAndText();
        window.onkeypress = function(event) {
            let keyName = event.key;
            
            if (keyName == "r") {
                start();
                return;
            } 

            if (keyName >= "1" && keyName <= "9") {
                handleClick(keyName);
            }
        }
    }

    document.getElementById("restart").onclick = function () {
        start();
    }

    start();

})();