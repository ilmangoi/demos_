import Vue from 'vue'
import Vuex from 'vuex'

// !自动引入vuex模块(勿动)
const modules = {}
const moduleFn = require.context('./modules', true, /(.+)\.js$/)
let fileList = moduleFn.keys()
fileList.forEach((paths) => {
  const moduleName = /^\.\/(?<moduleName>.+)\.js$/.exec(paths).groups.moduleName
  let content = moduleFn(paths).default
  modules[moduleName] = content
})

console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', '当前自动导入的vuex模块如下：')
console.log('模块名称', '               ', '模块内容')
for (const key in modules) {
  if (Object.hasOwnProperty.call(modules, key)) {
    const element = modules[key]
    console.log(key, element)
  }
}

Vue.use(Vuex)

// !如果要使用全局的state，mutations，actions，getters，可以在这里定义
// !但是务必注意命名冲突问题
export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules
})
