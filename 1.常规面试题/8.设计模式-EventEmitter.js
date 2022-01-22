// 发布订阅模式
class EventEmitter {
  constructor() {
      this.cache = {}
  }
  on(name, fn) {
      if (this.cache[name]) {
          this.cache[name].push(fn)
      } else {
          this.cache[name] = [fn]
      }
  }
  off(name, fn) {
      let tasks = this.cache[name]
      if (tasks) {
          const index = tasks.findIndex(f => f === fn || f.callback === fn)
          if (index >= 0) {
              tasks.splice(index, 1)
          }
      }
  }
  emit(name, once = false, ...args) {
      if (this.cache[name]) {
          // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
          let tasks = this.cache[name].slice()
          for (let fn of tasks) {
              fn(...args)
          }
          if (once) {
              delete this.cache[name]
          }
      }
  }
}

// 测试
let eventBus = new EventEmitter()
let fn1 = function(name, age) {
console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'

// 手写发布订阅模式
class EventEmitter{
    constructor(){
      // 事件对象，存放订阅的名字和事件
      this.events = {};
    }
    
    // 订阅事件的方法
    // 一个名字可以订阅多个事件函数
    on(eventName, callback){
      if (!this.events[eventName]){
        this.events[eventName] = [callback];
      } else {
        this.events[eventName].push(callback);
      }
    }
    
    // 触发事件的方法
    // 遍历执行所有订阅的事件
    emit(eventName){
      this.events[eventName] && this.events[eventName].forEach(cb => cb());
    }
    
    off(eventName, callback){
      if (this.events[eventName]){
        if (!callback){
          delete this.events[eventName];
        } else {
          let i = this.events[eventName].indexOf(callback);
          this.events[eventName].splice(i, 1);
        }
      }
    }
  }
  
  // test eventemitter
  let em = new EventEmitter();
  function workDay(){
    console.log('每天工作')
  }
  function makeMoney(){
    console.log("赚 100 万");
  }
  
  em.on("money",makeMoney);
  em.on("work", workDay);
  
  em.emit("money");
  em.emit("work"); 
  
  em.off("work");  
  em.emit("work"); 
  em.emit("money");
  