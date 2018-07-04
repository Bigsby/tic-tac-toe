import tkinter as tk


class Application(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.configure(bg="#000020")
        self.pack(fill="both")
        self.createWidgets()

    def createWidgets(self):
        self.quitButton = tk.Button(self, text='Quit',
                                    command=self.quit)
        self.quitButton.pack(fill="both", ipady=20)


app = Application()
app.master.title('Sample application')
app.mainloop()
