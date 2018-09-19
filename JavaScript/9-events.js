'use strict';

const { EventEmitter } = require('events');
const ee = new EventEmitter();

// Emulate asynchronous calls

const wrapAsync = fn => (...args) => setTimeout(
  () => fn(...args), Math.floor(Math.random() * 1000)
);

// Asynchronous functions

const readConfig = wrapAsync(name => {
  console.log('(1) config loaded');
  ee.emit('config', { name });
});

const doQuery = wrapAsync(statement => {
  console.log('(2) SQL query executed: ' + statement);
  ee.emit('query', [ { name: 'Kiev' }, { name: 'Roma' } ]);
});

const httpGet = wrapAsync(url => {
  console.log('(3) Page retrieved: ' + url);
  ee.emit('page', '<html>Some archaic web here</html>');
});

const readFile = wrapAsync(path => {
  console.log('(4) Readme file loaded: ' + path);
  ee.emit('done', 'file content');
});

// Example

console.log('start');

readConfig('myConfig');
ee.on('config', doQuery.bind(null, 'select * from cities'));
ee.on('query', httpGet.bind(null, 'http://kpi.ua'));
ee.on('page', readFile.bind(null, 'README.md'));
ee.on('done', () => console.log('done'));

console.log('end');
