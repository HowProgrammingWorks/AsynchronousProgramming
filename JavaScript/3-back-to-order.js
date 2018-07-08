'use strict';

// Back to order, callback hierarchy

// Emulate Asynchronous calls

const wrapAsync = (callback) => setTimeout(
  callback, Math.floor((Math.random() * 1000))
);

// Asynchronous functions

const readConfig = (name, callback) => wrapAsync(() => {
  console.log('(1) config loaded');
  callback(null, { name });
});

const selectFromDb = (query, callback) => wrapAsync(() => {
  console.log('(2) SQL query executed');
  callback(null, [{ name: 'Kiev' }, { name: 'Roma' }]);
});

const getHttpPage = (url, callback) => wrapAsync(() => {
  console.log('(3) Page retrieved');
  callback(null, '<html>Some archaic web here</html>');
});

const readFile = (path, callback) => wrapAsync(() => {
  console.log('(4) Readme file loaded');
  callback(null, 'file content');
});

readConfig('myConfig', () => {
  selectFromDb('select * from cities', () => {
    getHttpPage('http://kpi.ua', () => {
      readFile('README.md', () => {
        console.log('All done!');
      });
    });
  });
});
