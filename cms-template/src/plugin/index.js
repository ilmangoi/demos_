// 引入全局组件
import Vue from 'vue'
import { isObject } from '@/utils/tools'

import './plugins/element' // !手动引入element-ui组件

// !自动引入插件 (此处代码勿动)
const moduleFn = require.context('./plugins', true, /(.+)\.js$/)
let fileList = moduleFn.keys()

console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', '当前自动导入的插件如下：')
fileList.forEach((paths) => {
  let content = moduleFn(paths).default
  if (isObject(content) && content.install) {
    console.log(/^\.\/(?<pluginName>.+)\.js$/.exec(paths).groups.pluginName)
    Vue.use(content)
  }
})
