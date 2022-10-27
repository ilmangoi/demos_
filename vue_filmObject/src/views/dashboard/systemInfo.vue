<template>
  <div class="wrapper">
    <custom-breadcrumb :navigateMap="navigateMap" class="header" />
    <div class="infoBox">
      <div class="pv">
        <h3>页面访问量统计</h3>
        <e-charts class="charts" :option="option" ref="pvCharts" />
      </div>
      <div class="tree">
        <h3>自动导入系统</h3>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
import _ from 'lodash'
export default {
  name: 'app',
  mixins: [breadCrumbMixin],
  data() {
    return {
      data: null,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      option: {
        xAxis: {
          type: 'category',
          data: null
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: null,
            type: 'bar'
          }
        ]
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    resizeHandler: _.throttle(function () {
      this.$refs.pvCharts.resize()
    }, 500)
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  async mounted() {
    this.data = JSON.parse(window.localStorage.getItem('AutomaticallyImport'))
    const res = await this.$api.pvGet()
    this.option.xAxis.data = res.data.xAxisData
    this.option.series[0].data = res.data.seriesData
  },
  // 激活组件时添加resize事件，离开组件时去掉resize事件，避免它在其它组件中报错
  activated() {
    window.addEventListener('resize', this.resizeHandler)
  },
  deactivated() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-tree-node {
    .el-tree-node__content {
      height: 32px;
      span {
        color: black;
        line-height: 32px;
        font-size: 18px !important;
      }
    }
    .el-tree-node__children {
      .is-leaf {
        display: none;
      }
      .el-tree-node__label {
        margin-left: 12px;
        color: #606266 !important;
        font-size: 16px !important;
      }
    }
  }
}
.wrapper {
  display: flex;
  height: 100%;
  background-color: rgb(238, 241, 246);
  flex-direction: column;
  .header {
    border-bottom: 2px solid #dcdfe6;
  }
  .infoBox {
    flex: 1;
    display: flex;
    scrollbar-width: none;
    flex-direction: row;
    overflow: hidden;
    .pv {
      flex: 1;
      .charts {
        height: 400px;
      }
    }
    .tree {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      overflow-x: hidden;
      .el-tree {
        margin: 12px;
      }
    }
  }
}
.el-input {
  margin-left: 12px;
  margin-top: 20px;
  width: 50% !important;
  align-self: left;
}
h3 {
  display: block;
  font-size: 20px;
  line-height: 40px;
  color: #303133;
}
</style>
