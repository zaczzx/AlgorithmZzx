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

// test demo
function sum(a, b, c, d) {
  return a + b + c + d;
}
const currySum1 = curry1(sum, 1, 2);
console.log(currySum1(1)(2));

// sum_curry
function sumCurry(...args) {
  let x = args.reduce((acc, num) => acc + num);
  return function (...newArgs) {
    if (newArgs.length === 0) return x;
    let y = newArgs.reduce((acc, num) => acc + num);
    return sumCurry(x + y);
  };
}

console.log(sumCurry(1)(2)());

/**
 * flat, 数组扁平化, ES6: [].flat(deepth);
 * 参数: 1 个有多层嵌套的数组
 * 返回值: 1 个只有 1 层的数组
 */
function flat(arr) {
  let res = [];
  for (let val of arr) {
    if (Array.isArray(val)) {
      res = [...res, ...flat(val)];
    } else {
      res.push(val);
    }
  }
  return res;
}

console.log(flat([1, [1, 2, [2, 4]], 3, 5])); // [1, 1, 2, 2, 4, 3, 5]
console.log([1, [1, 2, [2, 4]], 3, 5].flat(Infinity));

/**
 * unique, 去重
 * 参数: 一个有重复值得数组
 * 返回值: 一个没有重复值的数组
 * 方法: 1. Set 2. 循环 + indexOf / includes
 */
// uniqueSet, 用 Set 数据类型去重
function uniqueSet(arr) {
  return [...new Set(arr)];
}

function uniqueIncludes(arr) {
  let res = [];
  for (let n of arr) {
    if (!res.includes(n)) res.push(n);
  }
  return res;
}

let arr = [1, 3, 3, 2, 1, 5, 3];
console.log(uniqueSet(arr));
console.log(uniqueIncludes(arr));