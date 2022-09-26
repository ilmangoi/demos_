<template>
  <el-form :model="userForm" ref="loginValidateForm" label-width="100px">
    <el-form-item label="账号" prop="username" :rules="usernameRule()">
      <el-input v-model="userForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="passwordRule()">
      <el-input v-model="userForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginValidateForm')">登录</el-button>
      <el-button @click="resetForm('loginValidateForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import loginFormMixin from '@/mixin/loginFormValidateMixin'
export default {
  mixins: [loginFormMixin],
  data() {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            username: this.userForm.username,
            password: this.userForm.password
          }
          let ret = await this.$api.doLoginApi(data)
          console.log(ret)
          this.$router.replace('/admin')
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
