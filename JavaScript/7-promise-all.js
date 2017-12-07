'use strict';

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig(name) {
  return new Promise(resolve => {
    wrapAsync(() => {
      console.log('(1) config loaded: ' + name);
      resolve({ name });
    });
  });
}

function doQuery(statement) {
  return new Promise(resolve => {
    wrapAsync(() => {
      console.log('(2) SQL query executed: ' + statement);
      resolve([ { name: 'Kiev' }, { name: 'Roma' } ]);
    });
  });
}

function httpGet(url) {
  return new Promise(resolve => {
    wrapAsync(() => {
      console.log('(3) Page retrieved: ' + url);
      resolve('<html>Some archaic web here</html>');
    });
  });
}

function readFile(path) {
  return new Promise(resolve => {
    wrapAsync(() => {
      console.log('(4) Readme file loaded: ' + path);
      resolve('file content');
    });
  });
}

// Usage

Promise.all([
  readConfig('myConfig'),
  doQuery('select * from cities'),
  httpGet('http://kpi.ua'),
  readFile('README.md')
]).then((data) => {
  console.log('Done');
  console.dir({ data });
});
