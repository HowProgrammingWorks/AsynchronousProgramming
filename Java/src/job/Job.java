package job;
/**
 * Callable analogue with input arguments.
 *
 * @param <T> - return type
 */
public interface Job<T> {
  T processTask(Object... params);
}
