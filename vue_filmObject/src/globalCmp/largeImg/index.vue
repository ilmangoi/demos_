<template>
  <el-dialog :visible.sync="visibility" class="largeImg">
    <img :src="url" alt="" />
  </el-dialog>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibility: {
      get() {
        return this.isShow
      },
      set(val) {
        this.$emit('update:isShow', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5) !important;
  img {
    width: 100%;
    height: 100%;
  }
}
::v-deep {
  .el-dialog {
    background-color: transparent !important;
    box-shadow: none !important;
  }
}
</style>
