<template>
  <el-form :model="userForm" ref="loginValidateForm" label-width="100px" status-icon>
    <el-form-item label="账号" prop="username" :rules="usernameRule()">
      <el-input v-model="userForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="passwordRule()">
      <el-input v-model="userForm.password" show-password autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginValidateForm')" :loading="loading">登录</el-button>
      <el-button @click="resetForm('loginValidateForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import loginFormMixin from '@/mixin/loginFormValidateMixin'
import Notify from '@/utils/notification'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('login')

export default {
  mixins: [loginFormMixin],
  data() {
    return {
      loading: false,
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    submitForm(formName) {
      this.loading = true // 提交防抖
      const h = this.$createElement
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.loading = false
          return false
        }
        const load = {
          username: this.userForm.username,
          password: this.userForm.password
        }
        await this.loginAction(load)
          .then(() => {
            Notify.success('登录成功', h('i', { style: 'color: teal' }, '登录成功'))
            this.loading = false
            this.$router.push({ path: '/admin', replace: true }).catch(() => {})
          })
          .catch((err) => {
            Notify.error('登录失败', h('i', { style: 'color: black' }, err.msg))
            this.loading = false
          })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
