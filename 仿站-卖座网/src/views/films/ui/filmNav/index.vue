<template>
  <van-tabs v-model="active" :class="{ 'van-tabs-fixed': vanTabsActive }">
    <van-tab :title-class="{ navtitle: navtitle[0] }" to="/films/nowPlaying" title="正在热映" />
    <van-tab :title-class="{ navtitle: navtitle[1] }" to="/films/comingSoon" title="即将上映" />
  </van-tabs>
</template>

<script>
import ComponentModule from './action'
export default ComponentModule
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
