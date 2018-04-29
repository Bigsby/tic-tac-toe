package org.bigsbyspot.tic_tac_toe

import android.opengl.Matrix

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

    private fun displayOver(completionResult: CompletionResult) {
        display?.displaySimpleMessage("It's over!")
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