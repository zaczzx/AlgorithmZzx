/**
 * sleep函数实现的途径有很多，promise，async/await等等。我在这里就将一些最普通的。
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(true);
      }, time)
  })
}

// setTimout 实现 setInterval
function myInterval(fn, time) {
  let context = this;
  setTimeout(() => {
    fn.call(context);
    myInterval(fn, time);
  }, time);
}