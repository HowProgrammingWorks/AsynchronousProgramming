'use strict';

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig(name) {
  return new Promise(function(resolve, reject) {
    wrapAsync(() => {
      console.log('(1) config loaded');
      resolve({ name });
    });
  });
}

function selectFromDb(query) {
  return new Promise(function(resolve, reject) {
    wrapAsync(() => {
      console.log('(2) SQL query executed');
      resolve([ { name: 'Kiev' }, { name: 'Roma' } ]);
    });
  });
}

function getHttpPage(url) {
  return new Promise(function(resolve, reject) {
    wrapAsync(() => {
      console.log('(3) Page retrieved');
      resolve('<html>Some archaic web here</html>');
    });
  });
}

function readFile(path) {
  return new Promise(function(resolve, reject) {
    wrapAsync(() => {
      console.log('(4) Readme file loaded');
      resolve('file content');
    });
  });
}

// Usage:

Promise.all([
  readConfig('myConfig'),
  selectFromDb('select * from cities'),
  getHttpPage('http://kpi.ua'),
  readFile('README.md')
]).then((data) => {
  console.log('Done');
  console.dir({ data });
});
