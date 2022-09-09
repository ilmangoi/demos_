import Vue from 'vue'

Vue.use((_Vue) => {
  _Vue.prototype.$bus = new Vue()
})
