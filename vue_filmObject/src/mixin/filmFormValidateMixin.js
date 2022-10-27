import Notify from '@/utils/notification'

export default {
  methods: {
    validateRules() {
      return {
        name: [
          { required: true, message: '电影名不能为空', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符之间', trigger: 'blur' }
        ],
        category: [{ required: true, message: '请至少选择一个', trigger: 'blur' }],
        actor: [
          { required: true, message: '演员不能为空', trigger: 'blur' },
          { validator: this.checkActorFormat, trigger: 'blur' }
        ],
        synopsis: [
          { required: true, message: '电影简介不能为空', trigger: 'blur' },
          { min: 10, max: 200, message: '长度在 10 到 200 个字符之间', trigger: 'blur' }
        ]
      }
    },
    checkActorFormat(rule, value, callback) {
      // 演员格式：张三,李四,王五
      const reg = /^[\u4e00-\u9fa5A-Za-z]+(,[\u4e00-\u9fa5A-Za-z]+)*$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('演员格式不正确,请使用英文逗号分隔'))
      }
    },
    posterValidateRules(file) {
      if (!/\.(png|jpg|jpeg)$/.test(file.name)) {
        Notify.error('validate', this.$createElement('i', { style: 'color: black' }, '只能传入png,jpg,jpeg格式的图片'))
        return false
      }
      if (file.size > 1024 * 1024 * 10) {
        Notify.error('validate', this.$createElement('i', { style: 'color: black' }, '图片大小不能超过10M'))
        return false
      }
      return true
    }
  }
}
