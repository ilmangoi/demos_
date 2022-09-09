import _ from 'lodash'

export default {
  data() {
    return {
      active: 0,
      navtitle: [true, false],
      vanTabsActive: false
    }
  },
  created() {
    // 为了防止刷新页面时，导航栏的样式丢失
    // 所以在created生命周期中，获取当前的路由地址，来设置导航栏的样式
    this.active = this.$route.path === '/films/nowPlaying' ? 0 : 1
  },
  mounted() {
    window.addEventListener('scroll', this.scrollNavFn, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollNavFn)
  },
  methods: {
    // 节流  间隔时长，默认的浏览器的事件监听在1到3ms之间
    scrollNavFn: _.throttle(function () {
      if (document.documentElement.scrollTop >= 100) {
        this.vanTabsActive = true
      } else {
        this.vanTabsActive = false
      }
    }, 300)
  },
  watch: {
    active: {
      immediate: true,
      handler(nv) {
        this.navtitle = [false, false].map((_, index) => (index === nv ? true : false))
      }
    }
  }
}
