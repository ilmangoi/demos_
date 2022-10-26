import Vue from 'vue'

export default {
  install(_Vue) {
    _Vue.prototype.$bus = new Vue()
  }
}
