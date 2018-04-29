package org.bigsbyspot.tic_tac_toe

class CompletionResult private constructor(val type: CompletionType, val sequence: Int){

    val isOver : Boolean
        get() = type != CompletionType.NotComplete

    companion object {
        fun row(sequence: Int): CompletionResult {
            return CompletionResult(CompletionType.Row, sequence)
        }

        fun column(sequence: Int): CompletionResult {
            return CompletionResult(CompletionType.Column, sequence)
        }

        fun diagonal(sequence: Int): CompletionResult {
            return CompletionResult(CompletionType.Diagonal, sequence)
        }

        val draw: CompletionResult
            get() = CompletionResult(CompletionType.Draw, 0)

        val notComplete: CompletionResult
            get() = CompletionResult(CompletionType.NotComplete, 0)
    }
}

enum class CompletionType{
    NotComplete,
    Draw,
    Row,
    Column,
    Diagonal
}