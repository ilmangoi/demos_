<template>
  <el-dialog title="添加电影" :visible.sync="visibility">
    <div class="filmsAdd">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formData"
        v-loading="isLoading"
        ref="addFilmForm"
        status-icon
        :rules="validateRules()"
      >
        <el-form-item label="电影名称 : " prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="电影类型 : " prop="category">
          <el-checkbox-group v-model="formData.category">
            <el-checkbox label="喜剧"></el-checkbox>
            <el-checkbox label="恐怖"></el-checkbox>
            <el-checkbox label="悬疑"></el-checkbox>
            <el-checkbox label="犯罪"></el-checkbox>
            <el-checkbox label="古装"></el-checkbox>
            <el-checkbox label="武侠" class="last-select"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="电影主演 : " prop="actor">
          <el-input v-model="formData.actor"></el-input>
        </el-form-item>
        <el-form-item label="电影简介 : " prop="synopsis">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="formData.synopsis"></el-input>
        </el-form-item>
        <el-divider content-position="left">电影海报</el-divider>
        <el-form-item prop="poster">
          <el-upload
            action="http://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
            class="upload-demo"
            multiple
            drag
            accept="image/png, image/jpeg, image/jpg"
            :limit="3"
            :file-list="fileList"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-change="successUploadHandler"
            :on-remove="removePosterHandler"
            :on-exceed="exceedHandler"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em><br />
              <i style="font-size: 12px; color: #9aa0a8">只能上传jpg/png文件，且不超过10M</i>
            </div>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-button type="submit" round @click="uploadHandler" style="margin-right: 35px">上传</el-button>
          <el-button type="info" round @click="visibility = false">取消</el-button>
        </el-row>
      </el-form>
      <large-img :url="viewImgUrl" :isShow.sync="isShowLargeImg" />
    </div>
  </el-dialog>
</template>

<script>
import Notify from '@/utils/notification'
import filmFromValidateMixin from '@/mixin/filmFormValidateMixin'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState, mapActions } = createNamespacedHelpers('films')

export default {
  mixins: [filmFromValidateMixin],
  data() {
    return {
      fileList: [], // upload组件显示的文件列表
      labelPosition: 'right',
      isLoading: false, // 控制按钮的loading状态
      isShowLargeImg: false, // 控制大图的显示与隐藏
      viewImgUrl: '', // 预览图片的地址
      formData: null
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
    ...mapActions(['addFilmAction']),
    uploadHandler() {
      this.$refs.addFilmForm.validate(async (valid) => {
        // 表单验证不通过或没有上传电影海报时跳出
        if (!valid) return false
        if (!this.fileList.length) {
          Notify.error('info', this.$createElement('i', { style: 'color: black' }, '请上传电影海报'))
          return false
        }
        // 开始上传
        await this.upload()
      })
    },
    async upload() {
      this.isLoading = true
      await this.addFilmAction(this.formData)
      Notify.success('upload', this.$createElement('i', { style: 'color: black' }, '上传成功！'))
      this.isLoading = false // 关闭loading
      this.initFormData() // 清空表单
      this.visibility = false // 关闭弹窗
      // 如果是第一页，则重新获取数据
      if (this.pageNumber === 1) {
        this.$emit('switchPage', 1)
      }
    },
    successUploadHandler(file) {
      if (!this.posterValidateRules(file)) {
        // 验证图片类型和图片大小，如果验证失败，则根据实际要提交的表单数据来渲染fileList
        // 覆盖upload组件的默认行为(upload组件只要上传成功就会添加到fileList中)
        this.fileList = this.formData.poster.map((item) => ({
          name: item.name,
          url: item.url
        }))
        return false
      }
      // 这是upload组件标准的文件列表格式
      this.fileList.push({ name: file.name, url: file.url })
      // poster字段中之所以也要添加url，是要用url来唯一标识这个文件，方便删除文件
      this.formData.poster.push({ raw: file.raw, url: file.url })
      console.log(this.fileList)
      console.log(this.formData.poster)
    },
    removePosterHandler(file) {
      // elementUIi的upload组件对文件进行了封装，这里暂且称它为虚拟文件，这个虚拟文件对象里的raw属性指向真实的文件
      // change和remove事件传进来的文件参数和upload组件绑定的fileList都是虚拟文件列表，它们的uid是会当前时间戳，因此每次
      // change和remove事件触发后这个uid都会改变，因此不能唯一标识一个真实文件(raw)，但是它可以用于区分虚拟文件，因为它们是一个系统的
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
      this.formData.poster = this.formData.poster.filter((item) => item.url !== file.url)
      console.log(this.fileList)
      console.log(this.formData.poster)
    },
    handlePreview(file) {
      this.viewImgUrl = file.url // 要放大显示图片的url
      this.isShowLargeImg = true // 要否开启大图
    },
    exceedHandler() {
      Notify.error('info', this.$createElement('i', { style: 'color: black' }, '最多只能上传3张海报'))
    },
    initFormData() {
      this.formData = {
        name: '',
        actor: '',
        synopsis: '',
        category: [],
        poster: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-form-item:nth-child(6) .el-form-item__content {
    margin-left: 0px !important;
  }
  .el-divider .el-divider__text {
    color: #606266 !important;
  }
}
.last-select {
  margin-right: 30px !important;
}
.filmsAdd {
  padding: 0 30px;
}
::v-deep {
  .el-form-item__label {
    width: 90px !important;
  }
  .el-form-item__content {
    margin-left: 90px !important;
  }
}
</style>
