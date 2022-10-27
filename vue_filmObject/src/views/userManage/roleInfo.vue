<template>
  <div>
    <custom-breadcrumb :navigateMap="navigateMap" />
    <el-divider />
    <functional-bar />
    <role-table />
    <role-change />
    <role-add />
  </div>
</template>

<script>
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
import functionalBar from './roleInfoUi/functionalBar'
import roleAdd from './roleInfoUi/roleAdd'
import roleTable from './roleInfoUi/roleTable'
import roleChange from './roleInfoUi/roleChange'
export default {
  mixins: [breadCrumbMixin],
  components: {
    functionalBar,
    roleAdd,
    roleTable,
    roleChange
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-dialog {
    width: 500px !important;
  }
}
</style>
