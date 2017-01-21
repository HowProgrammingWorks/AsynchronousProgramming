'use strict';

// Run and see random order

let count = 0;

readConfig('myConfig', callbackCheck);
selectFromDb('select * from cities', callbackCheck);
getHttpPage('http://kpi.ua', callbackCheck);
readFile('README.md', callbackCheck);

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

function selectFromDb(query, callback) {
  wrapAsync(() => {
    console.log('(2) SQL query executed');
    callback([ { name: 'Kiev' }, { name: 'Roma' } ]);
  });
}

function getHttpPage(url, callback) {
  wrapAsync(() => {
    console.log('(3) Page retrieved');
    callback('<html>Some archaic web here</html>');
  });
}

function readFile(path, callback) {
  wrapAsync(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  });
}
