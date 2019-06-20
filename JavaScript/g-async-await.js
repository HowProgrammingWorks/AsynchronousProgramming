'use strict';

// Emulate Asynchronous calls

const pause = () => new Promise(resolve =>
  setTimeout(resolve, Math.floor(Math.random() * 1000))
);

// Asynchronous functions

const readConfig = async name => {
  await pause();
  console.log('(1) config loaded');
  return { name };
};

const doQuery = async statement => {
  await pause();
  console.log('(2) SQL query executed: ' + statement);
  return [{ name: 'Kiev' }, { name: 'Roma' }];
};

const httpGet = async url => {
  await pause();
  console.log('(3) Page retrieved: ' + url);
  return '<html>Some archaic web here</html>';
};

const readFile = async path => {
  await pause();
  console.log('(4) Readme file loaded: ' + path);
  return 'file content';
};

// Usage

(async () => {
  const config = await readConfig('myConfig');
  const res = await doQuery('select * from cities');
  let json, file;
  try {
    json = await httpGet('http://kpi.ua');
  } catch (err) {
    console.log('Error (1): ' + err.message);
  }
  try {
    file = await readFile('README.md');
  } catch (err) {
    console.log('Reject reason (2): ' + err.message);
  }
  console.log('Done');
  console.dir({ config, res, json, file });
})();
