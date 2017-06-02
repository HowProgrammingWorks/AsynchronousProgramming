package job;

import java.util.concurrent.Callable;

/**
 * wrapper around Job interface to make it Callable.
 *
 * @param <T> - return type
 */
public class CallbackTask<T> implements Callable {

  private final Job<T> job;
  private T[] args;
  private Callback callback;

  public CallbackTask(Job<T> job) {
    this.job = job;
  }

  public CallbackTask(Job job, Callback callback) {
    this.job = job;
    this.callback = callback;
  }

  public CallbackTask<T> callback(Callback callback) {
    this.callback = callback;
    return this;
  }

  public CallbackTask<T> args(T... args) {
    this.args = args;
    return this;
  }

  @Override
  public T call() throws Exception {
    T res = null;
    try {
      res = job.processTask(args);
      if (callback != null) {
        callback.complete(res);
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return res;
  }
}
