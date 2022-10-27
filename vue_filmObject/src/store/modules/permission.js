import api from '@/api'

export default {
  state: {
    tableData: [],
    addDialogVisibility: false,
    changeDialogVisibility: false,
    keyword: '',
    currEditPermissionInfo: {}
  },
  mutations: {
    setTableData(state, data) {
      state.tableData = data
    },
    updatePermission(state, data) {
      const info = state.tableData.find((item) => item.id === data.id)
      Object.assign(info, data)
    },
    deletePermission(state, id) {
      state.tableData = state.tableData.filter((item) => item.id !== id)
    },
    setAddDialogVisibility(state, visible) {
      state.addDialogVisibility = visible
    },
    setChangeDialogVisibility(state, visible) {
      state.changeDialogVisibility = visible
    },
    setKeyword(state, keyword) {
      state.keyword = keyword
    },
    changeCurrEditPermissionInfo(state, data) {
      state.currEditPermissionInfo = data
    }
  },
  actions: {
    async getPermissionAction({ commit }, payload) {
      const res = await api.permissionList(payload)
      commit('setTableData', res.data)
    },
    async deletePermissionAction({ commit }, payload) {
      await api.removePermission(payload)
      commit('deletePermission', payload.id)
    },
    async addPermissionAction(obj, payload) {
      await api.addPermission(payload)
    },
    async updatePermissionAction({ commit }, payload) {
      await api.updatePermission(payload)
      commit('updatePermission', payload)
    }
  }
}
