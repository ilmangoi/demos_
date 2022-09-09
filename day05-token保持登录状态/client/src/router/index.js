import { createRouter, createWebHistory } from 'vue-router'
import { useLocalStorage } from '@/hooks'
import homeRouter from './homeRouter'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "entry" */ '@/views/EntryView.vue')
  },
  ...homeRouter
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = useLocalStorage('token')
    if (!token.value) {
      return '/login'
    }
  }
})

export default router
