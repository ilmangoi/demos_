<template>
  <div>
    <div class="demo-input-suffix">
      商品名称：
      <el-input placeholder="商品名称" v-model="input1" class="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button icon="el-icon-search" circle @click="searchData"></el-button>
      <el-button type="primary" round class="addData" @click="addOrder()">添加订单</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="商品名称" width="180"> </el-table-column>
      <el-table-column prop="name" label="商品图片"> </el-table-column>
      <el-table-column prop="number" label="购买数量"> </el-table-column>
      <el-table-column prop="totalprice" label="总价格"> </el-table-column>
      <el-table-column prop="type" label="支付类型"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="manage" label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.id)" type="text" size="small">修改</el-button>

          <el-button type="text" size="small" @click="delete01(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="电影名称:" class="inputData">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="订单数量:" class="selectedOption">
          <el-select v-model="form.number" placeholder="请选择数量">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单总价:" class="inputData">
          <el-input v-model="form.totalprice"></el-input>
        </el-form-item>
        <el-form-item label="支付类型:" class="selectedOption">
          <el-select v-model="form.type" placeholder="请选择支付类型">
            <el-option label="微信" value="微信"></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="现金" value="现金"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态:" class="selectedOption">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已支付" value="已支付"></el-option>
            <el-option label="已退款" value="已退款"></el-option>
            <el-option label="已取消" value="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单座位:" class="inputData">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div class="block">
      <el-switch v-model="value"> </el-switch>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="3"
        @hide-on-single-page="hideisorno"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          date: '你好,李焕英01',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          id: 1,
          date: '你好,李焕英02',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          id: 2,
          date: '你好,李焕英03',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          id: 3,
          date: '你好,李焕英04',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          id: 4,
          date: '你好,李焕英05',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        },
        {
          id: 5,
          date: '你好,李焕英01',
          name: '图片',
          number: 2,
          totalprice: 78,
          type: '微信支付',
          status: '已完成',
          address: '18号影厅5排6座,7座'
        }
      ],
      input1: '',
      value: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) this.tableData.push(this.$route.query)
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    hideisorno() {
      console.log(111)
      if (this.tableData.length > this.page.size) {
        console.log(this.tableData.length, this.page.size)
        return (this.value = true)
      } else {
        return (this.value = false)
      }
    },
    delete01(id) {
      console.log(id)
      this.tableData = this.tableData.filter((item) => {
        return item.id !== id
      })
    },
    searchData() {
      console.log(this.input1, this.tableData)
      let input1 = this.input1

      // console.log(Array.isArray(this.tableData))
      // this.tableData = this.tableData.push(

      // )
      let arr = []
      let res = this.tableData.forEach((item) => {
        if (item.date === input1) arr.push(item)
      })
      this.tableData = arr
      console.log(res)
      this.tableData.push(res)
      console.log(this.tableData)
    },
    addOrder() {
      this.$router.push({
        path: '/admin/order/orderManagement',
        query: { id: this.tableData[this.tableData.length - 1].id }
      })
    },
    close() {
      this.dialogFormVisible = false
      this.form = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    },
    updateData() {
      this.tableData = this.tableData.map((item, index) => {
        if (item.id === this.form.id) return (this.tableData[index] = this.form)
        else return item
      })
      this.dialogFormVisible = false
      this.form = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    },
    update(id) {
      this.dialogFormVisible = true
      this.form.id = id
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 300px;
  height: 50px;
  margin-right: 50px;
  left: 10px;
}
.addData {
  width: 100px;
  height: 40px;
  float: right;
}
</style>
