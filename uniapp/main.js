// uni-app程序的入口文件，打包所用的

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'

// 给Vue实例添加一个成员属性 this.$store 对应为 vuex实例
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
