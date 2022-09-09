<template>
  <div>
    <h2>hello vue</h2>
    <component-a @aClick="clickHandler"></component-a>
    <component-b :num="num"></component-b>
  </div>
</template>

<script>
import ComponentA from './components/ComponentA.vue'
import ComponentB from './components/ComponentB.vue'
export default {
  data: function () {
    return {
      num: 0
    }
  },
  components: {
    ComponentA,
    ComponentB
  },
  methods: {
    clickHandler() {
      this.num++
    }
  }
}
</script>

<style scoped></style>
