export default {
  methods: {
    usernameRule: () => {
      return [
        {
          required: true,
          message: '账号不能为空'
        }
      ]
    },
    passwordRule: () => [
      {
        required: true,
        message: '密码不能为空'
      }
    ]
  }
}
