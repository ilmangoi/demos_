import Vue from 'vue'
import recordLog from '@/utils/recordLog'

// !自动引入全局组件 (此处代码勿动)
const moduleFn = require.context('.', true, /(.+)\.vue$/)
let fileList = moduleFn.keys()

const logContent = []
fileList.forEach((paths) => {
  const componentName = /^\.\/(?<cmpName>.+)\/index\.vue$/.exec(paths).groups.cmpName
  logContent.push({ label: `【${componentName}】` })
  let content = moduleFn(paths).default
  Vue.component(componentName, content)
})
recordLog('全局组件', logContent)
