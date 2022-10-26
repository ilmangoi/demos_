<template>
  <div class="container">
    <div class="title">用户登录</div>
    <div class="content">
      <loginForm />
    </div>
  </div>
</template>

<script>
import loginForm from './ui/loginForm.vue'
export default {
  components: {
    loginForm
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  height: 330px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 50px auto;
  background: #fff;
  .title {
    font-size: 18px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .content {
    margin-top: 50px;
    width: 500px;
  }
}
</style>
