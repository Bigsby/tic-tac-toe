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

        private static void HighlightRow(int row)
        {
            for (var columnIndex = 0; columnIndex < 3; columnIndex++)
            {
                Display.SetValue(columnIndex, row, _currentPlayer.Letter, _currentPlayer.Color, true);
            }
        }

        private static void HighlightColumn(int column)
        {
            for (var rowIndex = 0; rowIndex < 3; rowIndex++)
            {
                Display.SetValue(column, rowIndex, _currentPlayer.Letter, _currentPlayer.Color, true);
            }
        }

        private static void HighlightDiagonal(int diagonal)
        {
            Display.SetValue(1, 1, _currentPlayer.Letter, _currentPlayer.Color, true);

            if (diagonal == 0)
            {
                Display.SetValue(0, 0, _currentPlayer.Letter, _currentPlayer.Color, true);
                Display.SetValue(2, 2, _currentPlayer.Letter, _currentPlayer.Color, true);
            }
            else
            {
                Display.SetValue(2, 0, _currentPlayer.Letter, _currentPlayer.Color, true);
                Display.SetValue(0, 2, _currentPlayer.Letter, _currentPlayer.Color, true);
            }
        }

        private static void DisplayWinner(CompleteResult result)
        {
            switch (result.Type)
            {
                case CompletionType.Draw:
                    Display.DisplayOverMessage("It's a draw!", '\0', ConsoleColor.Black, string.Empty);
                    return;
                case CompletionType.Row:
                    HighlightRow(result.Sequence);
                    break;
                case CompletionType.Column:
                    HighlightColumn(result.Sequence);
                    break;
                case CompletionType.Diagonal:
                    HighlightDiagonal(result.Sequence);
                    break;
            }

            Display.DisplayOverMessage("Player ", _currentPlayer.Letter, _currentPlayer.Color, " won!");
        }

        private static void HandleKey(ConsoleKey key)
        {
            if (key == ConsoleKey.R)
            {
                Start();
                return;
            }

            if (_currentBoard.IsOver)
                return;

            var keyPoint = new MatrixPoint((int)key - 48);

            if (!_currentBoard.IsEmpty(keyPoint.Row, keyPoint.Column))
                return;

            _currentBoard[keyPoint.Row, keyPoint.Column] = _currentPlayer.Letter;
            Display.SetValue(keyPoint.Column, keyPoint.Row, _currentPlayer.Letter, _currentPlayer.Color);

            var isOverResult = _currentBoard.Validate();
            if (isOverResult.IsOver)
                DisplayWinner(isOverResult);
            else
                SetPlayerAndDisplayMessage();
        }

        public static void Start()
        {
            _currentBoard = new Board();
            _currentPlayer = OPlayer;

            Display.DrawEmptyBoard();
            SetPlayerAndDisplayMessage();
            Display.DisplayFooter("Presse R to Restart.\nPress Q to Quit.");
            Keyboard.Listen(HandleKey);
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
            private CompleteResult _lastResult;
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

            public bool IsEmpty(int row, int column)
            {
                return _matrix[row, column] == '\0';
            }

            public bool IsOver => _lastResult?.IsOver == true;

            private bool AreEqual(int x1, int y1, int x2, int y2, int x3, int y3)
            {
                if (IsEmpty(y1, x1))
                    return false;

                return
                    this[y1, x1] == this[y2, x2]
                    &&
                    this[y2, x2] == this[y3, x3];
            }

            public CompleteResult Validate()
            {
                for (var columnIndex = 0; columnIndex < 3; columnIndex++)
                {
                    if (AreEqual(columnIndex, 0, columnIndex, 1, columnIndex, 2))
                        return _lastResult = CompleteResult.Column(columnIndex);
                }

                for (var rowIndex = 0; rowIndex < 3; rowIndex++)
                {
                    if (AreEqual(0, rowIndex, 1, rowIndex, 2, rowIndex))
                        return _lastResult = CompleteResult.Row(rowIndex);
                }

                if (AreEqual(0, 0, 1, 1, 2, 2))
                    return _lastResult = CompleteResult.Diagonal(0);

                if (AreEqual(2, 0, 1, 1, 0, 2))
                    return _lastResult = CompleteResult.Diagonal(1);

                for (var rowIndex = 0; rowIndex < 3; rowIndex++)
                {
                    for (var columnIndex = 0; columnIndex < 3; columnIndex++)
                    {
                        if (IsEmpty(rowIndex, columnIndex))
                        {
                            return _lastResult = CompleteResult.NotFinished;
                        }
                    }
                }

                return _lastResult = CompleteResult.Draw;
            }
        }

        private class MatrixPoint
        {
            private readonly int _number;
            public MatrixPoint(int number)
            {
                _number = number;
            }

            public int Column => (_number - 1) % 3;
            public int Row => (int)Math.Floor((decimal)(_number - 1) / 3);
        }

        private class CompleteResult
        {
            private CompleteResult(CompletionType type, int sequence = 0)
            {
                Type = type;
                Sequence = sequence;
            }

            public static CompleteResult Draw => new CompleteResult(CompletionType.Draw);
            public static CompleteResult NotFinished => new CompleteResult(CompletionType.NotFinished);
            public static CompleteResult Row(int sequence) => new CompleteResult(CompletionType.Row, sequence);
            public static CompleteResult Column(int sequence) => new CompleteResult(CompletionType.Column, sequence);
            public static CompleteResult Diagonal(int sequence) => new CompleteResult(CompletionType.Diagonal, sequence);


            public CompletionType Type { get; }
            public int Sequence { get; }

            public bool IsOver => Type != CompletionType.NotFinished;
        }

        private enum CompletionType
        {
            NotFinished,
            Draw,
            Row,
            Column,
            Diagonal
        }
    }
}