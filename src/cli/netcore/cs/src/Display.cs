using System;

namespace TicTacToe
{
    public static class Display
    {
        static Display()
        {
            Console.CursorVisible = false;
        }

        private const int END_OF_BOARD = 7;

        private const string ESCAPE = "\x1b[";
        private static ConsoleColor DefaultBackground = Console.BackgroundColor;
        private static ConsoleColor DefaultForeground = Console.ForegroundColor;

        public static void GoTo(int column, int row)
        {
            Console.SetCursorPosition(column, row);
        }

        private static void ClearLine()
        {
            int currentLineCursor = Console.CursorTop;
            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write(new string(' ', Console.WindowWidth));
            Console.SetCursorPosition(0, currentLineCursor);
        }

        private static void ResetColor()
        {
            Console.ForegroundColor = DefaultForeground;
            Console.BackgroundColor = DefaultBackground;
        }

        private static int OffsetRow(int row)
        {
            return 1 + (row * 2);
        }

        private static int OffsetColumn(int column)
        {
            return 2 + (column * 4);
        }

        public static void SetValue(int column, int row, char value, ConsoleColor color, bool isInverted = false)
        {
            GoTo(OffsetColumn(column), OffsetRow(row));
            if (isInverted)
            {
                Console.ForegroundColor = ConsoleColor.Black;
                Console.BackgroundColor = color;
            }
            else
            {
                Console.ForegroundColor = color;
            }

            Console.Write(value);
            ResetColor();
        }

        public static void DisplayOverMessage(string prefixText, char player, ConsoleColor color, string sufixText)
        {
            GoTo(0, END_OF_BOARD + 1);
            ClearLine();
            Console.Write(prefixText);
            if (player != '\0')
            {
                Console.ForegroundColor = color;
                Console.Write(player);
                ResetColor();
                Console.Write(sufixText);
            }

        }

        public static void DrawEmptyBoard()
        {
            Console.Clear();
            Console.WriteLine();

            Console.Write(" ");
            for (int number = 1; number <= 9; number++)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.Write($" {number} ");

                if (number == 9)
                    return;

                if (number % 3 == 0)
                {
                    Console.WriteLine();
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine(" ───┼───┼───");
                    Console.Write(" ");
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.Write("│");
                }
            }

            ResetColor();
        }

        public static void DisplayPlayerMessage(string message, ConsoleColor playerColor, char playerChar)
        {
            ResetColor();
            GoTo(0, END_OF_BOARD);
            ClearLine();
            GoTo(0, END_OF_BOARD + 1);
            ClearLine();
            Console.Write(message);
            Console.ForegroundColor = playerColor;
            Console.Write(playerChar);
            ResetColor();
        }

        public static void DisplayFooter(string message)
        {
            GoTo(0, END_OF_BOARD + 3);
            Console.Write(message);
        }
    }
}