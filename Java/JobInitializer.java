package test;

import java.util.Random;
import test.job.Job;


public class JobInitializer {
<<<<<<< HEAD
    final Random random;
    private Job readConfig, readFromFile, readFromDb, httpReq;

    public JobInitializer() {
        this.random = new Random();
        initJobs();
    }

    private int timeToWait() {
        return random.nextInt(2000) + 1000;
    }

    private void initJobs() {
        readConfig = (Job<String>) params -> {
            if (params != null)
                System.out.println("reading config...with param " + params[0]);
            else
                System.out.println("reading config...");
            try {
                Thread.currentThread().sleep(timeToWait());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "some configuration";
        };
        readFromFile = (Job<String>) params -> {
            System.out.println("reading File...");
            try {
                Thread.currentThread().sleep(timeToWait());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "some configuration";
        };
        readFromDb = (Job<String>) params -> {

            System.out.println("accessing db...");
            try {
                Thread.currentThread().sleep(timeToWait());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "100 rows from db";
        };
        httpReq = (Job<String>) params -> {
            if (params != null)
<<<<<<< HEAD
                System.out.println("trying to send request...Data = " + params[0]);
=======
                System.out.println("trying to send request...Data = "+params[0]);
>>>>>>> 186d848... added examples written in Java
            else
                System.out.println("trying to send request...");
            try {
                Thread.currentThread().sleep(timeToWait());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "http://vk.com";
        };
    }


    private String readConfig() {
=======
  final Random random;
  private Job readConfig;
  private Job readFromFile;
  private Job readFromDb;
  private Job httpReq;

  public JobInitializer() {
    this.random = new Random();
    initJobs();
  }

  private int timeToWait() {
    return random.nextInt(2000) + 1000;
  }

  private void initJobs() {
    readConfig = (Job<String>) params -> {
      if (params != null) {
        System.out.println("reading config...with param " + params[0]);
      } else {
>>>>>>> 9ca6e68... Changed code style
        System.out.println("reading config...");
      }
      try {
        Thread.currentThread().sleep(timeToWait());
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "some configuration";
    };
    readFromFile = (Job<String>) params -> {
      System.out.println("reading File...");
      try {
        Thread.currentThread().sleep(timeToWait());
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "some configuration";
    };
    readFromDb = (Job<String>) params -> {
      System.out.println("accessing db...");
      try {
        Thread.currentThread().sleep(timeToWait());
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "100 rows from db";
    };
    httpReq = (Job<String>) params -> {
      if (params != null) {
        System.out.println("trying to send request...Data = " + params[0]);
      } else {
        System.out.println("trying to send request...");
      }
      try {
        Thread.currentThread().sleep(timeToWait());
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "http://vk.com";
    };
  }


  private String readConfig() {
    System.out.println("reading config...");
    try {
      Thread.currentThread().sleep(timeToWait());
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return "some configuration";
  }

  private String readFromFile(String str) {
    System.out.println("reading file." + str + "...");
    try {
      Thread.currentThread().sleep(timeToWait());
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return "file content";
  }


  private String readFromDb(String arg) {
    System.out.println("accessing db." + arg + "...");
    try {
      Thread.currentThread().sleep(timeToWait());
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return "100 rows from db";
  }

  private String httpReq(String str) {
    System.out.println("trying to send request." + str + "...");
    try {
      Thread.currentThread().sleep(timeToWait());
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return "http://vk.com";
  }

  public Job getReadConfig() {
    return readConfig;
  }

  public Job getReadFromFile() {
    return readFromFile;
  }

  public Job getReadFromDb() {
    return readFromDb;
  }

  public Job getHttpReq() {
    return httpReq;
  }
}
