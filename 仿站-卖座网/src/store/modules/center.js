import { doLoginApi } from '@/api/centerApi'
// vuex持久化第3方库  vuex-persistedstate  vuex-persis
import LocalStore from '@/utils/store'
const localStore = new LocalStore()
import { setToken, getToken, delToken } from '@/utils/token'

// 实现持久化的vuex
export default {
  namespaced: true,
  state: {
    token: getToken(),
    nickname: localStore.get('nickname')
  },
  mutations: {
    logoutAction(state) {
      state.token = ''
      state.nickname = ''
      delToken()
      localStore.remove('nickname')
    },
    setUser(state, payload) {
      state.token = payload.token
      state.nickname = payload.nickname
      setToken(payload.token)
      localStore.set('nickname', payload.nickname)
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      let ret = await doLoginApi(payload)
      if (ret.code === 0) {
        commit('setUser', ret.data)
      }
      return ret.code
    }
  }
}
