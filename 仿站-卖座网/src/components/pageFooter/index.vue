<template>
  <van-tabbar v-model="active" active-color="#ff5f16">
    <template v-for="item in pageFooterConfig">
      <!-- 在vue2中的项目中使用volar会报一个错
        不能在template标签上使用key属性，无伤大雅 -->
      <van-tabbar-item :to="item.to" :key="item.to">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <template v-if="item.icon.startsWith('custom-')">
            <svg-icon :icon="item.icon" :active="props.active" />
          </template>
          <template v-else>
            <van-icon :name="item.icon" />
          </template>
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script>
import pageFooterConfig from '@/config/site/pageFooter.config'

export default {
  name: 'FooterBar',
  data() {
    return {
      active: 0
    }
  },
  computed: {
    pageFooterConfig() {
      return pageFooterConfig
    }
  },
  // 方案一：使用watch监听路由变化
  watch: {
    '$route.path'(route) {
      const routes = this.pageFooterConfig.map((item) => item.to)
      // 为了防止刷新页面时，导航栏的样式丢失
      // 所以在created生命周期中，获取当前的路由地址，来设置导航栏的样式
      this.active = routes.findIndex((item) => {
        return new RegExp(item).test(route)
      })
    }
  }
  // 方案二：使用created钩子函数
  // created() {
  //   const routes = this.pageFooterConfig.map((item) => item.to)
  //   const currentRoute = window.location.pathname
  //   // 为了防止刷新页面时，导航栏的样式丢失
  //   // 所以在created生命周期中，获取当前的路由地址，来设置导航栏的样式
  //   this.active = routes.findIndex((item) => {
  //     return new RegExp(item).test(currentRoute)
  //   })
  // }
}
</script>

<style scoped lang="scss"></style>
