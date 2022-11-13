import Vue from 'vue'
import Vuex from 'vuex'

import count from '@/store/modules/count.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		count
	}
})
export default store
