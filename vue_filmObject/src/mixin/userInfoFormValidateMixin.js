import Notify from '@/utils/notification'
import api from '@/api'
import _ from 'lodash'

export default {
  // element-ui的validate方法验证失败后，会在控制台中打印一条warn信息
  // 可以在node_modules > async-validator > es > util.js中把console.warn注释掉
  methods: {
    validateRules() {
      return {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符之间', trigger: 'blur' },
          { validator: this.checkUsername }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: this.checkPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: this.checkEmail, trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: this.checkPhone, trigger: 'blur' }
        ]
      }
    },
    // 注意debounce不能传入一个异步函数，否则在这里会出现一些问题
    checkUsername: _.debounce(function (rule, value, callback) {
      api.checkRepeatName({ name: value, table: 'userinfo' }).then((res) => {
        if (res.data) {
          callback(new Error('用户名已存在'))
          console.log(rule)
        } else {
          callback()
        }
      })
    }, 500),
    checkPassword(rule, value, callback) {
      const reg = /^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_\-$&!]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须包含大小写字母、数字、特殊字符，长度在8-16位之间'))
      } else {
        callback()
      }
    },
    checkEmail(rule, value, callback) {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g
      if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    },
    checkPhone(rule, value, callback) {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    },
    avatarValidateRules(file) {
      if (!/\.(png|jpg|jpeg)$/.test(file.name)) {
        Notify.error('validate', this.$createElement('i', { style: 'color: black' }, '只能传入png,jpg,jpeg格式的图片'))
        return false
      }
      if (file.size > 1024 * 1024 * 2) {
        Notify.error('validate', this.$createElement('i', { style: 'color: black' }, '图片大小不能超过2M'))
        return false
      }
      return true
    }
  }
}
