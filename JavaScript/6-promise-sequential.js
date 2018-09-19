'use strict';

// Emulate asynchronous calls

const wrapAsync = callback => setTimeout(
  callback, Math.floor(Math.random() * 1000)
);

const isWeekend = () => !(new Date().getDay() % 6);

// Asynchronous functions

const readConfig = name => new Promise((resolve, reject) => {
  wrapAsync(() => {
    console.log('(1) config loaded');
    if (!isWeekend()) resolve({ name });
    else reject(new Error('Promises will resolve next working day'));
  });
});

const doQuery = statement => new Promise((resolve, reject) => {
  wrapAsync(() => {
    console.log('(2) SQL query executed: ' + statement);
    if (!isWeekend()) resolve([{ name: 'Kiev' }, { name: 'Roma' }]);
    else reject(new Error('Promises will resolve next working day'));
  });
});

const httpGet = url => new Promise((resolve, reject) => {
  wrapAsync(() => {
    console.log('(3) Page retrieved: ' + url);
    if (!isWeekend()) resolve('<html>Some archaic web here</html>');
    else reject(new Error('Promises will resolve next working day'));
  });
});

const readFile = path => new Promise((resolve, reject) => {
  wrapAsync(() => {
    console.log('(4) Readme file loaded: ' + path);
    if (!isWeekend()) resolve('file content');
    else reject(new Error('Promises will resolve next working day'));
  });
});

// Usage

Promise.resolve()
  .then(readConfig.bind(null, 'myConfig'))
  .then(doQuery.bind(null, 'select * from cities'))
  .then(httpGet.bind(null, 'http://kpi.ua'))
  .catch(err => console.log('Reject reason (1): ' + err.message))
  .then(readFile.bind(null, 'README.md'))
  .catch(err => console.log('Reject reason (2): ' + err.message))
  .then(data => {
    console.log('Done');
    console.dir({ data });
  });
