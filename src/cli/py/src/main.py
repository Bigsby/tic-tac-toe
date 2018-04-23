def getchar():
   #Returns a single character from standard input
   
    try:
        import tty, termios, sys
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        tty.setraw(sys.stdin.fileno())
        ch = sys.stdin.read(1)
   finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
   return ch
   
while 1:
    ch = getchar()
    print('You pressed', ch)

# https://github.com/magmax/python-readchar