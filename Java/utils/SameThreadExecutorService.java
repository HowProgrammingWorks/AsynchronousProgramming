package test.utils;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.AbstractExecutorService;
import java.util.concurrent.TimeUnit;

public class SameThreadExecutorService extends AbstractExecutorService {

<<<<<<< HEAD
    //volatile because can be viewed by other threads
    private volatile boolean terminated;

    @Override
    public void shutdown() {
        terminated = true;
    }

    @Override
    public boolean isShutdown() {
        return terminated;
    }

    @Override
    public boolean isTerminated() {
        return terminated;
    }


<<<<<<< HEAD
=======

>>>>>>> 186d848... added examples written in Java
    @Override
    public boolean awaitTermination(long theTimeout, TimeUnit theUnit) throws InterruptedException {
        shutdown();
        return terminated;
    }

    @Override
    public List<Runnable> shutdownNow() {
        return Collections.emptyList();
    }

    @Override
    public void execute(Runnable theCommand) {
        theCommand.run();
    }
=======
  //volatile because can be viewed by other threads
  private volatile boolean terminated;

  @Override
  public void shutdown() {
    terminated = true;
  }

  @Override
  public boolean isShutdown() {
    return terminated;
  }

  @Override
  public boolean isTerminated() {
    return terminated;
  }

  @Override
  public boolean awaitTermination(long theTimeout, TimeUnit theUnit) throws InterruptedException {
    shutdown();
    return terminated;
  }

  @Override
  public List<Runnable> shutdownNow() {
    return Collections.emptyList();
  }

  @Override
  public void execute(Runnable theCommand) {
    theCommand.run();
  }
>>>>>>> 9ca6e68... Changed code style
}