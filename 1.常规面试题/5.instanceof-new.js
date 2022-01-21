/**
 * instanceof, 循环原型链判断
 * 参数: 1. 被判断的对象 2. 判断的目标对象
 * 返回值: boolean, true: 是目标对象的实力, false: 不是目标对象的实例
 * __proto__: 普通对象都有一个__proto__, 指向 prototype
 * prototype: 函数对象都有一个 prototype 属性, 指向自己的原型对象
 */
function myInstanceof(obj, target){
  if (!obj || typeof obj != 'object') return false;
  while(obj.__proto__ != null) {
    if (obj.__proto__ === target.prototype) return true;
    obj = obj.__proto__;
  }
  return false;
}

console.log(myInstanceof([], Array))
console.log([] instanceof Array);

/**
 * new, 通过构造函数创建一个实例对象, 实例对象的原型指向构造函数的原型, 如果构造函数有返回值, 返回, 否则返回实例对象
 * 参数: 无
 * 返回值: 如果构造函数有返回值, 返回, 否则返回实例对象
 */
function myNew(fn, ...args) {
  // 1、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(fn.prototype);
  // 2、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = fn.apply(obj, args);
  // 3、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
};

function dog(name, sex){
  this.name = name;
  this.sex = sex;
  return {
    name,
    sex
  }
}

function cat(name, sex){
  this.name = name;
  this.sex = sex;
}

console.log(new dog('d', 'male'));
console.log(myNew(dog, 'd', 'male'));
console.log(new cat('c', 'female'));
console.log(myNew(cat, 'c', 'female'));