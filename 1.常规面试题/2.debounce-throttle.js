/**
 * 定义: 防抖, 在事件被触发n秒内又被触发，则重新计时
 * @param 1. 要执行的函数 2. 等待时间
 * @returns 一个函数
 * */
function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

let count = 0;
const dlog = debounce(() => {
  console.log(count);
}, 1000);
let timer = setInterval(() => {
  count++;
  if(count >= 5) return clearInterval(timer);
  dlog();
}, 100);
// 输出结果：在5s 后输出 输出5并结束运行

/**
 * throttle, 节流, 一个事件在一段时间之内只执行一次
 * @param 1. 要执行的事件 2. 等待时间
 * @returns 一个函数
 */

function throttle(fn, wait) {
  let pre;
  return function () {
    const now = new Date();
    if (!pre || now - pre >= wait) {
      fn.apply(this, arguments);
      pre = now;
    }
  };
}

function throttle2(fn, wait) {
  let lock;
  return function () {
    if (lock) return;
    lock = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      lock = false;
    }, wait);
  };
}

let tcount = 0;
const tlog = throttle2(() => {
  console.log('tcount: ', tcount);
}, 1000);
let ttimer = setInterval(() => {
  if (tcount >= 13) clearInterval(ttimer);
  tlog();
  tcount++;
}, 100);