export default {
  methods: {
    usernameRule() {
      return [
        { required: true, message: '请填写账号信息' },
        { validator: this.validatorUsername, message: '账号为关键字' }
      ]
    },
    passwordRule() {
      return [{ required: true, message: '请填写密码' }]
    },
    validatorUsername(value) {
      if (value === 'admin') {
        return false
      }
      return true
    }
  }
}
