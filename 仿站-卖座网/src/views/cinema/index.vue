<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="影院" :left-text="cityname" @click-left="onClickLeft" />
    <!-- 下拉检索 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item @change="dropdownChange" v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <!-- 列表展示 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <template v-if="list.length === 0">
        <van-skeleton v-for="item in 20" :key="item" title :row="2" />
      </template>
      <template v-else>
        <van-cell v-for="item in list" :key="item.cinemaId">
          <template #title>
            <items :itemData="item" />
          </template>
        </van-cell>
      </template>
    </van-list>
  </div>
</template>

<script>
import items from './ui/cinemaItem.vue'
import { getCinemaListApi } from '@/api/cinemaApi'
export default {
  components: {
    items
  },
  data() {
    return {
      value1: 0,
      value2: 'a',
      value3: '11111',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '最近去过', value: '11111' },
        { text: '222222', value: '2222' },
        { text: '33333', value: '33333' }
      ],
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {
    cityname() {
      return this.$store.getters.cityname
    }
  },
  mounted() {
    // 由于骨架屏的存在，把页面占满了，导致van-list不会主动去触发load事件
    // 所以在页面加载时，先请求一次数据
    this.onLoad()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/city')
    },
    dropdownChange(value) {
      // 它会在下拉菜单的值发生改变时触发，返回当前选中项的值
      // 可以用作筛选电影院，这里把筛选条件用query字符串传给后端
      getCinemaListApi(this.page, { value3: value }).then((ret) => console.log(ret))
    },
    async onLoad() {
      let ret = await getCinemaListApi(this.page)
      if (ret.length > 0) {
        this.list.push(...ret)
        this.page++
        this.loading = false
      } else {
        this.finished = true
        this.$toast({
          message: '没有更多的数据',
          duration: 1500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-dropdown-menu {
  margin-top: 46px;
}
</style>
