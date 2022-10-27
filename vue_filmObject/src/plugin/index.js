// 引入全局组件
import Vue from 'vue'
import { isObject } from '@/utils/tools'
import recordLog from '@/utils/recordLog'
import './plugins/element'

// !自动引入插件 (此处代码勿动)
const moduleFn = require.context('./plugins', true, /(.+)\.js$/)
let fileList = moduleFn.keys()

const logContent = [{ label: '【elementUi】' }]
fileList.forEach((paths) => {
  let content = moduleFn(paths).default
  if (isObject(content) && content.install) {
    logContent.push({ label: `【${/^\.\/(?<pluginName>.+)\.js$/.exec(paths).groups.pluginName}】` })
    Vue.use(content)
  }
})
recordLog('Vue插件', logContent)
