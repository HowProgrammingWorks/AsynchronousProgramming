'use strict';

// Run and see random order
// Use global counter to detect finish (bad practice)

let count = 0;

const callbackCheck = () => {
  if (++count === 4) console.log('All done!');
};

// Emulate Asynchronous calls

const wrapAsync = (callback) => setTimeout(
  callback, Math.floor((Math.random() * 1000))
);

// Asynchronous functions

const readConfig = (name, callback) => wrapAsync(() => {
  console.log('(1) config loaded');
  callback(null, { name });
});

const doQuery = (statement, callback) => wrapAsync(() => {
  console.log('(2) SQL query executed: ' + statement);
  callback(null, [{ name: 'Kiev' }, { name: 'Roma' }]);
});

const httpGet = (url, callback) => wrapAsync(() => {
  console.log('(3) Page retrieved: ' + url);
  callback(null, '<html>Some archaic web here</html>');
});

const readFile = (path, callback) => wrapAsync(() => {
  console.log('(4) Readme file loaded');
  callback(null, 'file content');
});

console.log('start');

readConfig('myConfig', callbackCheck);
doQuery('select * from cities', callbackCheck);
httpGet('http://kpi.ua', callbackCheck);
readFile('README.md', callbackCheck);

console.log('end');
