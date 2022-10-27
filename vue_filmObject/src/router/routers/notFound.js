export default {
  // 当使用'*'时，vue-router会自动把这条路由放到最后面
  // 而使用'/:pathMatch(.*)'时，vue-router没有这种默认行为
  // path: '/:pathMatch(.*)',
  path: '*',
  name: 'notFound',
  component: () => import(/* webpackChunkName: "notFound" */ '@/views/notFound')
}
