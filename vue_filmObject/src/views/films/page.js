import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('films')

export default {
  computed: {
    ...mapState(['total', 'pageSize', 'pageNumber']),
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
    ...mapActions(['getFilmTotalAction', 'getFilmListAction']),
    ...mapMutations(['changePageNumber', 'changeCurrentPage']),
    switchPageHandler(page) {
      // 在url中记录当前页数，方便刷新页面后还能回到当前页
      // 如果重复跳转（从第4四跳转到第四页）会报错，因此要捕获一下
      this.$router.replace({ query: { page } }).catch(() => {})
      this.changePageNumber(page) // 改变分页器的当前页数
      this.getFilmListAction({ page }) // 请求数据并渲染到页面
    }
  },
  async created() {
    this.changeCurrentPage(this.$route.meta.page)
    await this.getFilmTotalAction() // 请求总数
    let page = +this.$route.query?.page || 1 // 读取Url中的页数，并进行边界判断
    const totalPage = Math.ceil(this.total / this.pageSize)
    if (page > totalPage) page = totalPage
    if (page < 1) page = 1
    this.switchPageHandler(page) // 去服务中请求本页中的数据
  },
  activated() {
    // 从子路由返回时，重新渲染页面
    this.changeCurrentPage(this.$route.meta.page)
  }
}
