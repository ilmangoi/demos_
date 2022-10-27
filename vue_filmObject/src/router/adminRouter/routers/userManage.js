export default {
  path: 'userManage',
  name: 'userManage',
  component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage'),
  redirect: 'userManage/userInfo',
  children: [
    {
      path: 'userInfo',
      name: 'userInfo',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/userInfo.vue'),
      meta: {
        navigateMap: ['用户管理', '用户信息']
      }
    },
    {
      path: 'roleInfo',
      name: 'roleInfo',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/roleInfo.vue'),
      meta: {
        navigateMap: ['用户管理', '角色信息']
      }
    },
    {
      path: 'permissionInfo',
      name: 'permissionInfo',
      component: () => import(/* webpackChunkName: "permissionInfo" */ '@/views/userManage/permissionInfo.vue'),
      meta: {
        navigateMap: ['用户管理', '权限信息']
      }
    }
  ]
}
