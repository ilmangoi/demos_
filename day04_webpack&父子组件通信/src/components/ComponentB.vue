<template>
  <div>
    <h2>hello B</h2>
    <p>{{ num }}</p>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped></style>
