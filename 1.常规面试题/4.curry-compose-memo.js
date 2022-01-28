/**
 * curry: 接受多个参数的函数变换成一个连续接受单一参数的函数
 * 根据执行方式分为 2 种类型
 * 1. 已知参数长度限制, 接受到足够多的参数就执行
 * 2. 没有参数长度限制, 已知内部逻辑, 传入参数返回一个接受新参数的函数, 传入空参数返回值
 * @param  {() => any} fn
 * @returns
 */

function curry1(fn, ...args) {
  let sumArgs = args;
  const length = fn.length;
  // 非匿名: return function curryFn(...newArgs) {
  return function (...newArgs) {
    sumArgs = [...sumArgs, ...newArgs];
    if (sumArgs.length >= length) return fn.apply(this, sumArgs);
    // 非匿名: else return curryFn;
    else return curry1.call(this, fn, ...sumArgs);
  };
}
function sumCurry(...args) {
  let x = args.reduce((acc, num) => acc + num);
  return function (...newArgs) {
    if (newArgs.length === 0) return x;
    let y = newArgs.reduce((acc, num) => acc + num);
    return sumCurry(x + y);
  };
}

function testCurry() {
  // test demo
  function sum(a, b, c, d) {
    return a + b + c + d;
  }
  const currySum1 = curry1(sum, 1, 2);
  console.log(currySum1(1)(2));
  console.log(sumCurry(1)(2)());
}
testCurry();

// 接收若干个函数作为参数，每个函数执行后的输出作为下一个函数的输入, 执行方向是自右向左的，初始函数的参数在最右边。
function compose(...fns) {
  return function (x) {
    return fns.reverse().reduce((arg, fn) => {
      return fn(arg);
    }, x);
  };
}

function testCompose(){
  const add = (x) => x + 1;
  const multiply = (x) => x * 2;
  const minus = (x) => x - 1;
  console.log(compose(minus, multiply, add)(1)); // 3
}
testCompose();

// memo
// https://vue3js.cn/interview/JavaScript/function_cache.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88
// https://juejin.cn/post/6844903885379731464


