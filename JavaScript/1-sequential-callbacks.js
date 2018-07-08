'use strict';

// Sequential calls and sequentian execution
// of 4 pseudo-asynchronous functions

const readConfig = (name, callback) => {
  setTimeout(() => {
    console.log('(1) config loaded: ' + name);
    callback(null, { name });
  }, 1000);
};

const doQuery = (statement, callback) => {
  setTimeout(() => {
    console.log('(2) SQL query executed: ' + statement);
    callback(null, [{ name: 'Kiev' }, { name: 'Roma' }]);
  }, 1000);
};

const httpGet = (url, callback) => {
  setTimeout(() => {
    console.log('(3) Page retrieved: ' + url);
    callback(null, '<html>Some archaic web here</html>');
  }, 1000);
};

const readFile = (path, callback) => {
  setTimeout(() => {
    console.log('(4) Readme file loaded');
    callback(null, 'file content');
  }, 1000);
};

console.log('start');

readConfig('myConfig', () => {});
doQuery('select * from cities', () => {});
httpGet('http://kpi.ua', () => {});
readFile('README.md', () => {});

console.log('end');
