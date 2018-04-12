'use strict';

const async = require('async');

const arr = [1, 2, 3, 4];
const obj = { a: 1, b: 2, c: 3, d: 4 };

console.log('Map array');

async.map(
  arr,
  (item, callback) => {
    console.dir({ item });
    callback(null, item * 2);
  },
  (err, res) => {
    console.dir({ err, res });
  }
);

console.log('Map object');

async.map(
  obj,
  (item, callback) => {
    console.dir({ item });
    if (item === 2) callback(new Error('Oh, shit'), 'value');
    else callback(null, item * 2);
  },
  (err, res) => {
    console.dir({ error: err.message, res });
  }
);
