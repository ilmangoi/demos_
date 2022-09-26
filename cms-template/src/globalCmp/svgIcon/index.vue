<template>
  <!-- 如果无法定义颜色,则需要在iconfont.js文件中搜索fill='#xxx',并删除掉就可以通过fill定义颜色了 -->
  <svg
    class="svg-icon"
    :class="{ active: active }"
    :style="{ width: `${width}rem`, height: `${height}rem`, fill: active ? activeFill : fill }"
    @click="handleClick"
  >
    <use :href="`#${icon}`" />
  </svg>
</template>

<script>
import '@/assets/iconfont/iconfont.js'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'custom-dianying'
    },
    width: {
      type: Number,
      default: 0.5867
    },
    height: {
      type: Number,
      default: 0.5867
    },
    fill: {
      type: String,
      default: '#646566'
    },
    activeFill: {
      type: String,
      default: '#ff5f16'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped></style>
