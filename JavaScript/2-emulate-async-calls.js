'use strict';

// Run and see random order

let count = 0;

console.log('start');

readConfig('myConfig', callbackCheck);
doQuery('select * from cities', callbackCheck);
httpGet('http://kpi.ua', callbackCheck);
readFile('README.md', callbackCheck);

console.log('end');

function callbackCheck() {
  if (++count === 4) {
    console.log('All done!');
  }
}

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig(name, callback) {
  wrapAsync(() => {
    console.log('(1) config loaded');
    callback({ name });
  });
}

function doQuery(statement, callback) {
  wrapAsync(() => {
    console.log('(2) SQL query executed: ' + statement);
    callback([ { name: 'Kiev' }, { name: 'Roma' } ]);
  });
}

function httpGet(url, callback) {
  wrapAsync(() => {
    console.log('(3) Page retrieved: ' + url);
    callback('<html>Some archaic web here</html>');
  });
}

function readFile(path, callback) {
  wrapAsync(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  });
}
