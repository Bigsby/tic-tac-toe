using System;

namespace TicTacToe
{
    public static class Game
    {
        private static readonly Player XPlayer = new Player('X', ConsoleColor.Yellow);
        private static readonly Player OPlayer = new Player('O', ConsoleColor.Magenta);

        private static Player _currentPlayer;
        private static Board _currentBoard;

        private static void SetPlayerAndDisplayMessage()
        {
            _currentPlayer = _currentPlayer == XPlayer ? OPlayer : XPlayer;

            Display.DisplayPlayerMessage("Press the number to fill in with  ", _currentPlayer.Color, _currentPlayer.Letter);
        }

        public static void Start()
        {
            _currentBoard = new Board();
            _currentPlayer = OPlayer;

            Display.DrawEmptyBoard();
            SetPlayerAndDisplayMessage();
        }

        private class Player
        {

            public Player(char letter, ConsoleColor color)
            {
                Letter = letter;
                Color = color;
            }

            public char Letter { get; }
            public ConsoleColor Color { get; }
        }

        private class Board
        {
            private readonly char[,] _matrix = new char[3, 3];

            public char this[int row, int column]
            {
                get
                {
                    return _matrix[row, column];
                }
                set
                {
                    _matrix[row, column] = value;
                }
            }
        }
    }
}