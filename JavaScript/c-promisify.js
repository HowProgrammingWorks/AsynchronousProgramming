'use strict';

// Async function to Promise

const promisify = fn => (...args) => (
  new Promise((resolve, reject) => (
    fn(...args, (err, data) => (
      err ? reject(err) : resolve(data)
    ))
  ))
);

// Usage

const f1 = (par, cb) => cb(null, par);

f1('value', (err, par) => (
  console.log('Async execution:', par)
));

const pf1 = promisify(f1);

pf1('value')
  .then(data => console.log('Promise execution:', data))
  .catch(err => console.error(err));
