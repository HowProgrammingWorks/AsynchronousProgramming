package test.job;

/**
<<<<<<< HEAD
 * Callable analogue with input arguments
<<<<<<< HEAD
=======
 * Callable analogue with input arguments.
>>>>>>> 9ca6e68... Changed code style
 *
 * @param <T> - return type
 */
public interface Job<T> {
<<<<<<< HEAD
    T processTask(Object... params);
=======
 * @param <T> - return type
 */
public interface Job<T> {
     T processTask(Object... params);
>>>>>>> 186d848... added examples written in Java
=======
  T processTask(Object... params);
>>>>>>> 9ca6e68... Changed code style
}
