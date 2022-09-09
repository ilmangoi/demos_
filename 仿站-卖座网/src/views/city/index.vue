<template>
  <div>
    <van-nav-bar title="选择城市" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 城市列表 -->
    <van-index-bar :index-list="indexList">
      <template v-for="(item, key) in indexBar">
        <van-index-anchor :index="key" :key="key" />
        <template v-for="val in item">
          <van-cell @click="selectCity(val.cityId, val.name)" :title="val.name" :key="val.cityId" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { getCitiesInfoApi } from '@/api/cityApi'
export default {
  data() {
    return {
      indexBar: {}
    }
  },
  computed: {
    // 自定义索引列表，因为我们在筛选城市列表的时候，有的字母是没有对应的城市的，所以我们需要自定义索引列表
    indexList() {
      return Object.keys(this.indexBar)
    }
  },
  async created() {
    let ret = await getCitiesInfoApi()
    this.indexBar = ret
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    selectCity(id, name) {
      this.$store.commit('city/setCity', { cityid: id, cityname: name })
      this.$dialog
        .alert({
          message: '切换城市成功',
          confirmButtonText: '确定'
        })
        .then(() => {
          // 当关闭弹框时会触发
          this.$router.push('/cinema')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-index-bar {
  margin-top: 50px;
}
</style>
