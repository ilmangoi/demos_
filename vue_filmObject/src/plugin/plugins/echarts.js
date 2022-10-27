import ECharts from 'vue-echarts'
import 'echarts'

export default {
  install(_Vue) {
    _Vue.component('ECharts', ECharts)
  }
}
