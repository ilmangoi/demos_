export default {
  path: '/:pathMatch(.*)',
  name: 'notFound',
  component: () => import(/* webpackChunkName: "notFound" */ '@/views/notFound')
}
