package test.utils;

import java.io.OutputStream;
import java.io.PrintStream;

public class CustomPrintStream extends PrintStream {
  public CustomPrintStream(OutputStream out) {
    super(out);
  }

<<<<<<< HEAD
    @Override
    public void println(String x) {
<<<<<<< HEAD
        super.print("[" + Thread.currentThread().getId() + "]");
=======
        super.print("["+Thread.currentThread().getId()+"]");
>>>>>>> 186d848... added examples written in Java
        super.println(x);
    }
=======
  @Override
  public void println(String x) {
    super.print("[" + Thread.currentThread().getId() + "]");
    super.println(x);
  }
>>>>>>> 9ca6e68... Changed code style
}
