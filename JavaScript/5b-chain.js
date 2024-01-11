'use strict';

// Use list and chaining syntax to build sequence

const chain = () => {
  const callbacks = [];

  const nextCallback = () => callbacks.shift();

  const forward = (err, data) => {
    if (err) return console.log({ err });
    if (data) console.log('Callback data:', { data });

    const next = nextCallback();
    if (!next) return;

    const [callback, args] = next;
    console.log('Calling next with args:', { args });
    // Pass second argument from .do
    callback(args, forward);
  };

  forward.do = (func, name) => {
    callbacks.push([func, name]);
    return forward;
  };
  
  return forward;
};

// Emulate asynchronous calls

const wrapAsync = (fn) => (...args) => setTimeout(
  () => fn(...args), Math.floor(Math.random() * 1000)
);

// Asynchronous functions

const readConfig = wrapAsync((name, callback) => {
  console.log('(1) config loaded');
  callback(null, { name });
});

const selectFromDb = wrapAsync((query, callback) => {
  console.log('(2) SQL query executed');
  callback(null, [{ name: 'Kiev' }, { name: 'Roma' } ]);
});

const getHttpPage = wrapAsync((url, callback) => {
  console.log('(3) Page retrieved');
  callback(null, '<html>Some archaic web here</html>');
});

const readFile = wrapAsync((path, callback) => {
  console.log('(4) Readme file loaded');
  callback(null, 'file content');
});

// Usage

const startChain = chain()
  .do(readConfig, 'myConfig')
  .do(selectFromDb, 'select * from cities')
  .do(getHttpPage, 'http://kpi.ua')
  .do(readFile, 'README.md');

startChain();
