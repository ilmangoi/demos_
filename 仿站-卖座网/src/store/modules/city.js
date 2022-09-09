export default {
  namespaced: true,
  state: {
    cityid: 110100,
    cityname: '北京'
  },
  mutations: {
    setCity(state, payload) {
      state.cityid = payload.cityid
      state.cityname = payload.cityname
    }
  },
  actions: {}
}
