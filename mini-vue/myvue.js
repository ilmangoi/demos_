import { observe } from './lib/observe.js'
import { proxyData } from './lib/proxyData.js'
import Compile from './lib/Compile.js'

// 创建vue库
class Vue {
  // 在实例化时，有一些配置
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 响应数据
    observe(this.$data)
    // 获取数据简化处理
    proxyData(this)

    // 模板编译
    new Compile(this.$el, this.$data)
  }
}

export default Vue
