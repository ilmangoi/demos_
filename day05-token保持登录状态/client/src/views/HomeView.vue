<template>
  <div class="wrapper">
    <div class="left">
      <tool-bar :routerList="routerList" />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar'
export default {
  components: {
    ToolBar
  },
  setup() {
    const routerList = [
      {
        name: '用户管理',
        link: '/home/userManager'
      },
      {
        name: '关于',
        link: '/home/about'
      }
    ]
    return {
      routerList
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  height: 100vh;
  .left {
    width: 200px;
    background-color: #f2f2f2;
  }
  .right {
    flex: 1;
  }
}
</style>
