<template>
  <div>
    <custom-breadcrumb :navigateMap="navigateMap" />
    <el-divider />
    <div class="toolBar">
      <div class="search">
        <el-input placeholder="全局搜索" v-model="search" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="timestamp"
        @change="dateChangeHandler"
      />
      <template v-if="isOpenEdit">
        <div class="delBtn">
          <el-button type="primary" size="medium" @click="exportSelectionHandler"> 导出选中部分 </el-button>
          <el-button type="primary" size="medium" @click="dialogVisible = true"> 导出指定日期 </el-button>
          <el-button type="info" icon="el-icon-remove" size="medium" @click="changeEditable(false)">取消</el-button>
        </div>
      </template>
      <template v-else>
        <div class="editBtn">
          <automatic-btn
            type="primary"
            icon="el-icon-edit"
            size="medium"
            @click="changeEditable(true)"
            action="/film/removeFile"
          >
            编辑
          </automatic-btn>
        </div>
      </template>
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.ip.toLowerCase().includes(search.toLowerCase()) ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      @selection-change="handleSelectionChange"
      style="width: 600px"
    >
      <template v-if="isOpenEdit">
        <el-table-column type="selection" width="25" />
      </template>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ip地址">
              <span>{{ props.row.ip }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="User-Agent">
              <span>{{ props.row.userAgent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" />
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.loginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>
      <template slot="empty">
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <el-dialog title="请选择日期" :visible.sync="dialogVisible" width="30%">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="timestamp"
      >
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="isLoading" @click="exportSelectionRange">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block"></div>
  </div>
</template>

<script>
import breadCrumbMixin from '@/mixin/breadCrumbMixin'
import { setJsonFieldToXlsxField } from '@/utils/tools'
import settings from '@/config/settings'
import Notify from '@/utils/notification'
import { writeFile, utils } from 'xlsx'
export default {
  mixins: [breadCrumbMixin],
  data() {
    return {
      tableData: [],
      date: new Date(),
      dataRange: [],
      search: '',
      isOpenEdit: false,
      logCount: 10,
      selectedItemList: [],
      dialogVisible: false,
      isLoading: false
    }
  },
  methods: {
    async dateChangeHandler() {
      const params = { date: this.date }
      this.tableData = await this.$api.getLoginLog(params)
    },
    changeEditable(state) {
      this.isOpenEdit = state
    },
    handleSelectionChange(val) {
      this.selectedItemList = val.map((item) => item.id)
    },
    exportSelectionHandler() {
      if (this.selectedItemList.length === 0) {
        Notify.warn('提示', '请先选择要导出的日志')
        return
      }
      const data = this.tableData.filter((item) => this.selectedItemList.includes(item.id))
      const sheet = utils.json_to_sheet(setJsonFieldToXlsxField(data, settings.exportLoginLogFields))
      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, sheet, 'sheet1')
      writeFile(workbook, '登录日志.xlsx')
    },
    async exportSelectionRange() {
      if (!this.dataRange || this.dataRange?.length === 0) {
        Notify.warn('提示', '请先选择要导出日志的日期范围')
        return
      }
      this.isLoading = true
      const params = { date: this.dataRange[0], endDate: this.dataRange[1] }
      const res = await this.$api.getLoginLog(params)
      this.isLoading = false // 关闭loading
      this.dialogVisible = false // 关闭弹窗
      // 生成excel并提供用户下载
      const workbook = utils.book_new()
      for (const item in res) {
        const sheet = utils.json_to_sheet(setJsonFieldToXlsxField(res[item], settings.exportLoginLogFields))
        utils.book_append_sheet(workbook, sheet, item)
      }
      writeFile(workbook, `登录日志.xlsx`)
    }
  },
  async mounted() {
    this.tableData = await this.$api.getLoginLog()
  }
}
</script>

<style scoped lang="scss">
.el-table {
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
.toolBar {
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
  display: flex;
  justify-content: left;
  align-items: center;
  .search {
    margin-left: 10px;
    .el-input {
      width: 300px;
    }
  }
  div {
    margin-left: 10px;
  }
}
.el-date-editor {
  width: 170px;
}
::v-deep {
  .el-icon {
    user-select: none;
  }
  .el-dialog {
    width: 420px !important;
    .el-date-editor {
      width: 100% !important;
    }
  }
}
</style>
