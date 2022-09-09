<template>
  <div class="wrapper">
    <input :type="inputType" ref="input" />
    <template v-if="show">
      <i class="iconfont" :class="iconClass" @click="switchIcon"></i>
    </template>
  </div>
</template>

<script>
import '../assets/css/iconfont.css'
import { ref, watchEffect } from 'vue'

export default {
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  setup(props, { expose }) {
    const iconClass = ref('icon-yanjing-zhengyan')
    const inputType = ref(props.type)
    const input = ref(null)
    let show = props.type === 'password'
    const switchIcon = () => {
      if (inputType.value === 'password') {
        inputType.value = 'text'
        iconClass.value = 'icon-yanjing-guan'
      } else {
        inputType.value = 'password'
        iconClass.value = 'icon-yanjing-zhengyan'
      }
    }

    watchEffect(
      () => {
        expose({ input: input.value })
      },
      {
        flush: 'post'
      }
    )

    return {
      iconClass,
      inputType,
      show,
      input,
      switchIcon
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;

  > input {
    width: 90%;
    padding: 0.5rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    transition: all 0.2s ease-in-out;
  }

  > input:focus {
    outline: none;
    border-color: #333;
  }

  > i {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: 1.5rem;
    color: #ccc;
    cursor: pointer;
  }
}
</style>
