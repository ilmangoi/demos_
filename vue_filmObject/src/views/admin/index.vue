<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside style="background-color: rgb(238, 241, 246)" :width="menuWidth + 'px'">
      <div class="logo" @click="shrink">
        <template v-if="isCollapse">
          <img src="../../assets/img/logo_small.jpg" class="small" alt="" />
        </template>
        <template v-else>
          <img src="../../assets/img/logo_large.jpg" class="large" alt="" />
        </template>
      </div>
      <!-- el-menu如果有 :router="true" 则会把子menu的index属性作为path进行router跳转 -->
      <el-menu
        :default-openeds="defaultOpenOption"
        class="el-menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        unique-opened
        :default-active="defaultActive"
      >
        <template v-for="(item, index) in tabConfig">
          <template v-if="item.children.length === 0">
            <el-menu-item :index="item.index" @click="jumpHandler(item.path)" :key="index">
              <svg-icon :icon="item.icon" />
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu :index="item.index" :key="index">
              <template slot="title">
                <svg-icon :icon="item.icon" />
                {{ item.title }}
              </template>
              <template v-for="(item, index) in item.children">
                <el-menu-item :index="item.index" @click="jumpHandler(item.path)" :key="index">
                  <svg-icon v-if="item.icon" :icon="item.icon" />
                  {{ item.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px; user-select: none">
        <el-dropdown @command="optionHandler">
          <el-avatar :src="avatar" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="username">{{ username }}</span>
      </el-header>

      <el-main class="el-main">
        <keep-alive>
          <router-view class="view" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import tabConfig from '@/config/site/adminPageTab.config.js'
import SvgIcon from '@/globalCmp/svgIcon/index.vue'
import { createNamespacedHelpers, mapGetters } from 'vuex'
const { mapMutations } = createNamespacedHelpers('login')
import Notify from '@/utils/notification'

export default {
  components: { SvgIcon },
  created() {
    const routeInfos = []
    for (const routeInfo of tabConfig) {
      routeInfos.push({
        index: routeInfo.index,
        path: routeInfo.path
      })
      if (routeInfo.children.length !== 0) {
        for (const child of routeInfo.children) {
          routeInfos.push({
            index: child.index,
            path: child.path
          })
        }
      }
    }
    const currentRoute = this.$route.path
    this.defaultActive = routeInfos.find((item) => item.path === currentRoute).index
  },
  data() {
    return {
      tabConfig: tabConfig,
      isCollapse: false, // 控制侧边栏是否收缩
      menuWidth: 200, // 侧边栏宽度
      defaultActive: 1 // 默认选中的菜单项
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar']),
    defaultOpenOption() {
      // 展开第一个有children的菜单
      let defaultOpenOption = []
      if (this.tabConfig.length > 0) {
        this.tabConfig.some((item) => (item.children.length ? defaultOpenOption.push(item.index) : false))
      }
      return defaultOpenOption
    }
  },
  methods: {
    ...mapMutations(['logoutMutation']),
    async optionHandler(command) {
      if (command === 'logout') {
        try {
          await Notify.confirm('提示', '确定退出登录吗？').then(() => {
            this.logoutMutation()
            this.$router.push('/login')
          })
        } catch (error) {} // eslint-disable-line
      }
    },
    jumpHandler(path) {
      // 跳转页面时，可能会被路由守卫拦截，导致报错
      // 因此这里使用了编程式路由，便于捕获报错
      this.$router.replace(path).catch(() => {})
    },
    shrink() {
      this.menuWidth = this.isCollapse ? 200 : 60
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  margin-right: 12px;
}
.el-avatar {
  width: 30px;
  height: 30px;
  line-height: 60px;
  vertical-align: middle;
}
.username {
  font-size: 15px;
  vertical-align: middle;
}
.logo {
  height: 60px;
  background-color: #e2f3fb;
  text-align: center;
  line-height: 60px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .large {
    width: 80px;
  }
  .small {
    width: 25px;
  }
}
.el-main {
  padding: 0;
}
.el-aside {
  overflow: hidden;
}
.el-menu {
  user-select: none;
  .svg-icon {
    height: 18px !important;
    width: 18px !important;
    margin-right: 20px;
    fill: black !important;
  }
  .el-submenu {
    text-align: left;
  }
  .el-menu-item {
    text-align: left;
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
