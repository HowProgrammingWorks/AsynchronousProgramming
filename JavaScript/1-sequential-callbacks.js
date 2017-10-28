'use strict';

// Sequentian calls and sequentian execution

console.log('start');

readConfig('myConfig', () => {});
doQuery('select * from cities', () => {});
httpGet('http://kpi.ua', () => {});
readFile('README.md', () => {});

console.log('end');

// Pseudo-Asynchronous Functions
// having just callbacks but working synchronously

function readConfig(name, callback) {
  setTimeout(() => {
    console.log('(1) config loaded: ' + name);
    callback({ name });
  }, 1000);
}

function doQuery(statement, callback) {
  setTimeout(() => {
    console.log('(2) SQL query executed: ' + statement);
    callback([ { name: 'Kiev' }, { name: 'Roma' } ]);
  }, 1000);
}

function httpGet(url, callback) {
  setTimeout(() => {
    console.log('(3) Page retrieved: ' + url);
    callback('<html>Some archaic web here</html>');
  }, 1000);
}

function readFile(path, callback) {
  setTimeout(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  }, 1000);
}
