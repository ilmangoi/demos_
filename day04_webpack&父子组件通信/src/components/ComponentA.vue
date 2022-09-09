<template>
  <div>
    <h2>hello A</h2>
    <button :ref="btn" @click="clickHandler">add</button>
  </div>
</template>

<script>
export default {
  name: 'ComponentA',
  data() {
    return {
      btn: 'btn'
    }
  },
  methods: {
    clickHandler() {
      this.$emit('aClick')
    }
  }
}
</script>

<style scoped></style>
