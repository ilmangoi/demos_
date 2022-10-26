import Vue from 'vue'
import VueRouter from 'vue-router'

// !自动引入路由 (此处代码勿动)
console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', '当前自动导入的路由信息如下：')
console.log('路由名称', '\t\t\t', '路由地址')
const moduleFn = require.context('./routers', false, /\.js$/i)
const routes = moduleFn.keys().reduce((prev, curr) => {
  let module = moduleFn(curr).default
  if (Array.isArray(module)) {
    for (const item in module) {
      console.log(module.name, '\t\t\t', item['path'])
    }
    prev.push(...module)
  } else {
    console.log(module.name, '\t\t\t', module['path'])
    prev.push(module)
  }
  return prev
}, [])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)

export default router
