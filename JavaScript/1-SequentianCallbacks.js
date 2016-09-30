// Sequentian calls and sequentian execution

readConfig('myConfig', (err, data) => {});
selectFromDb('select * from cities', () => {});
getHttpPage('http://kpi.ua', () => {});
readFile('README.md', () => {});

// Pseudo-Asynchronous Functions
// having just callbacks but working synchronously

function readConfig(name, callback) {
  setTimeout(() => {
    console.log('(1) config loaded');
    callback({ name });
  }, 1000);
}

function selectFromDb(query, callback) {
  setTimeout(() => {
    console.log('(2) SQL query executed');
    callback([ { name: 'Kiev' } , { name: 'Roma' } ]);
  }, 1000);
}

function getHttpPage(url, callback) {
  setTimeout(() => {
    console.log('(3) Page retrieved');
    callback('<html>Some archaic web here</html>');
  }, 1000);
}

function readFile(path, callback) {
  setTimeout(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  }, 1000);
}
