import Notify from '@/utils/notification'
import store from '@/store'

export default function (to, from, next) {
  // 如果要进入非登录页面的其它页面时，需要有token值
  if (to.path !== '/login' && !store.getters.hasToken) {
    // 如果没有token，则跳回登录页
    next({ name: 'login', replace: true })
    // 如果是从登录页跳转到其它页面时没有token，则提示用户登录
    // 如果是在其它页面之间跳转时发布没有token，则提示用户登录已过期
    if (/login/.test(from.path)) {
      Notify.info('提示', '请先登录')
    } else {
      Notify.info('提示', '登录已过期，请重新登录')
    }
  } else {
    next()
  }
}
