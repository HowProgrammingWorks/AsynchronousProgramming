'use strict';

// Sync function to async

const last = arr => arr[arr.length - 1];

const asyncify = fn => (...args) => {
  const callback = last(args);
  args.pop();
  process.nextTick(() => {
    callback(null, fn(...args));
  });
};

// Functions

const f1 = par => par;
const f2 = par => par;
const f3 = par => par;
const f4 = par => par;

// Usage

const af1 = asyncify(f1);
const af2 = asyncify(f2);
const af3 = asyncify(f3);
const af4 = asyncify(f4);

af1('value2', (e, data) => {
  af2(data, (e, data) => {
    af3(data, (e, data) => {
      af4(data, (e, data) => {
        console.dir({ data });
      });
    });
  });
});

console.log(f4(f3(f2(f1('value')))));
