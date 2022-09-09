import Dep from './Dep.js'
// 数组中的原方法
var arrayProto = Array.prototype
// 对于原方法一定要提前保存起来，不然就会有重复引用，死循环
var original = arrayProto.push
// 修改数组中的原型链中的方法，而不能去修改原型中方法，因为全局都会受到影响
var methodArray = Object.create(arrayProto)

export function observe(data) {
  // 排除不是对象类型
  if (typeof data !== 'object' || typeof data == null) return
  // 对于数组不需要劫持
  if (!Array.isArray(data)) {
    // 只对于对象进行劫持处理
    for (let key in data) {
      reactive(data, key, data[key])
    }
  } else {
    // 重写的是当前的原型链中的方法，说白了就是你自己的的方法，而不是全局中的方法
    // 现在这样来写，他会影响到全局的方法
    // 只想修改当前数组中的原型链中的方法[???]
    data.__proto__.push = function (args) {
      original.apply(this, [args])
      // 此写法有一点的不妥  --- 先这样的解决
      if (typeof args !== 'object') console.log('通知视图来更新', args)
    }
  }
}

// 响应式数据处理
// target目标对象
function reactive(target, key, value) {
  // 此处就是vue2中的一个性有瓶颈  -- 递归
  observe(value)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      // console.log('get')
      // 收集要更新元素
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(v) {
      console.log('set')
      if (value !== v) {
        value = v
        // 通知需要的元素来更新视图
        dep.notify()
      }
    }
  })
}
