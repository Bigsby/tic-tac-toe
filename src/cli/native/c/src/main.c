 #if __linux__
 #elif _WIN32
 #elif __APPLE__
 #endif


#include <stdio.h>

int main ()
{
  char c;
  puts ("Enter text. Include a dot ('.') in a sentence to exit:");
  do {
    c=getchar();
    //putchar (c);
  } while (c != '.');
  return 0;
}