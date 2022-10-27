<template>
  <div>
    <div class="demo-input-suffix">
      <el-input placeholder="订单编号" v-model="input1" class="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input placeholder="商品名称" v-model="input2" class="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="商品名称" width="180"> </el-table-column>
      <el-table-column prop="name" label="商品图片" width="180"> </el-table-column>
      <el-table-column prop="number" label="购买数量"> </el-table-column>
      <el-table-column prop="totalprice" label="总价格"> </el-table-column>
      <el-table-column prop="type" label="支付类型"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="manage" label="操作">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-switch v-model="value"> </el-switch>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :hide-on-single-page="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '你好,李焕英',
          name: '王小虎',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          date: '你好,李焕英',
          name: '王小虎',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          date: '你好,李焕英',
          name: '王小虎',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          date: '你好,李焕英',
          name: '王小虎',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        }
      ],
      input1: '',
      input2: '',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      value: false
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 400px;
  height: 50px;
  margin-right: 50px;
}
</style>
