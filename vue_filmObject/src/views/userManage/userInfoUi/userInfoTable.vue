<template>
  <div class="filmTable">
    <el-table
      style="width: 100%"
      :data="tableData.filter((data) => !pageSearch || data.username.toLowerCase().includes(pageSearch.toLowerCase()))"
      @selection-change="handleSelectionChange"
    >
      <template v-if="isOpenEdit">
        <el-table-column type="selection" width="25" />
      </template>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="头像">
              <el-avatar :src="props.row.avatar"></el-avatar>
            </el-form-item>
            <el-form-item label="用户id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ props.row.phonenumber }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户id" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column align="right">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input v-model="pageSearch" size="mini" placeholder="本页搜索" clearable />
        </template>
        <template slot-scope="props">
          <manually-btn
            size="mini"
            @click="handleEdit(props.$index, props.row)"
            style="margin: 0 10px"
            :isShow="editBtnShow"
          >
            Edit
          </manually-btn>
          <manually-btn
            size="mini"
            type="danger"
            @click="handleDelete(props.$index, props.row)"
            style="margin: 0 10px"
            :isShow="deleteBtnShow"
          >
            Delete
          </manually-btn>
        </template>
      </el-table-column>
      <template slot="empty">
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
  </div>
</template>

<script>
import Notify from '@/utils/notification'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('userInfo')

export default {
  computed: {
    ...mapState(['tableData', 'isOpenEdit', 'pageNumber'])
  },
  data: () => ({
    pageSearch: '',
    editBtnShow: false, // 用户是否可编辑
    deleteBtnShow: false // 用户是否可删除
  }),
  async mounted() {
    // 由于一页中有10个编辑按钮和10个删除按钮，如果使用automaticBtn
    // 的话会造成大量网络请求，因此这里使用manuallyBtn进行手动请求
    // 由于这个组件是放在keep-alive中的，因此该组件中的数据会一起在
    // 内存中，也就是说整个会话中只会验证一次权限
    let res = await this.$api.checkPermissionApi('/userinfo/updateUserinfo')
    this.editBtnShow = res.data === 'allow' ? true : false
    res = await this.$api.checkPermissionApi('/userinfo/removeUserinfo')
    this.deleteBtnShow = res.data === 'allow' ? true : false
  },
  methods: {
    ...mapActions(['getUserTotalAction', 'deleteUserAction']),
    ...mapMutations(['changeSelectedItem', 'changeCurrEditUserInfo', 'setChangeDialogVisibility']),
    handleSelectionChange(val) {
      this.changeSelectedItem(val.map((item) => item.id))
    },
    handleDelete(index, row) {
      // action表示行为，按下确定按钮后，action为confirm，按下取消按钮后，action为cancel
      Notify.confirm('delete', `确定删除电影《${row.name}》吗？`, async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '删除中...'
          await this.deleteUserAction({ id: row.id })
          instance.confirmButtonLoading = false
        }
        done()
      })
        .then(() => {
          Notify.success('delete', this.$createElement('i', { style: 'color: teal' }, '删除成功'))
          // 如果当前页被删完了，那就把上一页请求回来，并且刷新一下页码
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
    },
    handleEdit(index, row) {
      this.changeCurrEditUserInfo(row)
      this.setChangeDialogVisibility(true)
    }
  }
}
</script>

<style scoped lang="scss">
.demo-table-expand {
  font-size: 0;
  display: block;
  margin-right: 0;
  margin-bottom: 0;
  .el-form-item {
    display: flex;
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 0 !important;
    ::v-deep {
      .el-form-item__content {
        flex: 1;
        margin-right: 0;
      }
      .el-form-item__label {
        flex: 0 0 100px;
        text-align: right;
        margin-right: 0;
        color: #99a9bf;
      }
    }
  }
}
.el-carousel {
  height: 150px;
  width: 300px !important;
  img {
    height: 100%;
    width: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
::v-deep {
  .el-icon {
    user-select: none;
  }
}
</style>
