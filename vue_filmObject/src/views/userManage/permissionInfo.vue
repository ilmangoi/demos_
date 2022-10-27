<template>
  <div>
    <custom-breadcrumb :navigateMap="navigateMap" />
    <el-divider />
    <functional-bar />
    <permission-table />
    <permission-change />
    <permission-add />
  </div>
</template>

<script>
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
import functionalBar from './permissionUi/functionalBar'
import permissionAdd from './permissionUi/permissionAdd'
import permissionTable from './permissionUi/permissionTable'
import permissionChange from './permissionUi/permissionChange'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('permission')
export default {
  mixins: [breadCrumbMixin],
  components: {
    functionalBar,
    permissionAdd,
    permissionTable,
    permissionChange
  },
  methods: {
    ...mapActions(['getPermissionAction'])
  },
  mounted() {
    this.getPermissionAction()
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
