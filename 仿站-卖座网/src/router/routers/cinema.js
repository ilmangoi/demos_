export default [
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import(/* webpackChunkName: "cinema" */ '@/views/cinema')
  }
]
