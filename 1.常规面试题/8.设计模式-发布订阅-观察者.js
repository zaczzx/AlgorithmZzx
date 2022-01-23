// 发布订阅模式, Publish-subscribe pattern
class EventEmitter {
  constructor() {
    // 存放所有的订阅者和他订阅的事件, 订阅者名是 key, 订阅事件数组是 value
    this.subscribers = {};
  }

  // 订阅，name 是订阅者的账号，fn 就代表订阅的事件, 1 个订阅者名可能订阅多个订阅事件
  subscribe(name, fn) {
    if (this.subscribers[name]) {
      this.subscribers[name].push(fn);
    } else {
      this.subscribers[name] = [fn];
    }
  }

  // 取消订阅, 关闭订阅名/订阅名下的某个事件
  unsubscribe(name, fn) {
    let tasks = this.subscribers[name];
    if (tasks) {
      // 如果没有提供对应的事件则将整个订阅全部移除
      if (!fn) {
        delete this.subscribers[name];
      } else {
        const index = tasks.findIndex((f) => f === fn);
        if (index >= 0) tasks.splice(index, 1);
        // this.subs[name] = tasks.filter((task) => task !== fn);
      }
    }
  }

  // 发布, 只对某一个订阅者做发布, once 发布一次后就删除订阅者
  publish(name, once = false, ...args) {
    if (this.subscribers[name]) {
      // 可以创建副本，如果回调函数内继续注册相同事件，会造成死循环
      // let tasks = this.subscribers[name].slice();
      let tasks = this.subscribers[name];
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.subscribers[name];
      }
    }
  }
}

// test EventEmitter
function testEventEmitter() {
  let eventBus = new EventEmitter();
  const task1 = () => {
    console.log('task1');
  };
  const task2 = () => {
    console.log('task2');
  };
  eventBus.subscribe('task', task1);
  eventBus.subscribe('task', task2);
  eventBus.unsubscribe('task', task1);
  setTimeout(() => {
    eventBus.publish('task'); // task2
  }, 1000);
}
// testEventEmitter();

// 观察者模式, Observer pattern
class Subject {
  constructor(name) {
    this.state = '开心';
    this.observers = [];
  }

  // 收集观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    let index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  // 更新状态, 通知观察者
  setState(newState) {
    this.state = newState;
    this.observers.forEach((o) => o.update(this));
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }

  subscribe(subject) {
    subject.addObserver(this);
  }

  update(subject) {
    console.log(
      '通知' + this.name + ', 你观察的对象的当前状态是: ' + subject.state,
    );
  }
}

// test SubOb
function testSubOb() {
  let student = new Subject('学生');
  let parent = new Observer('父母');
  let teacher = new Observer('老师');
  student.addObserver(parent);
  student.addObserver(teacher);
  student.setState('被欺负了');
  student.removeObserver(teacher);
  student.setState('得了 100 分');  
}
testSubOb();