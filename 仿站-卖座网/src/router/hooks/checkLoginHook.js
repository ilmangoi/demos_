import { hasToken } from '@/utils/token'

export const checkLoginRoute = (to, from, next) => {
  if (['/order', '/profile', '/customerservice'].includes(to.path)) {
    // 你访问以上的地址，则需要进行是否登录的验证，如果没有登录，则不允许访问
    if (hasToken()) {
      next()
    } else {
      // 没有登录
      next({ path: '/login', replace: true })
    }
  } else {
    next()
  }
}
