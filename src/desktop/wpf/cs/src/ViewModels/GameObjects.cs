using System;
using System.Windows.Input;
using System.Windows.Media;

namespace TicTacToe.ViewModels
{
    public class CellViewModel : BaseViewModel
    {
        private bool _isSet;
        public bool IsSet => _isSet;

        private readonly GameViewModel _gameViewModel;
        private readonly int _number;
        private char _text;
        private Brush _foreground = DefaultForeground;
        private Brush _background = DefaultBackground;
        private readonly static Brush DefaultForeground = new SolidColorBrush(Color.FromArgb(100, 0, 200, 0));
        private readonly static Brush DefaultBackground = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0));
        public CellViewModel(GameViewModel gameViewModel, int number)
        {
            _gameViewModel = gameViewModel;
            _number = number;
            _text = number.ToString()[0];
        }

        public int Row => (int)Math.Floor((decimal)((_number - 1) / 3));
        public int Column => (_number - 1) % 3;

        public char Text
        {
            get { return _text; }
            set { if (SetProperty(ref _text, value)) _isSet = true; }
        }
        public Brush Foreground
        {
            get { return _foreground; }
            set { SetProperty(ref _foreground, value); }
        }
        public Brush Background
        {
            get { return _background; }
            set { SetProperty(ref _background, value); }
        }
        public ICommand Click => new ActionCommand(() => _gameViewModel.HandleClick(this));

        public void UnSet()
        {
            Text = _number.ToString()[0];
            _isSet = false;
            Foreground = DefaultForeground;
            Background = DefaultBackground;
        }
    }

    public class Board
    {
        private readonly CellViewModel[,] _values = new CellViewModel[3, 3];

        public CellViewModel this[int row, int column]
        {
            get
            {
                return _values[row, column];
            }
            set
            {
                _values[row, column] = value;
            }
        }

        private bool AreEqual(int x1, int y1, int x2, int y2, int x3, int y3)
        {
            return _values[x1, y1].IsSet
                && _values[x1, y1].Text == _values[x2, y2].Text
                && _values[x2, y2].Text == _values[x3, y3].Text;
        }

        public CompleteResult IsComplete()
        {
            for (var rowIndex = 0; rowIndex < 3; rowIndex++)
            {
                if (AreEqual(0, rowIndex, 1, rowIndex, 2, rowIndex))
                    return CompleteResult.Row(rowIndex);
            }

            for (var columnIndex = 0; columnIndex < 3; columnIndex++)
            {
                if (AreEqual(columnIndex, 0, columnIndex, 1, columnIndex, 2))
                    return CompleteResult.Column(columnIndex);
            }

            if (AreEqual(0, 0, 1, 1, 2, 2))
                return CompleteResult.Diagonal(0);

            if (AreEqual(0, 2, 1, 1, 2, 0))
                return CompleteResult.Diagonal(1);

            for (var rowIndex = 0; rowIndex < 3; rowIndex++)
                for (var columnIndex = 0; columnIndex < 3; columnIndex++)
                {
                    if (!_values[columnIndex, rowIndex].IsSet)
                        return CompleteResult.NotComplete;
                }

            return CompleteResult.Draw;
        }
    }

    public class CompleteResult
    {
        private CompleteResult(CompleteType type, int sequence = 0)
        {
            Type = type;
            Sequence = sequence;
        }

        public static CompleteResult Row(int sequence)
        {
            return new CompleteResult(CompleteType.Row, sequence);
        }

        public static CompleteResult Column(int sequence)
        {
            return new CompleteResult(CompleteType.Column, sequence);
        }

        public static CompleteResult Diagonal(int sequence)
        {
            return new CompleteResult(CompleteType.Diagonal, sequence);
        }

        public static CompleteResult Draw => new CompleteResult(CompleteType.Draw);
        public static CompleteResult NotComplete => new CompleteResult(CompleteType.NotComplete);

        public int Sequence { get; }
        public CompleteType Type { get; }
        public bool IsOver => Type != CompleteType.NotComplete;
    }

    public enum CompleteType
    {
        NotComplete,
        Draw,
        Row,
        Column,
        Diagonal
    }

    public class Player
    {
        public Player(char letter, Brush color)
        {
            Letter = letter;
            Color = color;
        }

        public char Letter { get; }
        public Brush Color { get; }
    }
}