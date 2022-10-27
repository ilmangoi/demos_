<template>
  <el-dialog title="添加角色" :visible.sync="visibility">
    <div class="roleAdd">
      <el-form
        v-loading="isLoading"
        ref="addRoleForm"
        status-icon
        label-width="80px"
        :label-position="labelPosition"
        :model="formData"
        :rules="validateRules()"
      >
        <el-form-item label="角色名 : " prop="name">
          <el-input v-model="formData.name" autocomplete="off" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="简介 : " prop="description">
          <el-input v-model="formData.description" autocomplete="off" placeholder="请输入简介" />
        </el-form-item>
        <el-row>
          <el-button type="submit" round @click="uploadHandler" style="margin-right: 35px">添加</el-button>
          <el-button type="info" round @click="visibility = false">取消</el-button>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Notify from '@/utils/notification'
import roleFormValidateMixin from '@/mixin/roleFormValidateMixin'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState, mapActions } = createNamespacedHelpers('role')

export default {
  mixins: [roleFormValidateMixin],
  data() {
    return {
      labelPosition: 'right',
      isLoading: false, // 控制按钮的loading状态
      formData: null
    }
  },
  created() {
    this.initFormData()
  },
  computed: {
    ...mapState(['addDialogVisibility']),
    visibility: {
      get() {
        return this.addDialogVisibility
      },
      set(val) {
        this.setAddDialogVisibility(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setAddDialogVisibility']),
    ...mapActions(['addRoleAction', 'getRoleAction']),
    uploadHandler() {
      this.$refs.addRoleForm.validate(async (valid) => {
        if (!valid) return false
        this.isLoading = true
        await this.addRoleAction(this.formData)
        Notify.success('upload', this.$createElement('i', { style: 'color: black' }, '添加成功！'))
        this.getRoleAction() // 更新数据
        this.isLoading = false // 关闭loading
        this.initFormData() // 清空表单
        this.visibility = false // 关闭弹窗
      })
    },
    initFormData() {
      this.formData = {
        name: '',
        description: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.roleAdd {
  padding: 0 30px;
}
::v-deep {
  .el-form-item__label {
    user-select: none;
    width: 90px !important;
  }
  .el-form-item__content {
    user-select: none;
    text-align: left;
    margin-left: 90px !important;
  }
}
</style>
