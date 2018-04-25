using System;

namespace TicTacToe
{
    public class Player
    {

        public Player(char letter, ConsoleColor color)
        {
            Letter = letter;
            Color = color;
        }

        public char Letter { get; }
        public ConsoleColor Color { get; }
    }

    public class Board
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

    public class CompleteResult
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

    public enum CompletionType
    {
        NotFinished,
        Draw,
        Row,
        Column,
        Diagonal
    }
}