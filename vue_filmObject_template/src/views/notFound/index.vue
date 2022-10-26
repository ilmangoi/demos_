<template>
  <h1 ref="title"></h1>
</template>

<script>
export default {
  name: 'notFound',
  mounted() {
    this.$refs.title.innerText = '路径不存在，将在3秒后跳转到首页......'
    setTimeout(() => {
      this.$router.push('/')
    }, 3000)
  }
}
</script>

<style scoped></style>
