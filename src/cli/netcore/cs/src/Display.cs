using System;

namespace TicTacToe
{
   public static class Display
    {
        private const int END_OF_BOARD = 7;

        private const string ESCAPE = "\x1b[";
        private static ConsoleColor DefaultBackground = Console.BackgroundColor;

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
            Console.ForegroundColor = ConsoleColor.White;
            Console.BackgroundColor = DefaultBackground;
        }

        public static void DrawEmptyBoard()
        {
            Console.Clear();
            Console.CursorVisible = false;
            Console.WriteLine();

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
                    Console.WriteLine("───┼───┼───");
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
    }
}