<template>
  <div>
    <router-link v-if="!isLogin" to="/login">立即登录</router-link>
    <span v-else>{{ nickname }}</span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('center')
export default {
  computed: {
    ...mapState(['token', 'nickname']),
    isLogin() {
      return this.token ? true : false
    }
  }
}
</script>

<style lang="scss" scoped></style>
