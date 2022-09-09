<template>
  <div id="app">
    <router-view />
    <page-footer v-show="isShowFooter" />
  </div>
</template>

<script>
import PageFooter from './components/pageFooter'
export default {
  name: 'App',
  components: {
    PageFooter
  },

  // 隐藏footer，因为footer只有在一级路由下才显示
  // 方式一：通过vuex修改数据
  computed: {
    isShowFooter() {
      return this.$store.state.isShowFooter
    }
  }
  // 方式二：通过$root直接修改该isShowFooter值
  // data: function () {
  //   return {
  //     isShowFooter: true
  //   }
  // },
  // 方式三：通过事件总线修改数据
  // created() {
  // this.$bus.$on('isShowFooter', show => (this.isShowFooter = show))
  // },
  // beforeDestroy() {
  // this.$bus.$off('isShowFooter')
  // }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// 如果此样式有全局通用的可能性，建议写成全局重置
// 这个class是van-list组件在列表加载完毕(finished)时那行提示的class
// 这里加这个样式的意思就是当列表加载完毕时，让这行提示文字可以直接
// 显示出来，因为它是绝对定位的，所以它默认是藏在列表下面的
.van-list__finished-text {
  margin-bottom: 50px !important;
}
// 详情页面顶部导航navbar返回按钮的样式
.van-nav-bar__text,
.van-nav-bar__arrow {
  color: #ff5f16 !important;
}

// 导航navbar的样式,让它固定在顶部
.van-nav-bar {
  position: fixed !important;
  left: 0px;
  top: 0px;
  width: 100vw;
}

// 登录页验证不通过时的提示信息的样式
.van-field__error-message {
  color: #ff5f16 !important;
}

// 修正footer的bootom样式,因为它会露出来一点
.van-tabbar--fixed {
  bottom: -3px !important;
}
</style>
