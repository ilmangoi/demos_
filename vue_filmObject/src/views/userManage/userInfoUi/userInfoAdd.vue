<template>
  <el-dialog title="添加用户" :visible.sync="visibility">
    <div class="userInfoAdd">
      <el-form
        v-loading="isLoading"
        ref="addUserForm"
        status-icon
        label-width="80px"
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
          <el-radio-group v-model="formData.sex" @change="sexChangeHandler">
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
          <el-button type="submit" round @click="uploadHandler" style="margin-right: 35px">添加</el-button>
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
  data() {
    return {
      labelPosition: 'right',
      isLoading: false, // 控制按钮的loading状态
      isShowLargeImg: false, // 控制大图的显示与隐藏
      viewImgUrl: '', // 预览图片的地址
      formData: null,
      default_male_avatarUrl: 'http://10.9.46.214:3000/public/images/avatar/male_default.webp',
      default_female_avatarUrl: 'http://10.9.46.214:3000/public/images/avatar/female_default.webp',
      avatarUrl: 'http://10.9.46.214:3000/public/images/avatar/male_default.webp'
    }
  },
  created() {
    // 组件被创建时，初始化表单数据
    this.initFormData()
  },
  computed: {
    ...mapState(['addDialogVisibility', 'pageNumber']),
    // 这里之所以要写一个计算属性visibility，是因为el-dialog是通过v-model来控制显示与隐藏的，而v-model只能绑定一个变量
    // 如果直接给它绑定addDialogVisibility，由于addDialogVisibility是写在vuex中的，不能被直接修改，因此会无法关闭
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
    ...mapActions(['addUserAction']),
    uploadHandler() {
      this.$refs.addUserForm.validate(async (valid) => {
        // 表单验证不通过或没有上传电影海报时跳出
        if (!valid) return false
        // if (!this.formData.avatar) {
        //   Notify.error('info', this.$createElement('i', { style: 'color: black' }, '请上传头像'))
        //   return false
        // }
        // 开始上传
        await this.upload()
      })
    },
    async upload() {
      this.isLoading = true
      await this.addUserAction(this.formData)
      Notify.success('upload', this.$createElement('i', { style: 'color: black' }, '上传成功！'))
      this.isLoading = false // 关闭loading
      this.initFormData() // 清空表单
      this.visibility = false // 关闭弹窗
      // 如果是第一页，则重新获取数据
      if (this.pageNumber === 1) {
        this.$emit('switchPage', 1)
      }
    },
    fileChangeHandler(file) {
      if (!this.avatarValidateRules(file)) {
        return false
      }
      this.avatarUrl = URL.createObjectURL(file.raw)
      this.formData.avatar = file.raw
    },
    sexChangeHandler(val) {
      if (!this.formData.avatar && val === 1) {
        this.avatarUrl = this.default_male_avatarUrl
      } else if (!this.formData.avatar && val === 2) {
        this.avatarUrl = this.default_female_avatarUrl
      }
    },
    initFormData() {
      this.formData = {
        username: '',
        password: '',
        avatar: '',
        email: '',
        phonenumber: '',
        sex: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfoAdd {
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
