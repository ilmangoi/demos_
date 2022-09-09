export default {
  namespaced: false,
  state: {
    loginRedirectUrl: '/center'
  },
  mutations: {
    setLoginRedirectUrl(state, url) {
      state.loginRedirectUrl = url
    }
  }
}
