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
}