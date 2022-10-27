<template>
  <div class="roleTable">
    <el-table
      style="width: 100%"
      :data="tableData.filter((item) => !keyword || item.name.toLowerCase().includes(keyword.toLowerCase()))"
    >
      <el-table-column label="角色id" prop="id"></el-table-column>
      <el-table-column label="角色名" prop="name"></el-table-column>
      <el-table-column label="简介" prop="description"></el-table-column>
      <el-table-column align="right">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope"> 操作 </template>
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
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('role')

export default {
  computed: {
    ...mapState(['tableData', 'keyword'])
  },
  data: () => ({
    editBtnShow: false, // 用户是否可编辑
    deleteBtnShow: false // 用户是否可删除
  }),
  async mounted() {
    this.getRoleAction() // 获取角色列表
    let res = await this.$api.checkPermissionApi('/role/updateRole')
    this.editBtnShow = res.data === 'allow' ? true : false
    res = await this.$api.checkPermissionApi('/role/removeRole')
    this.deleteBtnShow = res.data === 'allow' ? true : false
  },
  methods: {
    ...mapActions(['deleteRoleAction', 'getRoleAction']),
    ...mapMutations(['changeCurrEditRoleInfo', 'setChangeDialogVisibility']),
    handleDelete(index, row) {
      // action表示行为，按下确定按钮后，action为confirm，按下取消按钮后，action为cancel
      Notify.confirm('delete', `确定删除角色《${row.name}》吗？`, async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '删除中...'
          await this.deleteRoleAction({ id: row.id })
          instance.confirmButtonLoading = false
        }
        done()
      })
        .then(() => {
          Notify.success('delete', this.$createElement('i', { style: 'color: teal' }, '删除成功'))
        })
        .catch(() => {}) // 捕获错误，防止用户点击取消时报错
    },
    handleEdit(index, row) {
      this.changeCurrEditRoleInfo(row)
      this.setChangeDialogVisibility(true)
    }
  }
}
</script>

<style scoped lang="scss">
.roleTable {
  user-select: none;
}
::v-deep {
  .el-table_1_column_4 div {
    text-align: center;
  }
}
</style>
