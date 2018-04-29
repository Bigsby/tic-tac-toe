package org.bigsbyspot.tic_tac_toe

import android.content.Context
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private var game: Game? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        game = Game(this)
        game?.start()

        setListeners()
    }

    private fun setListeners() {
        restartButton.setOnClickListener { game?.start() }

        for (childIndex in 0..(boardGrid?.childCount ?: 0)) {
            val textView = boardGrid?.getChildAt(childIndex) as? TextView
            textView?.setOnClickListener { game?.handleClick(childIndex + 1) }
        }
    }

    private fun getResourceColor(id: Int): Int = ContextCompat.getColor(applicationContext, id)

    fun clearBoard() {
        for (childIndex in 0..(boardGrid?.childCount ?: 0)) {
            val number = childIndex + 1
            val textView = boardGrid?.getChildAt(childIndex) as? TextView
            textView?.setTextColor(getResourceColor(R.color.colorDefaultBoardText))
            textView?.text = "${number}"
        }
    }

    fun displayPlayerMessage(prefix: String, player: String, playerColor: Int, sufix: String) {
        var span = SpannableString("$prefix $player $sufix")
        span.setSpan(ForegroundColorSpan(getResourceColor(playerColor)), prefix.length + 1, prefix.length + 3, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
        messageDisplay?.text = span
    }

    fun displaySimpleMessage(message: String){
        messageDisplay?.text = message
    }

    fun setValue(number: Int, value: String, color: Int) {
        val textView = boardGrid?.getChildAt(number - 1) as? TextView
        textView?.text = value
        textView?.setTextColor(getResourceColor(color))
    }
}
