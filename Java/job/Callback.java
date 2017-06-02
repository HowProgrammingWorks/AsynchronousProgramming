package test.job;

/**
<<<<<<< HEAD
 * Callback interface with input data
<<<<<<< HEAD
=======
 * Callback interface with input data.
>>>>>>> 9ca6e68... Changed code style
 *
 * @param <T>
 */
public interface Callback<T> {
<<<<<<< HEAD
    void complete(T object);
=======
 * @param <T>
 */
public interface Callback<T> {
     void complete(T object);
>>>>>>> 186d848... added examples written in Java
    //void wrappedCallback(Callback callback);
=======
  void complete(T object);
>>>>>>> 9ca6e68... Changed code style
}
