// deepclone
/**
 * 深拷贝, 递归遍历对象, 拷贝每一层的值到新的对象中
 * 深拷贝的实现: 
 * 1. JSON.parse(JSON.stringify(object)), 2 个问题
 *  1.1. undefined、null和 symbol类型的值会被删除
 *  1.2. 碰见循环引用的时候会报错。
 * 2. 递归, 手写实现面试够用版
 * @param {*} obj 
 */
function deepclone(obj) {
  let copy;
  if (typeof obj !== 'object') copy = obj;
  else {
    copy = obj instanceof Array ? [] : {};
    for (let key in obj) {
      // 判断 i 是对象上的属性, 而不是原型上的属性
      if (obj.hasOwnProperty(key)){
        copy[key] = deepclone(obj[key]);
      }
    }
  }
  return copy;
}

const obj = [1, 2, [3, 4, [5, 6]]];
console.log(deepclone(obj))
console.log(JSON.parse(JSON.stringify(obj)));

// shallowClone
function shallowClone(obj) {
  let res;
  if (typeof obj == 'object'){
    res = obj instanceof Array ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)){
        res[i] = obj[i];
      }
    }
  } else {
    res = obj;
  }
  return res;
}

console.log(shallowClone('1232131434'))
console.log(shallowClone([1, 2, [3, 4, [5, 6]]]))