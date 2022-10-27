// 这个是订单管理得路由
export default [
  {
    path: 'order',
    name: 'order',
    component: () => import('@/views/order'),
    redirect: 'order/orderAmend',
    children: [
      {
        path: 'orderManagement',
        name: 'orderManagement',
        component: () => import('@/views/order/orderManagement.vue')
      },
      {
        path: 'orderAmend',
        name: 'orderAmend',
        component: () => import('@/views/order/orderAmend.vue')
      }
    ]
  }
]
