// instanceof
function myInstanceof(left, right) {
  left = left.__proto__;
  while(true){
    if (left === null) return false;
    if (left === right.prototype) return true;
    left = left.__proto__;
  }
}

console.log(myInstanceof([], Array))
console.log([] instanceof Array);

// 优化后 new 实现
function myNew() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  let Con = [].shift.call(arguments);
  console.log('Con', Con);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
  // 或者 return typeof res === 'object' ? res : obj;
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

// Object.create
Object.myCreate = function(proto){
  const f = function (){}
  f.prototype = proto;
  return new f();
}
