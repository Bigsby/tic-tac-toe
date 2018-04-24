(function() {
    "use strict";

    let boardTable = document.getElementById("board");
    let textDisplay = document.getElementById("text");

    let xPlayer = {
        letter: "X",
        color: "yellow"
    };
    let oPlayer = {
        letter: "O",
        color: "magenta"
    };
    let currentPlayer = oPlayer;

    let emtpyBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    let currentBoard = emtpyBoard;

    function getCell(column, row) {
        return boardTable.querySelector(`tbody tr:nth-child(${row + 1}) td:nth-child(${column + 1}`);
    }

    function columnFromNumber(number){
        return (number - 1) % 3;
    }

    function rowFromNumber(number){
        return Math.floor((number - 1) / 3);
    }

    function setPlayerAndText() {
        currentPlayer = currentPlayer == xPlayer ? oPlayer : xPlayer;
        textDisplay.innerHTML = `Press the number to fill in with <span style="color:${currentPlayer.color}">${currentPlayer.letter}</span>`;
    }

    function handleClick(number) {
        let column = columnFromNumber(number);
        let row = rowFromNumber(number);

        if (currentBoard[column][row]) {
            return;
        }

        var cell = getCell(column, row);
        cell.innerText = currentBoard[column][row] = currentPlayer.letter;
        cell.style.color = currentPlayer.color;
        
        setPlayerAndText();
    }



    function fillInEmptyBoard() {
        for (let number = 1; number <= 9; number++) {
            let column = columnFromNumber(number);
            let row = rowFromNumber(number);
            let cell = getCell(column, row);
            cell.innerText = number;
            cell.onclick = function() { 
                handleClick(number); 
            };
        }
    }

    function start() {
        fillInEmptyBoard();
        setPlayerAndText();
    }

    document.getElementById("restart").onclick = function(){
        start();
    }

    start();

})();