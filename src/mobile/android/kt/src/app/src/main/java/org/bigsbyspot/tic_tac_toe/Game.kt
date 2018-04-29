package org.bigsbyspot.tic_tac_toe

class Game(display: MainActivity) {
    private val display: MainActivity? = display
    private val playerX = Player("X", R.color.colorPlayerX)
    private val playerO = Player("O", R.color.colorPlayerO)
    private var currentPlayer = playerO
    private var board: Board? = null

    fun start() {
        board = Board()
        display?.clearBoard()
        setPlayerAndDisplayText()
    }

    private fun getNumber(row: Int, column: Int) = (row * 3) + column + 1

    private fun displayRow(sequence: Int) {
        for (columnIndex in 0..2)
            display?.setValue(getNumber(sequence, columnIndex), currentPlayer.letter, currentPlayer.color, true)
    }

    private fun displayColumn(sequence: Int) {
        for (rowIndex in 0..2)
            display?.setValue(getNumber(rowIndex, sequence), currentPlayer.letter, currentPlayer.color, true)
    }

    private fun displayDiagonal(sequence: Int) {
        display?.setValue(getNumber(1, 1), currentPlayer.letter, currentPlayer.color, true)
        if (sequence == 0){
            display?.setValue(getNumber(0, 0), currentPlayer.letter, currentPlayer.color, true)
            display?.setValue(getNumber(2, 2), currentPlayer.letter, currentPlayer.color, true)
        } else {
            display?.setValue(getNumber(0, 2), currentPlayer.letter, currentPlayer.color, true)
            display?.setValue(getNumber(2, 0), currentPlayer.letter, currentPlayer.color, true)
        }
    }

    private fun displayOver(result: CompletionResult) {
        if (result.type == CompletionType.Draw) {
            display?.displaySimpleMessage("It's a draw!")
        } else {
            display?.displayPlayerMessage("Player", currentPlayer.letter, currentPlayer.color, "won!")
        }

        when (result.type) {
            CompletionType.Diagonal -> displayDiagonal(result.sequence)
            CompletionType.Column -> displayColumn(result.sequence)
            CompletionType.Row -> displayRow(result.sequence)
        }

    }

    fun handleClick(number: Int) {
        if (board?.isOver == true) return

        val matrixPoint = MatrixPoint(number)
        if (board?.isEmtpy(matrixPoint.row, matrixPoint.column) == true) {
            board?.setValue(matrixPoint.row, matrixPoint.column, currentPlayer.letter)
            display?.setValue(number, currentPlayer.letter, currentPlayer.color)

            val completionResult = board?.validate() ?: CompletionResult.notComplete

            if (completionResult.isOver)
                displayOver(completionResult)
            else
                setPlayerAndDisplayText()

        }
    }

    fun setPlayerAndDisplayText() {
        currentPlayer = if (currentPlayer == playerO) playerX else playerO
        display?.displayPlayerMessage("Click on number for player", currentPlayer.letter, currentPlayer.color, "")
    }
}