'use strict';

const { EventEmitter } = require('events');

console.log('start');

const ee = new EventEmitter();

readConfig('myConfig');
ee.on('config', selectFromDb.bind(null, 'select * from cities'));
ee.on('query', getHttpPage.bind(null, 'http://kpi.ua'));
ee.on('page', readFile.bind(null, 'README.md'));
ee.on('done', () => console.log('done'));

console.log('end');

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Functions

function readConfig(name) {
  wrapAsync(() => {
    console.log('(1) config loaded');
    ee.emit('config', { name });
  });
}

function selectFromDb(query) {
  wrapAsync(() => {
    console.log('(2) SQL query executed');
    ee.emit('query', [ { name: 'Kiev' }, { name: 'Roma' } ]);
  });
}

function getHttpPage(url) {
  wrapAsync(() => {
    console.log('(3) Page retrieved');
    ee.emit('page', '<html>Some archaic web here</html>');
  });
}

function readFile(path) {
  wrapAsync(() => {
    console.log('(4) Readme file loaded');
    ee.emit('done', 'file content');
  });
}
