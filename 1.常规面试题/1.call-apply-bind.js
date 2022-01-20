global.window = {}

/**
  定义: 将新指向的对象和运行这个函数参数一个一个传入, 改变一个函数的 this 的指向到新的对象, 并且执行这个函数
  @param: 1: 新指向的对象, 2. 运行这个函数的参数
  @return: 这个函数运行的结果
  功能: 
    1. 改变函数的 this 指向新的对象
    2. 新的对象运行这个函数, 返回结果
  思路:
    1.1 将函数设置为对象的属性
    1.2 执行函数
    1.3 删除对象的这个属性
 */
Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx || window;
  const key = Symbol();
  ctx[key] = this;
  let res;
  if (args.length <= 0) {
    res = ctx[key]();
  } else {
    res = ctx[key](...args);
  }
  delete ctx[key];
  return res;
}

// call 与 apply 的不同: 第 2 个参数, apply 是 [], call 是一个一个传进去
Function.prototype.myApply = function(ctx, args) {
  ctx = ctx || window;
  args = args || [];
  const key = Symbol();
  ctx[key] = this;
  let res;
  if (args.length <= 0) {
    res = ctx[key]();
  } else {
    res = ctx[key](...args);
  }
  delete ctx[key];
  return res;
}

/**
  创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
  @param 
  1. 一个指定 context, 不传时指向 window 
  2. 不限个数的参数作为绑定参数
  @returns 一个函数 
  1. 兼容传入额外参数 
  2. 兼容 new 方法，返回的对象可以获取函数原型对象上的方法
 */
Function.prototype.myBind = function(ctx, ...args) {
  // 1. 判断指定的 context, 如果不传, 指向 window
  ctx = ctx || window;
  // 2. 拿到要绑定的函数
  if (typeof this != 'function') {
    throw new Error('bind must be called on function')
  }
  const fn = this;
  // 3. 创建返回的函数, 1. 兼容新传入的额外参数; 2. 兼容 new 方法
  const res = function(newArgs) {
    if (this instanceof res) {
      return fn.apply(this, [...args, ...newArgs]);
    } else {
      return fn.apply(ctx, [...args, ...newArgs]);
    }
  }
  // 2. 返回的对象可以获取函数原型对象上的方法
  res.prototype = Object.create(fn.prototype);
  return res;
}

// test_demo
function test(a, b, c) {
  console.log(a, b, c);
}

const obj = {
  b: 1
}

test(1);
test.call(obj, 3, 2, 3)
test.myCall(obj, 3, 2, 3)
test.myCall(obj)
test.apply(obj, [3, 2, 4])
test.myApply(obj, [3, 2, 4])
const tb = test.bind(obj, 3);
const tbi = new tb();
console.log(tbi);
tb(2, 4);
const mytb = test.myBind(obj, 3);
const mytbi = new mytb();
console.log(mytbi);
mytb(2, 4);