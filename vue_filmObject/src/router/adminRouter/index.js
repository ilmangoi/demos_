// !自动导入路由，此处代码勿动
const moduleFn = require.context('./routers', false, /\.js$/i)
const children = moduleFn.keys().reduce((prev, curr) => {
  let module = moduleFn(curr).default
  if (Array.isArray(module)) {
    prev.push(...module)
  } else {
    prev.push(module)
  }
  return prev
}, [])

export default {
  path: '/admin',
  name: 'admin',
  redirect: '/admin/dashboard',
  component: () => import(/* webpackChunkName: "admin" */ '@/views/admin'),
  children
}
