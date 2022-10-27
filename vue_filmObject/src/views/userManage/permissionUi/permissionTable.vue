<template>
  <div class="roleTable">
    <el-table
      style="width: 100%"
      :data="tableData.filter((item) => !keyword || item.name.toLowerCase().includes(keyword.toLowerCase()))"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="权限id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="权限名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="路径">
              <span>{{ props.row.path }}</span>
            </el-form-item>
            <el-form-item label="图标">
              <span>{{ props.row.icon }}</span>
            </el-form-item>
            <el-form-item label="权限简介">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="上级权限">
              <span>{{ pid(props.row.pid) }}</span>
            </el-form-item>
            <el-form-item label="权限依赖">
              <span>{{ dependencies(props.row.dependencies) }}</span>
            </el-form-item>
            <el-form-item label="权限类型">
              <span>{{ type(props.row.type) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="权限id" prop="id" />
      <el-table-column label="权限名" prop="name" />
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
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('permission')

export default {
  computed: {
    ...mapState(['tableData', 'keyword'])
  },
  data: () => ({
    editBtnShow: false, // 用户是否可编辑
    deleteBtnShow: false // 用户是否可删除
  }),
  async mounted() {
    let res = await this.$api.checkPermissionApi('/role/updateRole')
    this.editBtnShow = res.data === 'allow' ? true : false
    res = await this.$api.checkPermissionApi('/role/removeRole')
    this.deleteBtnShow = res.data === 'allow' ? true : false
  },
  methods: {
    ...mapActions(['deletePermissionAction']),
    ...mapMutations(['changeCurrEditPermissionInfo', 'setChangeDialogVisibility']),
    handleDelete(index, row) {
      // action表示行为，按下确定按钮后，action为confirm，按下取消按钮后，action为cancel
      Notify.confirm('delete', `确定删除权限《${row.name}》吗？`, async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '删除中...'
          await this.deletePermissionAction({ id: row.id })
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
      this.changeCurrEditPermissionInfo(row)
      this.setChangeDialogVisibility(true)
    },
    pid(pid) {
      if (pid === 0) {
        return '无'
      } else {
        return this.tableData.find((item) => item.id === pid).name
      }
    },
    dependencies(dependencies) {
      if (dependencies === 0) {
        return '无'
      } else {
        return this.tableData.find((item) => item.id === dependencies).name
      }
    },
    type(type) {
      if (type === 1) {
        return '菜单'
      } else if (type === 2) {
        return '按钮'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.roleTable {
  user-select: none;
}
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
::v-deep {
  .el-table_1_column_4 div {
    text-align: center;
  }
}
</style>
