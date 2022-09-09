import Vue from '../modules/vue/vue.esm.browser.js'
import Goods from '../component/Goods.js'
import Cart from '../component/Cart.js'
import axiosConfig from '../config/axios.config.js'

axiosConfig(window.axios) // 注入axios配置

// eslint-disable-next-line
new Vue({
  el: '#app',
  components: {
    Goods,
    Cart
  },
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})

console.log(window)
