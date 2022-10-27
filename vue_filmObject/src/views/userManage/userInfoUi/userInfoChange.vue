<template>
  <el-dialog title="修改用户信息" :visible.sync="visibility">
    <div class="userInfoChange">
      <el-form
        v-loading="isLoading"
        status-icon
        label-width="80px"
        ref="changeUserForm"
        :label-position="labelPosition"
        :model="formData"
        :rules="validateRules()"
      >
        <el-form-item label="头像 : " prop="avatar">
          <el-upload
            action="http://jsonplaceholder.typicode.com/posts/"
            class="avatar-uploader"
            accept="image/png, image/jpeg, image/jpg"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="fileChangeHandler"
          >
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名 : " prop="username">
          <el-input v-model="formData.username" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码 : " prop="password">
          <el-input v-model="formData.password" show-password autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="性别 : " prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码 : " prop="phonenumber">
          <el-input v-model="formData.phonenumber" autocomplete="off" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="邮箱 : " prop="email">
          <el-input v-model="formData.email" autocomplete="off" placeholder="请输入邮箱" />
        </el-form-item>
        <div></div>
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
import userInfoFormValidateMixin from '@/mixin/userInfoFormValidateMixin'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState, mapActions } = createNamespacedHelpers('userInfo')

export default {
  mixins: [userInfoFormValidateMixin],
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
      formData: null,
      avatarUrl: ''
    }
  },
  computed: {
    ...mapState(['changeDialogVisibility', 'currEditUserInfo']),
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
    ...mapActions(['updateUserAction']),
    async uploadHandler() {
      this.$refs.changeUserForm.validate(async (valid) => {
        if (!valid) return false
        this.isLoading = true
        await this.updateUserAction(this.formData)
        Notify.success('update', this.$createElement('i', { style: 'color: black' }, '修改成功！'))
        this.isLoading = false
        this.visibility = false
      })
    },
    fileChangeHandler(file) {
      if (!this.avatarValidateRules(file)) {
        return false
      }
      this.avatarUrl = URL.createObjectURL(file.raw)
      this.formData.avatar = file.raw
    },
    initFormData() {
      this.avatarUrl = this.currEditUserInfo.avatar
      this.formData = {
        id: this.currEditUserInfo.id || null,
        username: this.currEditUserInfo.username || '',
        password: this.currEditUserInfo.password || '',
        avatar: this.currEditUserInfo.avatar || '',
        email: this.currEditUserInfo.email || '',
        phonenumber: this.currEditUserInfo.phonenumber || '',
        sex: this.currEditUserInfo.sex || 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfoChange {
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
// 头像框样式
::v-deep {
  .avatar-uploader .el-upload {
    border: 1px dashed #caccd3;
    border-radius: 30px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .el-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }
}
.avatar-uploader {
  user-select: none;
  width: 60px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 65px;
  height: 65px;
  display: block;
}
</style>
