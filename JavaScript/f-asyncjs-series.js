'use strict';

const async = require('async');

console.log('Parallel array of function');

const arr = [
  callback => callback(null, 'uno'),
  callback => callback(null, 'due'),
  callback => callback(null, 'tre')
];

async.series(
  arr,
  (err, res) => {
    console.dir({ err, res });
  }
);

console.log('Parallel hash of function');

const obj = {
  key1: callback => callback(null, 'uno'),
  key2: callback => callback(new Error('Oh, shit'), 'due'),
  key3: callback => callback(null, 'tre')
};

async.series(
  obj,
  (err, res) => {
    console.dir({ error: err.message, res });
  }
);
