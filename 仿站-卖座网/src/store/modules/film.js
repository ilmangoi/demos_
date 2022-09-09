export default {
  state: {
    nowPlaying: [],
    comingSoon: []
  },
  mutations: {
    addNowPlayingFilmList(state, payload) {
      state.nowPlaying.push(...payload)
    }
  },
  actions: {}
}
