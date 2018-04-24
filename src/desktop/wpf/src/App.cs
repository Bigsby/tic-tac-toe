using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Input;
using System.Windows.Markup;
using TicTacToe.ViewModels;


namespace TicTacToe
{
    public class App : Application 
    {
        private static bool _isLoaded;
        [System.STAThreadAttribute()]
        public static void Main()
        {
            var app = new App();
            app.Activated += (s, e) => {
                if (_isLoaded) return;
                
                var window = app.MainWindow;
                window.DataContext = new GameViewModel().Start();

                _isLoaded = true;
            };
            app.StartupUri = new Uri("MainWindow.xaml", UriKind.Relative);
            app.Run();
        }
    }
}