import Vue from 'vue'

// !自动引入全局组件 (此处代码勿动)
const moduleFn = require.context('.', true, /(.+)\.vue$/)
let fileList = moduleFn.keys()
console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', '当前自动导入的全局组件如下：')

fileList.forEach((paths) => {
  const componentName = /^\.\/(?<cmpName>.+)\/index\.vue$/.exec(paths).groups.cmpName
  console.log(componentName)
  let content = moduleFn(paths).default
  Vue.component(componentName, content)
})
