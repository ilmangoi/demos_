import api from '@/api'

export default {
  state: {
    tableData: [], // 表格数据
    total: 0, // 总条数，查询数据库得到
    pageNumber: 1, // 当前页码
    pageSize: 10, // 每页条数
    isOpenEdit: false, // 是否打开编辑弹窗
    addDialogVisibility: false, // 添加用户对话框是否可见
    changeDialogVisibility: false, // 修改用户信息对话框是否可见
    currEditUserInfo: {}, // 当前正在编辑的用户信息
    selectedItemList: [] // 选中电影的id列表
  },
  mutations: {
    changePageNumber(state, pageNumber) {
      state.pageNumber = pageNumber
    },
    setAddDialogVisibility(state, visibility) {
      state.addDialogVisibility = visibility
    },
    setChangeDialogVisibility(state, visibility) {
      state.changeDialogVisibility = visibility
    },
    changeEditableState(state, isOpenEdit) {
      state.isOpenEdit = isOpenEdit
    },
    changeSelectedItem(state, list) {
      state.selectedItemList = list
    },
    setTableData(state, data) {
      state.tableData = data
    },
    setTotal(state, total) {
      state.total = total
    },
    changeCurrEditUserInfo(state, info) {
      state.currEditUserInfo = info
    },
    deleteUserinfo(state, ids) {
      let callBack
      if (Array.isArray(ids)) {
        callBack = (item) => !ids.includes(item.id)
      } else {
        callBack = (item) => item.id !== ids
      }
      state.tableData = state.tableData.filter(callBack)
    },
    changeUserinfo(state, data) {
      const info = state.tableData.find((item) => item.id === data.id)
      Object.assign(info, data)
    }
  },
  actions: {
    // 获取用户列表
    async getUserinfoAction({ commit }, payload) {
      const res = await api.userinfoList(payload)
      if (res.code === 0) commit('setTableData', res.data)
    },
    // 获取用户总数
    async getUserTotalAction({ commit }) {
      const res = await api.getTotal('userinfo')
      if (res.code === 0) commit('setTotal', res.data)
    },
    // 删除用户
    async deleteUserAction({ commit }, payload) {
      await api.removeUserinfo(payload)
      commit('deleteUserinfo', payload.id)
    },
    // 添加用户
    async addUserAction(obj, payload) {
      const data = new FormData()
      for (const item in payload) {
        data.append(item, payload[item])
      }
      await api.addUserinfo(data)
    },
    // 修改用户
    async updateUserAction({ commit }, payload) {
      const data = new FormData()
      for (const item in payload) {
        data.append(item, payload[item])
      }
      await api.updateUserinfo(data)
      commit('changeUserinfo', payload)
    }
  }
}
