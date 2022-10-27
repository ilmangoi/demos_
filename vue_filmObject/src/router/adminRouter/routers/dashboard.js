export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
  redirect: 'dashboard/systemInfo',
  children: [
    {
      path: 'systemInfo',
      name: 'systemInfo',
      component: () => import(/* webpackChunkName: "systemInfo" */ '@/views/dashboard/systemInfo'),
      meta: {
        navigateMap: ['仪表盘', '系统信息']
      }
    },
    {
      path: 'loginLog',
      name: 'loginLog',
      component: () => import(/* webpackChunkName: "loginLog" */ '@/views/dashboard/loginLog'),
      meta: {
        navigateMap: ['仪表盘', '登录日志']
      }
    }
  ]
}
