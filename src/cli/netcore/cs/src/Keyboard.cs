using System;

namespace TicTacToe
{
    public static class Keyboard
    {
        public static void Listen(Action<ConsoleKey> handler)
        {
            var key = new ConsoleKeyInfo();

            while (key.Key != ConsoleKey.Q)
            {
                key = Console.ReadKey(true);

                if (key.Key == ConsoleKey.R)
                    handler(key.Key);

                var intKey = (int)key.Key;

                if (intKey >= (int)ConsoleKey.D1 && intKey <= (int)ConsoleKey.D9)
                {
                    handler(key.Key);
                }

                if (intKey >= (int)ConsoleKey.NumPad1 && intKey <= (int)ConsoleKey.NumPad9)
                {
                    handler((ConsoleKey)(intKey - 48));
                }
            }
            Environment.Exit(0);
        }
    }
}