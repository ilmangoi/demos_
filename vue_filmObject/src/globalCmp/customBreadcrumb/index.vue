<template>
  <div class="breadcrumbWrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <template v-for="(val, index) in navigateMap">
        <el-breadcrumb-item :key="index">{{ val }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    navigateMap: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  user-select: none;
  margin-left: 15px;
}
.breadcrumbWrapper {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
