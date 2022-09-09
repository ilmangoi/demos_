<template>
  <div>
    <film-nav />
    <!--
      巧用keep-alive完成对于路由组件的缓存，从而减少网络请求，提升性能
      组件被缓存之后，van-list组件的数据就不会被清空，也就不会重复触发load事件去请求数据
    -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import FilmNav from './ui/filmNav'
export default {
  components: {
    FilmNav
  }
}
</script>

<style scoped lang="scss"></style>
