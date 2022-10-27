<template>
  <span class="container">
    <!-- 根据条件来决定当前用户或角色是否对于该按钮显示 -->
    <el-button v-if="show" :size="size" :disabled="disabled" @click="actionFn" :type="type" :icon="icon">
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
    action: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: String,
    type: String
  },
  data() {
    return {
      show: false
    }
  },
  async created() {
    const permission = this.$store.state.permissionCache[this.action]
    if (permission) {
      this.show = permission === 'allow' ? true : false
    } else {
      const { data } = await this.$api.checkPermissionApi(this.action)
      this.show = data == 'allow' ? true : false
      this.$store.commit('setPermissionCache', [this.action, data])
    }
  },
  methods: {
    actionFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped></style>
