// 收集需要更新视图的元素
export default class Dep {
  constructor() {
    // 如果有更新，就存储在当前的此数组中，有set时，循环更新
    this.subs = []
  }
  // 添加依赖
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 通知更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
