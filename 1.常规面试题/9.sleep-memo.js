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

// memo
// https://vue3js.cn/interview/JavaScript/function_cache.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88
// https://juejin.cn/post/6844903885379731464