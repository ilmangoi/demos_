export default [
  {
    path: '/center',
    name: 'center',
    component: () => import(/* webpackChunkName: "center" */ '@/views/center')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]
