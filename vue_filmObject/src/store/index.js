import Vue from 'vue'
import VueX from 'vuex'
import recordLog from '@/utils/recordLog'
import getters from './getters'

// !自动引入vuex模块(勿动)
const modules = {}
const moduleFn = require.context('./modules', true, /(.+)\.js$/)
let fileList = moduleFn.keys()
fileList.forEach((paths) => {
  const moduleName = /^\.\/(?<moduleName>.+)\.js$/.exec(paths).groups.moduleName
  let content = moduleFn(paths).default
  // 自动开启命名空间
  modules[moduleName] = Object.assign(content, { namespaced: true })
})

const logContent = []
for (const key in modules) {
  logContent.push({ label: `【${key}】` })
}
recordLog('VueX模块信息', logContent)

Vue.use(VueX)

// !如果要使用全局的state，mutations，actions，getters，可以在这里定义
// !但是务必注意命名冲突问题
export default new VueX.Store({
  state: {
    permissionCache: {}
  },
  mutations: {
    setPermissionCache(state, [permission, value]) {
      state.permissionCache[permission] = value
    }
  },
  getters,
  modules
})
