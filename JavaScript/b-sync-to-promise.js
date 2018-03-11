'use strict';

// Sync function to Promise

const promisifySync = fn => (...args) => (
  new Promise((resolve, reject) => {
    const result = fn(...args);
    if (result instanceof Error) reject(result);
    else resolve(result);
  })
);

// Usage

const f1 = par => par;

console.log('Sync execution:', f1('value'));

const pf1 = promisifySync(f1);

pf1('value')
  .then(data => console.log('Promise execution:', data))
  .catch(err => console.error(err));
