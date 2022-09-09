import Vue from 'vue'
import VueRouter from 'vue-router'

import * as showFooterHooks from './hooks/showFooterHook'
import * as pvHook from './hooks/pvHook'
import * as loginHook from './hooks/checkLoginHook'

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
  // vue-cli中内置了cross-env，并且定义了BASE_URL，所以可以直接使用
  base: process.env.BASE_URL,
  routes
})

// 注册路由守卫
Object.keys(showFooterHooks).forEach((hookName) => {
  router.beforeEach(showFooterHooks[hookName])
})
Object.keys(pvHook).forEach((hookName) => {
  router.beforeEach(pvHook[hookName])
})
Object.keys(loginHook).forEach((hookName) => {
  router.beforeEach(loginHook[hookName])
})

Vue.use(VueRouter)

export default router
