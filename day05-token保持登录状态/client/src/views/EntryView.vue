<template>
  <div class="entry-view">
    <div class="wrapper">
      <h1>Login</h1>
      <custom-input type="text" ref="username" />
      <custom-input type="password" ref="password" />
      <button class="btn" @click="loginHandler">Login</button>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@/hooks'

export default {
  components: {
    CustomInput
  },
  setup() {
    const username = ref(null)
    const password = ref(null)
    const instance = getCurrentInstance()
    const router = useRouter()
    let token = useLocalStorage('token', null)
    const loginHandler = () => {
      instance.appContext.config.globalProperties
        .$post('/users/login', {
          username: username.value.input.value,
          password: password.value.input.value
        })
        .then((res) => {
          token.value = res.token
          router.push('/home')
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    }
    return {
      username,
      password,
      loginHandler
    }
  },
  beforeRouteEnter(to, from, next) {
    const token = useLocalStorage('token')
    if (token.value) {
      next('/home')
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="scss">
.entry-view {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  user-select: none;

  > .wrapper {
    flex: 0.3;
    max-width: 300px;
    min-width: 200px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;

    > h1 {
      margin-bottom: 1rem;
      font-style: italic;
      font-size: 2rem;
    }

    > button {
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
    }
  }
}
</style>
