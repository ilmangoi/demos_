export default {
  path: '/admin',
  name: 'admin',
  component: () => import(/* webpackChunkName: "admin" */ '@/views/admin')
}
