export default [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    children: [
      {
        path: '',
        redirect: '/home/userManager'
      },
      {
        path: 'userManager',
        component: () => import(/* webpackChunkName: "userManager" */ '@/views/UserManagerView.vue')
      },
      {
        path: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
      }
    ]
  }
]
