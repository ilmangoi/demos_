<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
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

/*
el-dialog开启时会在在body中放置一个有点击事件的div.v-modal，他被点击时会关闭el-dialog
不管嵌套使用了多少个el-dialog，div.v-modal遮罩只有生成一个，而elementUi会在每嵌套一层
就把z-index加2，这样嵌套使用el-dialog时就可能导致它被被遮挡，所以我们需要重置它的z-index
*/
.v-modal {
  z-index: 2000 !important;
}
.el-divider {
  margin: 2px 0 !important;
  user-select: none;
}
</style>
