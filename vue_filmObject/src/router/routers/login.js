import store from '@/store'

export default {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
  beforeEnter: (to, from, next) => {
    // 如果已经登录，则跳转到首页，写在beforeEnter中可以保证在跳转到
    // login页面前处理这个逻辑，就不会出现login页面闪一下的情况
    if (store.getters.hasToken) {
      next({ path: '/admin', replace: true })
    } else {
      next()
    }
  }
}
