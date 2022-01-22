// 寄生组合继承
// 寄生组合继承其实需要注意的是子构造函数constructor的指向问题。以及继承的弊病：超集会调用两次。
function Super() {}
function Sub() {
    Super.call(this)
}
Sub.prototype = new Super();
Sub.constructor = Sub;

// 手写观察者模式
// 基于发布订阅模式, 收集观察者，状态变化后要主动通知观察者
class Subject{
  constructor(name){
    this.state = '开心';
    this.observers = [];
  }
  
  // 收集观察者
  addObserver(observer){
    this.observers.push(observer);
  }
  
  // 更新状态, 通知观察者
  setState(newState){
    this.state = newState; 
    this.observers.forEach(o => o.update(this))
  }
  
  remove(observer){
    let index = this.observers.indexOf(observer)
    if(index > -1){
      this.observers.splice(index, 1)
    }
  }
}

class Observer{
  constructor(name){
    this.name = name;
  }
  
  subscribe(subject){
    subject.addObserver(this);
  }
  
  update(subject){
    console.log('通知' + this.name + ', 你观察的对象的当前状态是: ' + subject.state);
  }
}

let student = new Subject('学生'); 

let parent = new Observer('父母'); 
let teacher = new Observer('老师'); 

student.addObserver(parent); 
student.addObserver(teacher); 
student.setState('被欺负了');
student.remove(teacher); 
student.setState('得了 100 分');

