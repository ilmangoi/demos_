import { RouteObject } from 'react-router-dom'

import Detail from '@/views/Detail'
import User from '@/views/User'
import UserList from '@/views/UserList'
import UserAdd from '@/views/UserAdd'
import UserEdit from '@/views/UserEdit'

export default [
  {
    path: '/',
    element: <User />,
    children: [
      {
        index: true,
        element: <UserList />
      },
      {
        path: 'useradd',
        element: <UserAdd />
      },
      {
        // 动态路由参数，来完成根据id来获取对应的用户信息
        path: ':id',
        element: <UserEdit />
      }
    ]
  },
  {
    path: '/detail/:id',
    element: <Detail />
  }
] as RouteObject[]
