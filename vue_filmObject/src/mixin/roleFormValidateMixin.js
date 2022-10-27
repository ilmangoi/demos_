import api from '@/api'
import _ from 'lodash'

export default {
  methods: {
    validateRules() {
      return {
        name: [
          { required: true, message: '角色名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符之间', trigger: 'blur' },
          { validator: this.checkRoleName, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色简介', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符之间', trigger: 'blur' }
        ]
      }
    },
    checkRoleName: _.debounce(function (rule, value, callback) {
      api.checkRepeatName({ name: value, table: 'role' }).then((res) => {
        if (res.data) {
          callback(new Error('角色名已存在'))
        } else {
          callback()
        }
      })
    }, 500)
  }
}
