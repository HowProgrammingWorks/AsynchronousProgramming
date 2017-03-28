'use strict';

function step(prev) {
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
  cur.forward = () => {
    console.log('Forward');
    if (cur.fn) cur.fn(cur.args, () => {
      console.log('Callback from ' + cur.fn.name);
      if (cur.next) cur.next.forward();
      else console.log('End at ' + cur.fn.name);
    });
  };
  cur.prev = prev;
  cur.fn = null;
  cur.do = (fn, ...args) => {
    cur.fn = fn;
    cur.args = args;
    return step(cur);
  };
  return cur;
}

function chain() {
  console.log('Create chain');
  return step();
}

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig(name, callback) {
  wrapAsync(() => {
    console.log('(1) config loaded');
    callback({ name });
  });
}

function selectFromDb(query, callback) {
  wrapAsync(() => {
    console.log('(2) SQL query executed');
    callback([ { name: 'Kiev' }, { name: 'Roma' } ]);
  });
}

function getHttpPage(url, callback) {
  wrapAsync(() => {
    console.log('(3) Page retrieved');
    callback('<html>Some archaic web here</html>');
  });
}

function readFile(path, callback) {
  wrapAsync(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  });
}

//

chain()
  .do(readConfig, 'myConfig')
  .do(selectFromDb, 'select * from cities')
  .do(getHttpPage, 'http://kpi.ua')
  .do(readFile, 'README.md');
