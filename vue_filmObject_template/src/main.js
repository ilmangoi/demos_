import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugin' // 引入插件
import './globalCmp' // 引入全局组件
import 'reset-css' // 引入重置样式

import Api from '@/api' // 引入api
Vue.prototype.$api = Api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
