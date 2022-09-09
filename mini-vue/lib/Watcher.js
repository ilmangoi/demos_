import Dep from './Dep.js'

// 观察
export default class Watcher {
  constructor(key, data, updaterFn) {
    Dep.target = this
    // 存储在当前的成员属性中，这样在当前类中就可以使用
    this.$key = key
    this.$data = data
    // 调用一次成员数据，它会触发get方法，这样当前的target就是当前的new的实例
    data[key]
    // 用于更新视图所用的回调函数
    this.$updaterFn = updaterFn
    // 释放，为了下一个new
    Dep.target = null
  }

  update() {
    this.$updaterFn(this.$data[this.$key])
  }
}
