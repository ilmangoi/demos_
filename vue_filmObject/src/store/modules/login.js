import OperateUserinfo from '@/utils/operateUserinfo'
import api from '@/api'

export default {
  state: OperateUserinfo.getInfo(),
  mutations: {
    // 这个mutations不是只有在登录成功后被调用，它会在每次刷新页面时在main.js中被调用
    // 因为vuex中的数据不是持久化的，所以每次刷新页面都会丢失，这样就需要在刷新
    // 页面后重新从本地存储中获取数据，然后再将数据存储到vuex中
    loginMutation(state, payload) {
      state.token = payload.token
      state.userInfo = payload.userInfo
      state.routes = payload.routes
      // 判断本地是否有toke，如果有，则不再往本地添加
      !window.localStorage.getItem('token') && OperateUserinfo.setInfo(payload)
    },
    logoutMutation(state) {
      state.token = ''
      state.userInfo = {}
      state.routes = []
      OperateUserinfo.delInfo()
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      try {
        // await在没有catch的情况下，如果出现错误，会直接抛出错误
        // 这里通过try..catch捕获这个错误，再传给登录页面逻辑处理
        const res = await api.doLoginApi(payload)
        if (res.code === 0) commit('loginMutation', res.data)
        return res.code
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
