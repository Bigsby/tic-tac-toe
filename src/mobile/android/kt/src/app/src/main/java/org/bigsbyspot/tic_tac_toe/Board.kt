package org.bigsbyspot.tic_tac_toe

class Board {
    private val values: Array<Array<String?>> = Array(3){ arrayOfNulls<String>(3)}
    private var lastCheck: CompletionResult = CompletionResult.notComplete

    constructor(){

    }

    fun isEmtpy(row: Int, column:Int) = values[row][column] == null

    fun setValue(row: Int, column:Int, value: String){
        values[row][column] = value
    }

    val isOver: Boolean
        get() = lastCheck.isOver

    private fun AreEqual(x1 :Int, y1 :Int, x2 :Int, y2 :Int, x3 :Int, y3 :Int): Boolean {
        return !isEmtpy(y1, x1)
            && values[y1][x1] == values[y2][x2]
            && values[y2][x2] == values[y3][x3]
    }

    private fun validateInternal(): CompletionResult {
        for (rowIndex in 0..2){
            if (AreEqual(0, rowIndex, 1, rowIndex, 2, rowIndex))
                return CompletionResult.row(rowIndex)
        }

        for (columnIndex in 0..2){
            if (AreEqual(columnIndex, 0, columnIndex, 1, columnIndex, 2))
                return CompletionResult.column(columnIndex)
        }

        if (AreEqual(0,0,1,1,2,2))
            return CompletionResult.diagonal(0)

        if (AreEqual(2,0,1,1,0,2))
            return CompletionResult.diagonal(1)

        for (rowIndex in 0..2)
            for(columnIdex in 0..2)
                if (isEmtpy(rowIndex, columnIdex))
                    return CompletionResult.notComplete

        return CompletionResult.draw
    }

    fun validate(): CompletionResult {
        lastCheck = validateInternal()
        return  lastCheck
    }
}