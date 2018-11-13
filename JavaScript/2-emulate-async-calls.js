'use strict';

// Run and see random order
// Use global counter to detect finish (bad practice)

const callbackCounter = (count, callback) => {
  let counter = 0;
  const done = () => {
    if (++counter === count) callback();
  };
  return done;
};

// Emulate asynchronous calls

const wrapAsync = fn => (...args) => setTimeout(
  () => fn(...args), Math.floor(Math.random() * 1000)
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

const callback = callbackCounter(4, () => {
  console.log('All done!');
});

readConfig('myConfig', callback);
doQuery('select * from cities', callback);
httpGet('http://kpi.ua', callback);
readFile('README.md', callback);

console.log('end');
