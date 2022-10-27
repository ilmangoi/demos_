<template>
  <div class="box">
    <!-- 导航头 -->
    <custom-breadcrumb :navigateMap="navigateMap" />
    <el-divider />
    <!-- 功能栏 -->
    <functional-bar @switchPage="switchPageHandler($event)" />
    <!-- 电影数据表格 -->
    <user-info-table @switchPage="switchPageHandler($event)" />
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
    <user-info-change />
    <!-- 新增电影的弹出框 -->
    <user-info-add @switchPage="switchPageHandler($event)" />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import userInfoTable from './userInfoUi/userInfoTable'
import functionalBar from './userInfoUi/functionalBar'
import userInfoAdd from './userInfoUi/userInfoAdd'
import userInfoChange from './userInfoUi/userInfoChange'
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('userInfo')

export default {
  components: {
    userInfoTable,
    functionalBar,
    userInfoAdd,
    userInfoChange
  },
  mixins: [breadCrumbMixin],
  computed: {
    ...mapState(['pageNumber', 'total', 'pageSize']),
    currentPage: {
      get() {
        return this.pageNumber
      },
      set(val) {
        this.changePageNumber(val)
      }
    }
  },
  methods: {
    ...mapActions(['getUserTotalAction', 'getUserinfoAction']),
    ...mapMutations(['changePageNumber']),
    switchPageHandler(page) {
      // 在url中记录当前页数，方便刷新页面后还能回到当前页
      // 如果重复跳转（从第4四跳转到第四页）会报错，因此要捕获一下
      this.$router.replace({ query: { page } }).catch(() => {})
      this.changePageNumber(page) // 改变分页器的当前页数
      this.getUserinfoAction({ page }) // 请求数据并渲染到页面
    }
  },
  async mounted() {
    await this.getUserTotalAction() // 请求总数
    let page = +this.$route.query?.page || 1 // 读取Url中的页数，并进行边界判断
    const totalPage = Math.ceil(this.total / this.pageSize)
    if (page > totalPage) page = totalPage
    if (page < 1) page = 1
    this.switchPageHandler(page) // 去服务中请求本页中的数据
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 50px;
  margin-bottom: 30px;
}
::v-deep {
  .el-dialog {
    width: 500px !important;
  }
}
</style>
