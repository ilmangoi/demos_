export default {
  methods: {
    usernameRule: () => {
      return [
        {
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }
      ]
    },
    passwordRule: () => [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    ]
  }
}
