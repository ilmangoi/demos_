<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/order' }">>返回</el-breadcrumb-item>
    </el-breadcrumb>
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        date: '',
        number: '',
        totalprice: '',
        type: '',
        status: '',
        address: ''
      }
    }
  },
  mounted() {
    this.form.id = Number(this.$route.query.id) + 1
  },
  methods: {
    onSubmit() {
      console.log(this.form),
        this.$router.push({
          path: '/admin/order/orderAmend',
          query: this.form
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  left: 100px;
}
.selectedOption {
  width: 400px;
  height: 50px;
}
.inputData {
  width: 600px;
  height: 50px;
}
</style>
