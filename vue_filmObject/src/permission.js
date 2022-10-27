import router from '@/router'
import adminRouter from '@/router/adminRouter'
import store from './store'
import OperateUserinfo from '@/utils/operateUserinfo'
import recordLog from '@/utils/recordLog'

// 每次刷新页面后，把vuex中丢失的用户数据补回去
store.commit('login/loginMutation', OperateUserinfo.getInfo())

// function getRoute(routes, basePath) {
//   const logContent = []
//   routes.forEach((item) => {
//     let tem = basePath
//     if (basePath) {
//       logContent.push({ label: `【${item.name}】   ➧   ${basePath + item.path}` })
//       tem = `${basePath}${item.path}/`
//     } else {
//       logContent.push({ label: `【${item.name}】   ➧   ${item.path}` })
//       tem = `${item.path}/`
//     }
//     if (item.children && item.children.length) getRoute(item.children, tem)
//   })
//   recordLog('路由信息', logContent)
// }

function getRoute(routes) {
  let logContent = routes.map((item) => {
    return { label: `【${item.name}】   ➧   ${item.path}` }
  })
  recordLog('路由信息', logContent)
}

function hasRoute(name) {
  let find = router.getRoutes().find((item) => item.name === name)
  return !!find
}

router.beforeEach((to, from, next) => {
  // 动态添加路由，只添加一次，防止重复添加，并且只有登录后才添加
  // 因为动态路由信息是在登录后由后端返回的，所以只有登录后才能添加
  if (to.name !== 'login' && !hasRoute('admin')) {
    adminRouter.children = adminRouter.children.filter((item) => {
      return store.getters.routes.includes(`/admin/${item.path}`)
    })
    // 增加无权限页面
    adminRouter.children.push({
      path: '*',
      name: 'noPermission',
      component: () => import(/* webpackChunkName: "noPermission" */ '@/views/noPermission')
    })
    router.addRoute(adminRouter) // 动态添加路由
    getRoute(router.getRoutes()) // 记录路由信息
    // 刚动态添加路由后，不会立即生效，因此需要重新跳转一次
    next({ path: to.fullPath, replace: true })
  } else {
    next()
  }
})
