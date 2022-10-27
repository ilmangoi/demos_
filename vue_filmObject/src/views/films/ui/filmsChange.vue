<template>
  <el-dialog title="修改电影信息" :visible.sync="visibility">
    <div class="filmChange">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formData"
        v-loading="isLoading"
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
          <el-input v-model="actor"></el-input>
        </el-form-item>
        <el-form-item label="电影简介 : " prop="synopsis">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="formData.synopsis"> </el-input>
        </el-form-item>
        <el-row>
          <el-button type="submit" round @click="uploadFilmInfo">修改</el-button>
          <el-button type="info" round @click="visibility = false">取消</el-button>
        </el-row>
      </el-form>
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
  created() {
    // 由于当前组件一开始挂载到页面上时，vuex中的currEditFilmInfo为空对象，所以需要在created钩子中初始化formData
    // 注意：必须使用created，如果用mounted的话，data.formData属性已经被渲染到页面上面了，而由于初始化时formData
    // 是null，因此会导致报错   Cannot read properties of null
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
    ...mapState(['changeDialogVisibility', 'currEditFilmInfo']),
    visibility: {
      get() {
        return this.changeDialogVisibility
      },
      set(val) {
        this.setChangeDialogVisibility(val)
      }
    },
    // 通过计算属性来进行两种数据的同步
    actor: {
      get() {
        return this.formData.actor.join(',')
      },
      set(str) {
        this.formData.actor = str.split(',')
      }
    }
  },
  methods: {
    ...mapMutations(['setChangeDialogVisibility']),
    ...mapActions(['updateFilmAction']),
    async uploadFilmInfo() {
      this.isLoading = true
      await this.updateFilmAction(this.formData) // 修改电影信息
      Notify.success('update', this.$createElement('i', { style: 'color: black' }, '修改成功！'))
      this.isLoading = false // 关闭loading
      this.visibility = false // 关闭弹出框
    },
    initFormData() {
      this.formData = {
        id: this.currEditFilmInfo.id || null,
        name: this.currEditFilmInfo.name || '',
        category: this.currEditFilmInfo.category || [],
        actor: this.currEditFilmInfo.actor || [],
        synopsis: this.currEditFilmInfo.synopsis || ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filmChange {
  padding: 0 30px;
}
.last-select {
  margin-right: 30px !important;
}
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
