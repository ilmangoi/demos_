const countModule = {
	namespaced: true,
	state: {
		num: 1
	},
	// 它专门用于修改state数据所用,同步
	mutations: {
		addNum(state, payload) {
			state.num += payload
		}
	},
	// 异步
	actions: {
		asyncAddNum({
			commit
		}, payload) {}
	}
}

export default countModule
