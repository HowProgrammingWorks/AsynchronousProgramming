package utils;

import java.io.OutputStream;
import java.io.PrintStream;

public class CustomPrintStream extends PrintStream {
  public CustomPrintStream(OutputStream out) {
    super(out);
  }

  @Override
  public void println(String x) {
    super.print("[" + Thread.currentThread().getId() + "]");
    super.println(x);
  }

}
