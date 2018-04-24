using System;
using System.Linq;
using System.Windows.Input;
using System.Windows.Media;

namespace TicTacToe.ViewModels
{
    public class GameViewModel : BaseViewModel
    {
        private Board _currentBoard;
        private Player _currentPlayer;

        private static readonly Player XPlayer = new Player('X', Brushes.Yellow);
        private static readonly Player OPlayer = new Player('O', Brushes.Magenta);
        private static Brush WinnerForeground = new SolidColorBrush(Color.FromRgb(50, 50, 50));

        public GameViewModel()
        {
            _currentBoard = new Board();
            for (var number = 1; number <= 9; number++)
            {
                var cellViewModel = new CellViewModel(this, number);
                Cells[number - 1] = cellViewModel;
                _currentBoard[cellViewModel.Row, cellViewModel.Column] = cellViewModel;
            }
            _currentPlayer = OPlayer;
        }

        private void SetPlayerAndText()
        {
            _currentPlayer = _currentPlayer == XPlayer ? OPlayer : XPlayer;
            PrefixText = $"Time for player ";
            PlayerText = _currentPlayer.Letter.ToString();
            PlayerColor = _currentPlayer.Color;
            SufixText = "";
        }

        public GameViewModel Start()
        {
            foreach (var cell in _cells)
            {
                cell.UnSet();
            }

            SetPlayerAndText();
            return this;
        }

        private void HighlightWinner(CompleteResult result)
        {
            switch (result.Type)
            {
                case CompleteType.Column:
                    _currentBoard[result.Sequence, 0].Background
                    = _currentBoard[result.Sequence, 1].Background
                    = _currentBoard[result.Sequence, 2].Background
                    = CurrentPlayer.Color;
                    _currentBoard[result.Sequence, 0].Foreground
                    = _currentBoard[result.Sequence, 1].Foreground
                    = _currentBoard[result.Sequence, 2].Foreground
                    = WinnerForeground;
                    break;
                case CompleteType.Row:
                    _currentBoard[0, result.Sequence].Background
                        = _currentBoard[1, result.Sequence].Background
                        = _currentBoard[2, result.Sequence].Background
                        = CurrentPlayer.Color;
                    _currentBoard[0, result.Sequence].Foreground
                    = _currentBoard[1, result.Sequence].Foreground
                    = _currentBoard[2, result.Sequence].Foreground
                    = WinnerForeground;
                    break;
                case CompleteType.Diagonal:
                    _currentBoard[1, 1].Foreground = WinnerForeground;
                    _currentBoard[1, 1].Background = CurrentPlayer.Color;

                    if (result.Sequence == 0)
                    {
                        _currentBoard[0, 0].Background
                        = _currentBoard[2, 2].Background = CurrentPlayer.Color;
                        _currentBoard[0, 0].Foreground
                        = _currentBoard[2, 2].Foreground = WinnerForeground;
                    }
                    else
                    {
                        _currentBoard[2, 0].Background
                        = _currentBoard[0, 2].Background = CurrentPlayer.Color;
                        _currentBoard[2, 0].Foreground
                        = _currentBoard[0, 2].Foreground = WinnerForeground;
                    }
                    break;
            }
        }

        internal void HandleClick(CellViewModel cellViewModel)
        {
            var completeResult = _currentBoard.IsComplete();

            if (completeResult.IsOver) return;

            if (cellViewModel.IsSet) return;
            cellViewModel.Text = CurrentPlayer.Letter;
            cellViewModel.Foreground = CurrentPlayer.Color;

            completeResult = _currentBoard.IsComplete();

            if (completeResult.IsOver)
            {
                if (completeResult.Type == CompleteType.Draw)
                {
                    PrefixText = "It's a draw!";
                    PlayerText = "";
                    SufixText = "";
                }
                else
                {
                    PrefixText = "Player ";
                    PlayerText = CurrentPlayer.Letter.ToString();
                    PlayerColor = CurrentPlayer.Color;
                    SufixText = " won!";
                }
                HighlightWinner(completeResult);
            }
            else
            {
                SetPlayerAndText();
            }
        }

        public Player CurrentPlayer
        {
            get { return _currentPlayer; }
            set { SetProperty(ref _currentPlayer, value); }
        }

        private string _prefixText;
        public string PrefixText
        {
            get { return _prefixText; }
            set { SetProperty(ref _prefixText, value); }
        }

        private string _playerText;
        public string PlayerText
        {
            get { return _playerText; }
            set { SetProperty(ref _playerText, value); }
        }

        private Brush _playerColor;
        public Brush PlayerColor
        {
            get { return _playerColor; }
            set { SetProperty(ref _playerColor, value); }
        }

        private string _sufixText;
        public string SufixText
        {
            get { return _sufixText; }
            set { SetProperty(ref _sufixText, value); }
        }

        private CellViewModel[] _cells = new CellViewModel[9];

        public CellViewModel[] Cells => _cells;

        public ICommand Quit => new ActionCommand(() => Environment.Exit(0));
        public ICommand Restart => new ActionCommand(() => Start());
    }

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

        public CompleteResult IsComplete()
        {
            for (var rowIndex = 0; rowIndex < 3; rowIndex++)
            {
                if (_values[0, rowIndex].IsSet
                    && _values[1, rowIndex].IsSet
                    && _values[2, rowIndex].IsSet
                    && _values[0, rowIndex].Text == _values[1, rowIndex].Text
                    && _values[1, rowIndex].Text == _values[2, rowIndex].Text)
                    return CompleteResult.Row(rowIndex);
            }

            for (var columnIndex = 0; columnIndex < 3; columnIndex++)
            {
                if (_values[columnIndex, 0].IsSet
                    && _values[columnIndex, 1].IsSet
                    && _values[columnIndex, 2].IsSet
                    && _values[columnIndex, 0].Text == _values[columnIndex, 1].Text
                    && _values[columnIndex, 1].Text == _values[columnIndex, 2].Text)
                    return CompleteResult.Column(columnIndex);
            }

            if (_values[0, 0].IsSet
                && _values[1, 1].IsSet
                && _values[2, 2].IsSet
                && _values[0, 0].Text == _values[1, 1].Text
                && _values[1, 1].Text == _values[2, 2].Text)
                return CompleteResult.Diagonal(0);

            if (_values[0, 2].IsSet
                && _values[1, 1].IsSet
                && _values[2, 0].IsSet
                && _values[0, 2].Text == _values[1, 1].Text
                && _values[1, 1].Text == _values[2, 0].Text)
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