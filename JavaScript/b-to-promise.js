'use strict';

// Sync function to async

const promise = fn => (...args) => (
  new Promise(resolve => resolve(fn(...args)))
);

// Asynchronous functions

const f1 = par => par;
const f2 = par => par;
const f3 = par => par;
const f4 = par => par;

console.log(f4(f3(f2(f1('value')))));

// Usage:

const pf1 = promise(f1);
const pf2 = promise(f2);
const pf3 = promise(f3);
const pf4 = promise(f4);

Promise.resolve()
  .then(pf1.bind(null, 'value'))
  .then(pf2())
  .then(pf3())
  .then(pf4())
  .then((data) => {
    console.log(data);
  });
