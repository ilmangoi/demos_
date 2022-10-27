export default {
  hasToken: ({ login }) => (login.token == '' ? false : true),
  token: ({ login }) => login.token,
  routes: ({ login }) => login.routes,
  username: ({ login }) => login.userInfo.username,
  avatar: ({ login }) => login.userInfo.avatar
}
