package test.job;

import java.util.concurrent.Callable;

/**
<<<<<<< HEAD
 * wrapper around Job interface to make it Callable
<<<<<<< HEAD
=======
 * wrapper around Job interface to make it Callable.
>>>>>>> 9ca6e68... Changed code style
 *
=======
>>>>>>> 186d848... added examples written in Java
 * @param <T> - return type
 */
public class CallbackTask<T> implements Callable {

<<<<<<< HEAD
    private Job<T> job;
    private T[] args;
    private Callback callback;

    public CallbackTask(Job<T> job) {
        this.job = job;
    }

    public CallbackTask(Job job, Callback callback) {
        this.job = job;
        this.callback = callback;
    }

<<<<<<< HEAD
    public CallbackTask<T> callback(Callback callback) {
        this.callback = callback;
        return this;
    }

    public CallbackTask<T> args(T... args) {
        this.args = args;
=======
    public CallbackTask<T> callback(Callback callback){
        this.callback=callback;
        return this;
    }
    public CallbackTask<T> args(T... args){
        this.args=args;
>>>>>>> 186d848... added examples written in Java
        return this;
    }

    @Override
    public T call() throws Exception {
        T res = null;
        try {
            res = job.processTask(args);
            if (callback != null) callback.complete(res);
<<<<<<< HEAD
        } catch (Exception ex) {
=======
        }catch (Exception ex){
>>>>>>> 186d848... added examples written in Java
            ex.printStackTrace();
        }
        return res;
=======
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
>>>>>>> 9ca6e68... Changed code style
    }
    return res;
  }
}
