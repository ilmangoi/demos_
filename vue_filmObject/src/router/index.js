import Vue from 'vue'
import VueRouter from 'vue-router'
import loginCheckHook from './hooks/loginCheckHook'
import pvRecordHook from './hooks/pvRecordHook'

// !自动引入路由 (此处代码勿动)
const moduleFn = require.context('./routers', false, /\.js$/i)
const routes = moduleFn.keys().reduce((prev, curr) => {
  let module = moduleFn(curr).default
  if (Array.isArray(module)) {
    prev.push(...module)
  } else {
    prev.push(module)
  }
  return prev
}, [])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// !路由守卫
router.beforeEach(loginCheckHook) // 登录检查
router.beforeEach(pvRecordHook) // 记录pv

Vue.use(VueRouter)

export default router
