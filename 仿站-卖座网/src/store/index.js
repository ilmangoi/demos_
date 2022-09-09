import Vue from 'vue'
import Vuex from 'vuex'

import film from './modules/film'
import city from './modules/city'
import center from './modules/center'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 底部菜单是否显示
    isShowFooter: true
  },
  mutations: {
    setIsShowFooter(state, show) {
      // 防止传入的参数不是布尔值
      state.isShowFooter = !!show
    }
  },
  getters: {
    cityid: ({ city }) => city.cityid,
    cityname: ({ city }) => city.cityname,
    loginRedirectUrl: ({ common }) => common.loginRedirectUrl
  },
  modules: {
    film,
    city,
    center,
    common
  }
})
