import api from '@/api'

export default {
  state: {
    addDialogVisibility: false, // 添加电影对话框是否可见
    changeDialogVisibility: false, // 修改电影对话框是否可见
    selectedItemList: [], // 选中电影的id列表
    now_playing_films: [], // 表格数据
    coming_soon_films: [], // 表格数据
    currEditFilmInfo: {}, // 当前正在编辑的电影信息
    pageSize: 10, // 每页显示的条数
    total: 0, // 总条数，查询数据库得到
    pageNumber: 1, // 当前页码
    isOpenEdit: false, // 是否开启编辑
    currentPage: '' // 当前页面
  },
  mutations: {
    setAddDialogVisibility(state, visibility) {
      state.addDialogVisibility = visibility
    },
    setChangeDialogVisibility(state, visibility) {
      state.changeDialogVisibility = visibility
    },
    setCurrEditFilmInfo(state, filmInfo) {
      state.currEditFilmInfo = filmInfo
    },
    changeSelectedItem(state, list) {
      state.selectedItemList = list
    },
    setTableData(state, data) {
      state[state.currentPage] = data
    },
    setTotal(state, total) {
      state.total = total
    },
    deleteFilm(state, ids) {
      let callBack
      const table = state.currentPage
      if (Array.isArray(ids)) {
        callBack = (item) => !ids.includes(item.id)
      } else {
        callBack = (item) => item.id !== ids
      }
      state[table] = state[table].filter(callBack)
    },
    changeCurrEditFilmInfo(state, filmInfo) {
      state.currEditFilmInfo = filmInfo
    },
    changeFilmInfo(state, changedFilmInfo) {
      const info = state[state.currentPage].find((item) => item.id === changedFilmInfo.id)
      Object.assign(info, changedFilmInfo)
    },
    changePageNumber(state, pageNumber) {
      state.pageNumber = pageNumber
    },
    changeEditableState(state, isOpenEdit) {
      state.isOpenEdit = isOpenEdit
    },
    changeCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    }
  },
  actions: {
    // 获取电影列表
    async getFilmListAction({ commit, state }, payload) {
      payload.table = state.currentPage // 传入当前页面(操作哪张表)
      const res = await api.filmList(payload)
      if (res.code === 0) commit('setTableData', res.data)
    },
    // 获取电影总数
    async getFilmTotalAction({ commit, state }) {
      const res = await api.getTotal(state.currentPage)
      if (res.code === 0) commit('setTotal', res.data)
    },
    // 删除电影
    async deleteFilmAction({ commit, state }, payload) {
      await api.removeFile(payload, { table: state.currentPage })
      commit('deleteFilm', payload.id)
    },
    // 修改电影信息
    async updateFilmAction({ commit, state }, payload) {
      const data = new FormData()
      for (const item in payload) {
        let value = payload[item]
        if (item === 'category') value = JSON.stringify(value)
        if (item === 'actor') value = JSON.stringify(value)
        data.append(item, value)
      }
      await api.changeFilmInfo(data, { table: state.currentPage }) // 修改数据库中的数据
      commit('changeFilmInfo', payload) // 修改vuex中的数据
    },
    // 添加电影
    async addFilmAction({ state }, payload) {
      const data = new FormData()
      let num = 1
      for (const item in payload) {
        let value = payload[item]
        switch (item) {
          case 'category':
            value = JSON.stringify(value)
            break
          case 'actor':
            value = JSON.stringify(value.split(','))
            break
          case 'poster':
            for (const file of payload[item]) data.append('poster' + num++, file.raw)
            continue
        }
        data.append(item, value)
      }
      await api.addFilm(data, { table: state.currentPage })
    }
  }
}
