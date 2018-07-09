'use strict';

// Run and see random order
// Use global counter to detect finish (bad practice)

let count = 0;

const callbackCheck = () => {
  if (++count === 4) console.log('All done!');
};

// Emulate asynchronous calls

const wrapAsync = fn => (...args) => setTimeout(
  () => fn(...args), Math.floor((Math.random() * 1000))
);

// Asynchronous functions

const readConfig = wrapAsync((name, callback) => {
  console.log('(1) config loaded');
  callback(null, { name });
});

const doQuery = wrapAsync((statement, callback) => {
  console.log('(2) SQL query executed: ' + statement);
  callback(null, [{ name: 'Kiev' }, { name: 'Roma' }]);
});

const httpGet = wrapAsync((url, callback) => {
  console.log('(3) Page retrieved: ' + url);
  callback(null, '<html>Some archaic web here</html>');
});

const readFile = wrapAsync((path, callback) => {
  console.log('(4) Readme file loaded');
  callback(null, 'file content');
});

console.log('start');

readConfig('myConfig', callbackCheck);
doQuery('select * from cities', callbackCheck);
httpGet('http://kpi.ua', callbackCheck);
readFile('README.md', callbackCheck);

console.log('end');
