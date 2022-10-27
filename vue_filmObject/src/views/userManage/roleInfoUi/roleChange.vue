<template>
  <el-dialog title="修改角色" :visible.sync="visibility">
    <div class="roleChange">
      <el-form
        v-loading="isLoading"
        ref="changeRoleForm"
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
          <el-button type="submit" round @click="uploadHandler" style="margin-right: 35px">修改</el-button>
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
    ...mapState(['changeDialogVisibility', 'currEditRoleInfo']),
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
    ...mapActions(['updateRoleAction']),
    async uploadHandler() {
      this.$refs.changeRoleForm.validate(async (valid) => {
        if (!valid) return false
        this.isLoading = true
        await this.updateRoleAction(this.formData)
        Notify.success('update', this.$createElement('i', { style: 'color: black' }, '修改成功！'))
        this.isLoading = false
        this.visibility = false
      })
    },
    initFormData() {
      this.formData = {
        id: this.currEditRoleInfo.id || null,
        name: this.currEditRoleInfo.name || '',
        description: this.currEditRoleInfo.description || ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.roleChange {
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
