package job;

/**
 * Callback interface with input data.
 *
 * @param <T>
 */
public interface Callback<T> {
  void complete(T object);
}
