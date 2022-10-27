export default [
  {
    path: 'films',
    name: 'films',
    component: () => import('@/views/films'),
    redirect: 'films/nowPlaying',
    children: [
      {
        path: 'nowPlaying',
        name: 'nowPlaying',
        component: () => import(/* webpackChunkName: "nowPlaying" */ '@/views/films/nowPlaying'),
        meta: {
          navigateMap: ['电影管理', '正在热映'],
          page: 'now_playing_films'
        }
      },
      {
        path: 'comingSoon',
        name: 'comingSoon',
        component: () => import(/* webpackChunkName: "comingSoon" */ '@/views/films/comingSoon'),
        meta: {
          navigateMap: ['电影管理', '即将上映'],
          page: 'coming_soon_films'
        }
      }
    ]
  }
]
