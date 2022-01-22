/**
 * myPromise
 * 状态机 + 观察者模式 + 链式调用 + 值穿透
 */

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class myPromise {
  // new myPromise((resolve, reject) => {}), 立即执行 executor, 状态机
  constructor(executor) {
    this.status = PENDING;
    this.result = undefined;
    this.reason = undefined;
    // 当执行完 myPromise 时状态可能还是等待中, 要把 then 中的回调保存起来, 用于状态改变时使用
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 状态机: 只有 PENDING 时, 改变状态到 RESOLVED / REJECTED, 防止 executor 调用 2 次 resovle/reject 方法, 不可逆
    // 不可以写成 function(){}
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.result = val;
        // 遍历回调数组并执行
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给 executor
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 链式传递 + 值穿透 + 观察者模式
  then(onResolved, onRejected) {
    // 值穿透: 如果 onResolved, onRejected 不是函数, 默认使用一个接收 val/err, 返回 val/err 的函数
    onResolved = typeof onResolved === 'function' ? onResolved : (v) => v;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err; };

    // 链式传递: then 返回一个新的 myPromise
    // setTimeout: 异步执行
    // resolvePromise: 新的 promise resolve 上一个 onResolved 的返回值
    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === PENDING) {
        // 观察者模式: 在 PENDING 收集依赖 RESOLVED / REJECTED 的回调函数, 等待 resolve / reject 触发通知, 取出并执行所有回调函数 
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.result);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onResolved(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
    });

    return promise2;
  }
}

// 判断 x 的 3 种情况:
// 1. promise2, throw chain cycle error
// 2. 普通值, 直接返回值
// 3. object / function, 如果是 x.then 是 function, 代表 x 是 thenable 的, 继续调用 resolvePromise
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('chain cycle'))
  }
  // 防止重复调用
  let called = false;
  // if x 是 object/function, else x 是普通值
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      // 不要写成 x.then, 因为 x.then 会再次取值
      if (typeof then === 'function') {
        then.call(
          x, 
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          }, 
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        )
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

myPromise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}

myPromise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  });
}

// Promise.all, then 执行传入的 Promise数组的所有 Promise, 如果全部 resolve, 返回 resolveArr, 如果有 reject, 直接返回 reject;
myPromise.all = function(promiseArr){
  if(!Array.isArray(promiseArr)) {
    throw new Error('param should be a promise array');
  }
  return new myPromise((resolve, reject) => {
    let resArr = [];
    for(let promise of promiseArr){
      promise
        .then((res) => {
          resArr.push(res);
          if(resArr.length === promiseArr.length) resolve(resArr);
        })
        .catch((err) => {
          reject(err);
        })
    }
  });
}

// Promise.race, then 执行传入的 Promise 数组, 返回第一个 resolve/reject 的 val/err;
myPromise.race = function(promiseArr) {
  return new myPromise((resolve,reject)=>{
    for(let promise of promiseArr){
      promise.then(resolve, reject);
    };
  })
}

// Promise.finally, 传入一个函数, 无论 promise 是 resolve 还是 reject, 最后都会执行这个函数
myPromise.finally = function(fn){
  return this.then(
    (val) => {
      myPromise.resolve(fn()).then(() => val);
    },
    (err) => {
      myPromise.resolve(fn()).then(() => { throw err; });
    }
  )
}

// Promise.allSettled, then 执行传入的 Promise 数组, 返回一个记录所有 promise 结果的数组
myPromise.allSettled = function(promiseArr){
  return new myPromise((resolve, reject) => {
    let res = [];
    for (let key in promiseArr) {
      promiseArr[key]
        .then(
          (val) => {
            res[key] = {
              status: 'resolved',
              val
            }
            if(res.length === promiseArr.length) resolve(res);
          },
          (err) => {
            res[key] = {
              status: 'rejected',
              err
            }
            if(res.length === promiseArr.length) reject(res);
          }
        )
    }
  })
}

const p1 = myPromise.reject(1);
const p11 = Promise.reject(11);
const p2 = myPromise.resolve(2);
const p3 = myPromise.resolve(3);

// test finally + catch
// p1.then((val) => {
//   console.log(val);
// }).catch((err) => {
//   console.log('1 err');
// }).finally(() => {
//   console.log('1 finally');
// })

// p11.then((val) => {
//   console.log(val);
// }).catch((err) => {
//   console.log('11 err');
// }).finally(() => {
//   console.log('11 finally');
// })

// test all
// myPromise.all([p1, p2, p3]).then((val) => {
//   console.log(val);
// });
// Promise.all([p1, p2, p3]).then((val) => {
//   console.log(val);
// });

// test allSettled
// myPromise.allSettled([p1, p2, p3]).then((val) => {
//   console.log(val);
// });
// Promise.allSettled([p1, p2, p3]).then((val) => {
//   console.log(val);
// });

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'function' || typeof obj === 'object') &&
    typeof obj.then == 'function'
  );
}

// 终端下执行验证命令: promises-aplus-tests 1.常规面试题/6.promise-then-all-race-finally.js
myPromise.defer = myPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new myPromise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}
module.exports = myPromise;