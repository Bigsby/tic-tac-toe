using System;

namespace TicTacToe
{
   public static class Display
    {
        private const int END_OF_BOARD = 7;

        private const string ESCAPE = "\x1b[";

        public static void GoTo(int column, int row)
        {
            Console.SetCursorPosition(column, row);
        }

        private static void ClearLine()
        {
            //Console.Write("\r" + new string(' ', Console.WindowWidth) + "\r");
            Console.Write($"{ESCAPE}K");
        }

        public static void WriteMessage(string message)
        {
            GoTo(0, END_OF_BOARD);
            ClearLine();
            GoTo(0, END_OF_BOARD + 1);
            ClearLine();
            Console.Write(message);
            Console.ResetColor();
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
                    Console.WriteLine("-----------");
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.Write("|");
                }
            }

            Console.ResetColor();
        }
    }
}