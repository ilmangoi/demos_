export default [
  {
    path: '/films',
    name: 'films',
    component: () => import(/* webpackChunkName: "films" */ '@/views/films'),
    redirect: 'films/nowPlaying',
    children: [
      {
        path: 'nowPlaying',
        component: () => import('@/views/films/nowPlaying.vue')
      },
      {
        path: 'comingSoon',
        component: () => import('@/views/films/comingSoon.vue')
      }
    ]
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/detail'),
    // 如果props设置为true，则动态路由参数的值就可以通过props来获取
    props: true,
    meta: {
      name: 'detail'
    }
  }
]
