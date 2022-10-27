import api from '@/api'

export default {
  state: {
    tableData: [],
    addDialogVisibility: false,
    changeDialogVisibility: false,
    keyword: '', // 全局搜索的关键字
    currEditRoleInfo: {} // 当前编辑的角色信息
  },
  mutations: {
    setTableData(state, data) {
      state.tableData = data
    },
    updateRole(state, data) {
      const info = state.tableData.find((item) => item.id === data.id)
      Object.assign(info, data)
    },
    deleteRole(state, id) {
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
    changeCurrEditRoleInfo(state, data) {
      state.currEditRoleInfo = data
    }
  },
  actions: {
    // 获取角色列表
    async getRoleAction({ commit }, payload) {
      const res = await api.roleList(payload)
      commit('setTableData', res.data)
    },
    // 删除角色
    async deleteRoleAction({ commit }, payload) {
      await api.removeRole(payload)
      commit('deleteRole', payload.id)
    },
    // 添加角色
    async addRoleAction(obj, payload) {
      await api.addRole(payload)
    },
    // 修改角色
    async updateRoleAction({ commit }, payload) {
      await api.updateRole(payload)
      commit('updateRole', payload)
    }
  }
}
