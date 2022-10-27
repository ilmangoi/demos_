<template>
  <el-dialog title="添加权限" :visible.sync="visibility">
    <div class="permissionAdd">
      <el-form
        v-loading="isLoading"
        ref="addPermissionForm"
        status-icon
        label-width="80px"
        :label-position="labelPosition"
        :model="formData"
        :rules="validateRules()"
      >
        <el-form-item label="权限名称 : " prop="name">
          <el-input v-model="formData.name" autocomplete="off" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="路径 : " prop="path">
          <el-input v-model="formData.path" autocomplete="off" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="图标 : " prop="icon">
          <el-input v-model="formData.icon" autocomplete="off" placeholder="请输入图标名" />
        </el-form-item>
        <el-form-item label="权限简介 : " prop="description">
          <el-input v-model="formData.description" autocomplete="off" placeholder="请输入权限简介" />
        </el-form-item>
        <el-form-item label="上级权限 : " prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择上级权限">
            <el-option label="无" :value="0" />
            <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限依赖 : " prop="dependencies">
          <el-select v-model="formData.dependencies" placeholder="请选择上级权限">
            <el-option label="无" :value="0" />
            <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限类型 : " prop="type">
          <el-radio v-model="formData.type" :label="1">页面</el-radio>
          <el-radio v-model="formData.type" :label="2">接口</el-radio>
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
import permissionFormValidateMixin from '@/mixin/permissionFormValidateMixin'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState, mapActions } = createNamespacedHelpers('permission')

export default {
  mixins: [permissionFormValidateMixin],
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
    ...mapState(['addDialogVisibility', 'tableData']),
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
    ...mapActions(['addPermissionAction', 'getPermissionAction']),
    uploadHandler() {
      this.$refs.addPermissionForm.validate(async (valid) => {
        if (!valid) return false
        this.isLoading = true
        await this.addPermissionAction(this.formData)
        Notify.success('upload', this.$createElement('i', { style: 'color: black' }, '添加成功！'))
        this.getPermissionAction() // 更新数据
        this.isLoading = false // 关闭loading
        this.initFormData() // 清空表单
        this.visibility = false // 关闭弹窗
      })
    },
    initFormData() {
      this.formData = {
        pid: 0,
        name: '',
        type: 1,
        path: '',
        icon: '',
        description: '',
        dependencies: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.permissionAdd {
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
