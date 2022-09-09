export default [
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news')
  }
]
