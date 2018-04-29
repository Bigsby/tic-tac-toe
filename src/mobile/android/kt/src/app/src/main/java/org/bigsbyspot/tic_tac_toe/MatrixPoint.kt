package org.bigsbyspot.tic_tac_toe

import kotlin.math.floor

data class MatrixPoint(val number: Int) {
    var column: Int = 0
        get() = (number - 1) % 3

    var row: Int = 0
        get() = floor((number - 1).toDouble() / 3).toInt()
}