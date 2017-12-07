'use strict';

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig(name) {
  return new Promise((resolve, reject) => {
    wrapAsync(() => {
      console.log('(1) config loaded');
      resolve({ name });
      // reject(new Error('Promise fails'));
    });
  });
}

function doQuery(statement) {
  return new Promise((resolve, reject) => {
    wrapAsync(() => {
      console.log('(2) SQL query executed: ' + statement);
      resolve([ { name: 'Kiev' }, { name: 'Roma' } ]);
    });
  });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    wrapAsync(() => {
      console.log('(3) Page retrieved: ' + url);
      resolve('<html>Some archaic web here</html>');
    });
  });
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    wrapAsync(() => {
      console.log('(4) Readme file loaded: ' + path);
      resolve('file content');
    });
  });
}

// Usage

Promise.resolve()
  .then(readConfig.bind(null, 'myConfig'))
  .then(doQuery.bind(null, 'select * from cities'))
  .then(httpGet.bind(null, 'http://kpi.ua'))
  .catch((err) => console.log('Reject reason (1): ' + err.message))
  .then(readFile.bind(null, 'README.md'))
  .catch((err) => console.log('Reject reason (2): ' + err.message))
  .then((data) => {
    console.log('Done');
    console.dir({ data });
  });
