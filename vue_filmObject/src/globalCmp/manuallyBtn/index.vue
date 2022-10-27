<template>
  <span class="container">
    <!-- 根据条件来决定当前用户或角色是否对于该按钮显示 -->
    <el-button v-if="isShow" :size="size" :disabled="disabled" @click="actionFn" :type="type" :icon="icon">
      <slot>按钮</slot>
    </el-button>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: String,
    type: String,
    isShow: Boolean
  },
  methods: {
    actionFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped></style>
