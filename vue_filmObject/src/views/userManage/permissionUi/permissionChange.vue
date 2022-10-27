<template>
  <el-dialog title="修改权限" :visible.sync="visibility">
    <div class="permissionChange">
      <el-form
        v-loading="isLoading"
        ref="changePermissionForm"
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
            <template v-for="item in tableData">
              <template v-if="formData.id !== item.id">
                <el-option :label="item.name" :value="item.id" :key="item.id" />
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="权限依赖 : " prop="dependencies">
          <el-select v-model="formData.dependencies" placeholder="请选择上级权限">
            <el-option label="无" :value="0" />
            <template v-for="item in tableData">
              <template v-if="formData.id !== item.id">
                <el-option :label="item.name" :value="item.id" :key="item.id" />
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="权限类型 : " prop="type">
          <el-radio v-model="formData.type" :label="1">页面</el-radio>
          <el-radio v-model="formData.type" :label="2">接口</el-radio>
        </el-form-item>
        <el-row>
          <el-button type="submit" round @click="uploadHandler" style="margin-right: 35px">修改</el-button>
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
  created() {
    this.initFormData()
  },
  watch: {
    changeDialogVisibility(val) {
      if (val) this.initFormData()
    }
  },
  data() {
    return {
      labelPosition: 'right',
      dialogVisible: false, // 弹出框是否显示
      isLoading: false, // 是否显示加载中
      formData: null
    }
  },
  computed: {
    ...mapState(['changeDialogVisibility', 'currEditPermissionInfo', 'tableData']),
    visibility: {
      get() {
        return this.changeDialogVisibility
      },
      set(val) {
        this.setChangeDialogVisibility(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setChangeDialogVisibility']),
    ...mapActions(['updatePermissionAction']),
    async uploadHandler() {
      this.$refs.changePermissionForm.validate(async (valid) => {
        if (!valid) return false
        this.isLoading = true
        await this.updatePermissionAction(this.formData)
        Notify.success('update', this.$createElement('i', { style: 'color: black' }, '修改成功！'))
        this.isLoading = false
        this.visibility = false
      })
    },
    initFormData() {
      this.formData = {
        id: this.currEditPermissionInfo.id,
        pid: this.currEditPermissionInfo.pid || 0,
        name: this.currEditPermissionInfo.name || '',
        type: this.currEditPermissionInfo.type || 1,
        path: this.currEditPermissionInfo.path || '',
        icon: this.currEditPermissionInfo.icon || '',
        description: this.currEditPermissionInfo.description || '',
        dependencies: this.currEditPermissionInfo.dependencies || 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.permissionChange {
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
