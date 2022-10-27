export default [
  {
    index: '1',
    name: 'dashboard',
    title: '仪表盘',
    icon: 'custom-yingyongguanli',
    children: [
      {
        index: '1-1',
        path: '/admin/dashboard/systemInfo',
        name: 'systemInfo',
        title: '系统信息'
        // icon: 'custom-yingyongguanli' // 可选
      },
      {
        index: '1-2',
        path: '/admin/dashboard/loginLog',
        name: 'loginLog',
        title: '登录日志'
      }
    ]
  },
  {
    index: '2',
    path: '/admin/films',
    name: 'films',
    title: '电影管理',
    icon: 'custom-dianying',
    children: [
      {
        index: '2-1',
        path: '/admin/films/nowPlaying',
        name: 'nowPlaying',
        title: '正在热播'
      },
      {
        index: '2-2',
        path: '/admin/films/comingSoon',
        name: 'comingSoon',
        title: '即将上映'
      }
    ]
  },
  {
    index: '3',
    path: '/admin/cinema',
    name: 'cinema',
    title: '影院管理',
    icon: 'custom-yingyuan',
    children: []
  },
  {
    index: '4',
    path: '/admin/order',
    name: 'order',
    title: '订单管理',
    icon: 'custom-dingdan',
    children: []
  },
  {
    index: '5',
    path: '/admin/userManage',
    name: 'userManage',
    title: '用户管理',
    icon: 'custom-yonghuziliao',
    children: [
      {
        index: '5-1',
        path: '/admin/userManage/userInfo',
        name: 'userInfo',
        title: '用户列表'
      },
      {
        index: '5-2',
        path: '/admin/userManage/roleInfo',
        name: 'roleInfo',
        title: '角色列表'
      },
      {
        index: '5-3',
        path: '/admin/userManage/permissionInfo',
        name: 'permissionInfo',
        title: '权限列表'
      }
    ]
  }
]
