<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/oms' }">订单</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/oms/addorder' }">添加订单</el-breadcrumb-item>
    </el-breadcrumb>
    <AddList :titlelist="titlelist" @onSubmit="Addorder" />
  </div>
</template>

<script>
// import AddList from '@/globalcmp/add_list'
import { post } from '@/utils/http'
export default {
  // components: {
  //   AddList
  // },
  data() {
    return {
      titlelist: [
        {
          title: '编号',
          name: 'order_id',
          width: 80
        },
        {
          title: '订单编号',
          name: 'order_number',
          width: 80
        },
        {
          title: '下单时间',
          name: 'order_time',
          width: 80
        },
        {
          title: '下单用户',
          name: 'order_user',
          width: 80
        },
        {
          title: '订单总价',
          name: 'order_price',
          width: 80
        },
        {
          title: '支付方式',
          name: 'order_pay',
          width: 80
        },
        {
          title: '订单状态',
          name: 'order_state',
          width: 80
        }
      ]
    }
  },
  methods: {
    async Addorder(item) {
      let data = JSON.stringify(item)
      let result = await post('/orderadd', data)
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped></style>
