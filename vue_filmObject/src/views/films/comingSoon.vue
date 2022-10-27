<template>
  <div class="box">
    <!-- 导航头 -->
    <custom-breadcrumb :navigateMap="navigateMap" />
    <el-divider />
    <!-- 功能栏 -->
    <functional-bar @switchPage="switchPageHandler($event)" />
    <!-- 电影数据表格 -->
    <film-table @switchPage="switchPageHandler($event)" />
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="switchPageHandler"
      :current-page="currentPage"
    />
    <!-- 修改电影的弹出框 -->
    <film-change />
    <!-- 新增电影的弹出框 -->
    <film-add @switchPage="switchPageHandler($event)" />
  </div>
</template>
<script>
import FilmAdd from './ui/filmsAdd.vue'
import FilmChange from './ui/filmsChange'
import FilmTable from './ui/filmTable'
import FunctionalBar from './ui/functionalBar'
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
import component from './page'

export default {
  components: {
    FilmAdd,
    FilmChange,
    FilmTable,
    FunctionalBar
  },
  mixins: [breadCrumbMixin, component]
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
