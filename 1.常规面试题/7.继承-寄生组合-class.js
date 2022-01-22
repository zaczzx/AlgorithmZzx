// 寄生组合继承, 解决 3 个问题
// 1. 继承父类构造函数的属性和方法
// 2. 继承父类的原型链的属性和方法
// 3. 避免重复继承属性和方法
function Parent(name){
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child(name, age){
  // 修改父类的 this 指向, 并执行父类构造函数, 继承了父类构造函数的属性和函数
  Parent.call(this, name);
  this.age = age;
}
// 子类的原型指向一个新创建的父类原型对象的副本, 继承父类的原型对象的属性和函数
// 不用 Child.prototype = Father.prototype: 共享内存会导致修改父类原型对象会影响到子类
// 不用 Child.prototype = new Parent(): 会调用 2 次父类的构造方法（另一次是 call), 会存在一份多余的父类实例属性
Child.prototype = Object.create(Parent.prototype);
// 现在的 Child.prototype.constructor 因为 Object.create 成为了父类的构造函数, 修改回 Child
Child.prototype.constructor = Child;
Child.prototype.sayNameAge = function () {
  console.log(`${this.name} + ${this.age}`);
};

// 测试
let child = new Child('zzx', 1);
child.sayName();
child.sayNameAge();

// ES6 class 继承
class Parent6 {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
class Child6 extends Parent6 {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayNameAge() {
    console.log(`${this.name} + ${this.age}`);
  }
}

// 测试
let child6 = new Child6('zzx6', 16);
child6.sayName();
child6.sayNameAge();
