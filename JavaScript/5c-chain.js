const wrapAsync =
  (fn) =>
  (...args) =>
    setTimeout(() => fn(...args), Math.random() * 1000);

const readConfig = wrapAsync((data, callback) => {
  console.log("data - ", data);
  console.log("read config");

  callback(null, data);
});

const selectFromDb = wrapAsync((query, callback) => {
  console.log("query - ", query);
  console.log("select from db");

  callback(null, { cat: "Evgeniy" });
});

const getHttpPage = wrapAsync((page, callback) => {
  console.log("page - ", page);
  console.log("Page retrieved");

  callback(null, { page: "<html>hello world!</html>" });
});

const chain = () => {
  const stack = [];

  const executor = () => {
    let result = () => null;

    const len = stack.length;

    for (let i = len - 1; i >= 0; i--) {
      const [fn, args] = stack.pop();

      result = fn.bind(null, ...args, result);
    }

    result();
  };

  executor.do = (cb, ...args) => {
    stack.push([cb, args]);

    return executor;
  };

  return executor;
};

const startChain = chain()
  .do(readConfig, "myConfig")
  .do(selectFromDb, "select * from cities")
  .do(getHttpPage, {});

startChain();
