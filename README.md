# AsynchronousProgramming

See four examples and execute them. Create asynchronous analogues of `Array.forEach`

## Parallel execution

```js
// Array of functions
let fns = [readConfig, selectFromDb, getHttpPage, readFile];

// Call example
parallelAsync(fns, () => { console.log('Done'); });

// Implementation
function parallelAsync(fns, done) {
  // TODO: implement parallel ecexution
};
```

## Sequential execution

```js
// Array of functions
let fns = [readConfig, selectFromDb, getHttpPage, readFile];

// Call example
sequentialAsync(fns, () => { console.log('Done'); });

// Implementation
function sequentialAsync(fns, done) {
  // TODO: implement sequential execution
};
```
