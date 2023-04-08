'use strict';

// Use list and chaining syntax to build sequence

const chain = (prev = null) => {
  console.log('Create element');
  const cur = () => {
    console.log('Reverse from ' + (cur.fn ? cur.fn.name : 'null'));
    if (cur.prev) {
      cur.prev.next = cur;
      cur.prev();
    } else {
      cur.forward();
    }
  };
  cur.prev = prev;
  cur.fn = null;
  cur.args = null;
  cur.do = (fn, ...args) => {
    cur.fn = fn;
    cur.args = args;
    return chain(cur);
  };
  cur.forward = () => {
    console.log('Forward');
    if (cur.fn) cur.fn(...cur.args, (err, data) => {
      console.log('Callback from ' + cur.fn.name);
      console.dir({ data });
      if (!err && cur.next) cur.next.forward();
      else console.log('End at ' + cur.fn.name);
    });
  };
  return cur;
};

// Emulate asynchronous calls

const wrapAsync = (fn) => {
  const delayedFn = (...args) => (
    setTimeout(fn, Math.floor(Math.random() * 1000), ...args)
  );
  Object.defineProperty(delayedFn, 'name', {
    value: fn.name
  });
  return delayedFn;
};

// Asynchronous functions
const readConfigCb = (name, callback) => {
  console.log('(1) config loaded');
  callback(null, { name });
};

const selectFromDbCb = (query, callback) => {
  console.log('(2) SQL query executed');
  callback(null, [{ name: 'Kiev' }, { name: 'Roma' }]);
};

const getHttpPageCb = (url, callback) => {
  console.log('(3) Page retrieved');
  callback(null, '<html>Some archaic web here</html>');
};

const readFileCb = (path, callback) => {
  console.log('(4) Readme file loaded');
  callback(null, 'file content');
};

const [readConfig, selectFromDb, getHttpPage, readFile] = [
  readConfigCb,
  selectFromDbCb,
  getHttpPageCb,
  readFileCb,
].map(wrapAsync);

// Usage

const startChain = chain()
  .do(readConfig, 'myConfig')
  .do(selectFromDb, 'select * from cities')
  .do(getHttpPage, 'http://kpi.ua')
  .do(readFile, 'README.md');

startChain();
