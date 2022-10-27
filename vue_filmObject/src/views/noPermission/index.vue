<template>
  <h1 ref="title"></h1>
</template>

<script>
export default {
  name: 'notFound',
  mounted() {
    this.$refs.title.innerText = '您无权访问该页面，将在3秒后跳转到首页......'
    setTimeout(() => {
      this.$router.push('/').catch(() => {})
    }, 3000)
  }
}
</script>

<style scoped></style>
