<template>
  <div class="container">
    <van-nav-bar title="用户登录" left-text="首页" @click-left="$router.push('/films/nowPlaying')" />
    <img class="avatar" src="http://www.mobiletrain.org/images_index/right-fixed-face.png" alt="" />
    <van-divider />
    <van-form @submit="onSubmit" :show-error="false">
      <van-field v-model="username" name="username" label="账号" placeholder="请填写账号信息" :rules="usernameRule()" />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
        :rules="passwordRule()"
      />
      <div style="margin: 16px">
        <van-button :loading="loading" class="login-btn" round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 验证表单的mixin
import loginMixin from '@/mixin/loginMixin'
export default {
  data() {
    return {
      username: '',
      password: '',
      // 防抖，loading为false时才能点击
      loading: false
    }
  },
  mixins: [loginMixin],
  methods: {
    async onSubmit(values) {
      this.loading = true
      let code = await this.$store.dispatch('center/loginAction', values)
      // 如果code值为0表示登录成功
      if (code === 0) {
        this.$toast({
          message: '登录成功',
          duration: 2000,
          onClose: () => {
            this.loading = false
            // this.$router.replace('/center')
            // 登录成功后跳转到登录之前的页面
            let url = this.$store.getters.loginRedirectUrl
            this.$router.replace(url)
          }
        })
      } else {
        // 失败的时候可以给一个处理提示
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: center;
  .avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .login-btn {
    background: #ff5f16;
    border: none;
    border-radius: 5px;
  }
}
</style>
