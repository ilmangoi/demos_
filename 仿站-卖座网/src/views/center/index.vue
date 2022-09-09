<template>
  <div class="container">
    <!-- 登录按钮部份 -->
    <div class="center-view-login">
      <img src="http://www.mobiletrain.org/images_index/right-fixed-face.png" alt="" />
      <!-- 是否已经登录 -->
      <showLoginBtn />
    </div>
    <van-grid :column-num="2" :border="false">
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <div class="settings">
      <van-cell title="电影订单" is-link @click="goTargetUrl('/order')">
        <template #icon>
          <van-icon name="like" class="icon" />
        </template>
      </van-cell>
      <van-cell title="在线客服" is-link @click="goTargetUrl('/customerservice')">
        <template #icon>
          <van-icon name="star" class="icon" />
        </template>
      </van-cell>
      <van-cell title="个人设置" is-link @click="goTargetUrl('/profile')">
        <template #icon>
          <van-icon name="setting" class="icon" />
        </template>
      </van-cell>
      <van-cell v-if="isLogin" :center="true" class="logout">
        <template #title>
          <div @click="logout">立即退出</div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import showLoginBtn from './ui/showLoginBtn'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('center')
export default {
  components: {
    showLoginBtn
  },
  computed: {
    ...mapState(['token', 'nickname']),
    isLogin() {
      return this.token ? true : false
    }
  },
  methods: {
    ...mapMutations(['logoutAction']),
    goTargetUrl(url) {
      // '/order', '/profile', '/customerservice'这三个路由需要登录才能访问
      // 点击之后如果未登录则会直接跳转到登录界面，这里就是把当前路由地址记录下来
      // 登录成功后再跳转到回当前路由地址
      this.$store.commit('setLoginRedirectUrl', url)
      this.$router.push(url).catch(() => {})
    },
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '退出确认',
          message: '您真的要退出本次登录吗？'
        })
        // 确定点击退出，完成对应的退出工作
        this.logoutAction()
      } catch (error) {
        // 取消点击会报出一个错误，在这里不做任何操作
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f4f4f4;

  .center-view-login {
    text-align: center;
    height: 200px;
    background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png);
    background-size: cover;
    display: flex;
    align-items: center;
    img {
      margin-left: 20px;
      width: 80px;
      height: 80px;
    }
    div {
      margin-left: 20px;
      font-size: 18px;
      color: white;
    }
  }
  .settings {
    margin-top: 20px;
    text-align: left;
  }
  .icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    color: red;
    font-weight: bold;
    margin-right: 10px;
  }
  .logout {
    text-align: center;
  }
}
</style>
