export default {
  methods: {
    validateRules() {
      return {
        name: [
          { required: true, message: '权限名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符之间', trigger: 'blur' }
        ],
        path: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
      }
    }
  }
}
