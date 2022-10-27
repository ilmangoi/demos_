<template>
  <div class="functionalBar">
    <div class="search">
      <el-input placeholder="全局搜索" v-model="globalSearch" class="input-with-select" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="addBtn">
      <automatic-btn
        type="primary"
        icon="el-icon-plus"
        size="medium"
        @click="setAddDialogVisibility(true)"
        action="/userinfo/addUserinfo"
      >
        添加用户
      </automatic-btn>
    </div>
    <template v-if="isOpenEdit">
      <div class="delBtn">
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="handleDelete">删除所选项</el-button>
        <el-button type="info" icon="el-icon-remove" size="medium" @click="changeEditableState(false)">
          取消
        </el-button>
      </div>
    </template>
    <template v-else>
      <div class="editBtn">
        <automatic-btn
          type="primary"
          icon="el-icon-edit"
          size="medium"
          @click="changeEditableState(true)"
          action="/userinfo/removeUserinfo"
        >
          编辑
        </automatic-btn>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import Notify from '@/utils/notification'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('userInfo')

export default {
  data() {
    return {
      globalSearch: '' // 全局搜索的关键字
    }
  },
  computed: {
    ...mapState(['isOpenEdit', 'selectedItemList', 'pageNumber', 'tableData'])
  },
  watch: {
    globalSearch() {
      this.searchFilmHandler(this.globalSearch, this)
    }
  },
  methods: {
    ...mapMutations(['setAddDialogVisibility', 'changeEditableState', 'changeSelectedItem']),
    ...mapActions(['getUserinfoAction', 'deleteUserAction', 'getUserTotalAction']),
    searchFilmHandler: _.throttle((keyword, that) => {
      keyword = keyword.replace(/\s+/g, '') // 把关键字中的空格过滤掉
      that.getUserinfoAction({ keyword }) // 请求电影列表(关键字查询到的)
    }, 500),
    handleDelete() {
      if (this.selectedItemList.length === 0) {
        Notify.warn('提示', '请先选择要删除的电影')
        return
      }
      Notify.confirm('delete', `确定全部删除吗？`, async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '删除中...'
          await this.deleteUserAction({ id: this.selectedItemList })
          instance.confirmButtonLoading = false
          this.changeEditableState(false)
        }
        done()
      })
        .then(() => {
          Notify.success('delete', this.$createElement('i', { style: 'color: teal' }, '删除成功'))
          this.changeSelectedItem([]) // 清空选中项
          if (this.tableData.length === 0) {
            if (this.pageNumber === 1) {
              this.$emit('switchPage', 1)
            } else {
              this.$emit('switchPage', this.pageNumber - 1)
            }
            this.getUserTotalAction() // 更新页数
          }
        })
        .catch(() => {}) // 捕获错误，防止用户点击取消时报错
    }
  }
}
</script>

<style scoped lang="scss">
.functionalBar {
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
  display: flex;
  justify-content: left;
  align-items: center;
  .search {
    margin-left: 10px;
    .el-input {
      width: 400px;
    }
  }
  div {
    margin-left: 10px;
  }
}
</style>
