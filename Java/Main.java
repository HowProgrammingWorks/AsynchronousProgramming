package test;

import java.io.PrintStream;
<<<<<<< HEAD
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
=======
import java.util.concurrent.*;
>>>>>>> 186d848... added examples written in Java

<<<<<<< HEAD
public class Main {

    ExecutorService service;
    JobInitializer initializer;
    private Job readConfig, readFromFile, readFromDb, httpReq;

    public static void main(String[] args) {
        Main test = new Main();
        test.setup();


        test.sequentialExecutionsWithCallbacks();
<<<<<<< HEAD
        // test.asyncCalls();
=======
       // test.asyncCalls();
>>>>>>> 186d848... added examples written in Java
        //test.orderedCalls();
    }

    private void setup() {
        //change implementation of standard output stream.
        PrintStream stream = new CustomPrintStream(System.out);
        System.setOut(stream);
        //initialize jobs
        this.initializer = new JobInitializer();
        this.readConfig = initializer.getReadConfig();
        this.readFromFile = initializer.getReadFromFile();
        this.readFromDb = initializer.getReadFromDb();
        this.httpReq = initializer.getHttpReq();
    }

    //Sequential calls and sequential execution
    private void sequentialExecutionsWithCallbacks() {
        service = new SameThreadExecutorService();
        CallbackTask readConfigTask = new CallbackTask(initializer.getReadConfig(), arg -> System.out.println("Successfully read from config: " + arg));
        CallbackTask readFileTask = new CallbackTask(initializer.getReadFromFile(), arg -> System.out.println("Successfully read from file: " + arg));
        CallbackTask readFromDbTask = new CallbackTask(initializer.getReadFromDb(), arg -> System.out.println("Successfully read from DB: " + arg));
        CallbackTask httpReqTask = new CallbackTask(initializer.getHttpReq(), arg -> System.out.println("Successfully read from URL: " + arg));

        executeAsync(service, readConfigTask);
        executeAsync(service, readFileTask);
        executeAsync(service, readFromDbTask);
        executeAsync(service, httpReqTask);

        System.out.println("End of Main thread in [sequentialExecutionsWithCallbacks].");
        service.shutdown();
    }

    //async calls. Notify when all jobs are done
    private void asyncCalls() {
        service = Executors.newFixedThreadPool(4, r -> {
            Thread t = Executors.defaultThreadFactory().newThread(r);
            t.setDaemon(true);
            return t;
        });
        CountDownLatch latch = new CountDownLatch(4);
        CallbackTask readConfigTask = new CallbackTask(readConfig, arg -> {
            latch.countDown();
            System.out.println("Successfully read from config: " + arg);
        });
        CallbackTask readFileTask = new CallbackTask(readFromFile, arg -> {
            latch.countDown();
            System.out.println("Successfully read from file: " + arg);
        });
        CallbackTask readFromDbTask = new CallbackTask(readFromDb, arg -> {
            latch.countDown();
            System.out.println("Successfully read from DB: " + arg);
        });
        CallbackTask httpReqTask = new CallbackTask(httpReq, arg -> {
            latch.countDown();
            System.out.println("Successfully read from URL: " + arg);
        });
        executeAsync(service, readConfigTask);
        executeAsync(service, readFileTask);
        executeAsync(service, readFromDbTask);
        executeAsync(service, httpReqTask);
        try {
            latch.await();
            service.shutdown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("End of Main thread in [asyncCalls].");
    }

    //Asynchronous calls with jobs rely on results of some previous jobs
    public void orderedCalls() {
        service = Executors.newFixedThreadPool(4, r -> {
            Thread t = Executors.defaultThreadFactory().newThread(r);
            t.setDaemon(true);
            return t;
        });
        CallbackTask httpReqTask = new CallbackTask(httpReq, arg -> System.out.println("Successfully read from URL: " + arg));
        CallbackTask readFromDbTask = new CallbackTask(readFromDb).callback(arg -> {
            System.out.println("Successfully read from DB. It`s time to send req with data we found");
            executeAsync(service, httpReqTask.args(arg));
        });
        CallbackTask readFileTask = new CallbackTask(readFromFile).callback(arg -> {
            System.out.println("Successfully read from file. Init connection with DB");
            executeAsync(service, readFromDbTask.args(arg));
        });

        CallbackTask readConfigTask = new CallbackTask(readConfig).callback(arg -> {
            executeAsync(service, readFileTask.args(arg));
            service.shutdown();
        }).args("Config file");

        executeAsync(service, readConfigTask);
        System.out.println("End of Main thread in [orderedCallsWithFutures].");
    }
=======
import test.job.CallbackTask;
import test.job.Job;
import test.utils.CustomPrintStream;
import test.utils.SameThreadExecutorService;
>>>>>>> 9ca6e68... Changed code style

public class Main {

  ExecutorService service;
  JobInitializer initializer;
  private Job readConfig;
  private Job readFromFile;
  private Job readFromDb;
  private Job httpReq;

  public static void main(String[] args) {
    Main test = new Main();
    test.setup();

    test.sequentialExecutionsWithCallbacks();
    // test.asyncCalls();
    //test.orderedCalls();
  }

  private void setup() {
    //change implementation of standard output stream.
    PrintStream stream = new CustomPrintStream(System.out);
    System.setOut(stream);
    //initialize jobs
    this.initializer = new JobInitializer();
    this.readConfig = initializer.getReadConfig();
    this.readFromFile = initializer.getReadFromFile();
    this.readFromDb = initializer.getReadFromDb();
    this.httpReq = initializer.getHttpReq();
  }

  //Sequential calls and sequential execution
  private void sequentialExecutionsWithCallbacks() {
    service = new SameThreadExecutorService();
    CallbackTask readConfigTask = new CallbackTask(initializer.getReadConfig(),
        arg -> System.out.println("Successfully read from config: " + arg));
    CallbackTask readFileTask = new CallbackTask(initializer.getReadFromFile(),
        arg -> System.out.println("Successfully read from file: " + arg));
    CallbackTask readFromDbTask = new CallbackTask(initializer.getReadFromDb(),
        arg -> System.out.println("Successfully read from DB: " + arg));
    CallbackTask httpReqTask = new CallbackTask(initializer.getHttpReq(),
        arg -> System.out.println("Successfully read from URL: " + arg));

    executeAsync(service, readConfigTask);
    executeAsync(service, readFileTask);
    executeAsync(service, readFromDbTask);
    executeAsync(service, httpReqTask);

    System.out.println("End of Main thread in [sequentialExecutionsWithCallbacks].");
    service.shutdown();
  }

  //async calls. Notify when all jobs are done
  private void asyncCalls() {
    service = Executors.newFixedThreadPool(4, r -> {
      Thread t = Executors.defaultThreadFactory().newThread(r);
      t.setDaemon(true);
      return t;
    });
    CountDownLatch latch = new CountDownLatch(4);
    CallbackTask readConfigTask = new CallbackTask(readConfig, arg -> {
      latch.countDown();
      System.out.println("Successfully read from config: " + arg);
    });
    CallbackTask readFileTask = new CallbackTask(readFromFile, arg -> {
      latch.countDown();
      System.out.println("Successfully read from file: " + arg);
    });
    CallbackTask readFromDbTask = new CallbackTask(readFromDb, arg -> {
      latch.countDown();
      System.out.println("Successfully read from DB: " + arg);
    });
    CallbackTask httpReqTask = new CallbackTask(httpReq, arg -> {
      latch.countDown();
      System.out.println("Successfully read from URL: " + arg);
    });
    executeAsync(service, readConfigTask);
    executeAsync(service, readFileTask);
    executeAsync(service, readFromDbTask);
    executeAsync(service, httpReqTask);
    try {
      latch.await();
      service.shutdown();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    System.out.println("End of Main thread in [asyncCalls].");
  }

  //Asynchronous calls with jobs rely on results of some previous jobs
  public void orderedCalls() {
    service = Executors.newFixedThreadPool(4, r -> {
      Thread t = Executors.defaultThreadFactory().newThread(r);
      t.setDaemon(true);
      return t;
    });
    CallbackTask httpReqTask = new CallbackTask(httpReq,
        arg -> System.out.println("Successfully read from URL: " + arg));
    CallbackTask readFromDbTask = new CallbackTask(readFromDb).callback(arg -> {
      System.out.println("Successfully read from DB. It`s time to send req with data we found");
      executeAsync(service, httpReqTask.args(arg));
    });
    CallbackTask readFileTask = new CallbackTask(readFromFile).callback(arg -> {
      System.out.println("Successfully read from file. Init connection with DB");
      executeAsync(service, readFromDbTask.args(arg));
    });

    CallbackTask readConfigTask = new CallbackTask(readConfig).callback(arg -> {
      executeAsync(service, readFileTask.args(arg));
      service.shutdown();
    }).args("Config file");

    executeAsync(service, readConfigTask);
    System.out.println("End of Main thread in [orderedCallsWithFutures].");
  }

  //wrap job to be executed asynchronously by ExecutorService
  private Future<String> executeAsync(ExecutorService service, CallbackTask<String> func) {
    return service.submit(func);

  }
} 