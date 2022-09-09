<template>
  <div>
    <form action="/">
      <van-search
        v-model="kw"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="onInput"
        @cancel="onCancel"
      />
    </form>
    <van-divider />
    <template v-if="list.length == 0">
      <div class="history">
        <div class="title">最近搜索</div>
        <div>
          <van-tag v-for="item in histories" type="default" :key="item" @click="tagClickHandler">{{ item }}</van-tag>
        </div>
      </div>
    </template>
    <template v-else>
      <van-cell v-for="item in list" :key="item" :title="item" />
    </template>
  </div>
</template>

<script>
import Store from '@/utils/store'
const store = new Store('local')
export default {
  data() {
    return {
      kw: '',
      list: [],
      histories: store.get('histories', [])
    }
  },
  methods: {
    tagClickHandler(e) {
      this.kw = e.target.innerText
    },
    // 回车搜索，完成搜索功能
    onSearch(val) {
      // 如果发现搜索关键字已经在历史记录中，就不再重复添加
      let bool = this.histories.some((item) => item == val)
      if (!bool) {
        this.histories.unshift(val)
        this.histories.length = this.histories.slice(0, 10) // 只保留最近的10条记录
        store.set('histories', this.histories)
      }
    },
    onInput() {
      // 假数据
      this.list = new Array(20).fill('').map((_, index) => index + 1 + this.kw)
    },
    // 点击 取消 文字事件
    onCancel() {
      this.list = []
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  padding: 5px;
  font-size: 18px;
  text-align: left;
  .title {
    margin-bottom: 10px;
  }
  .van-tag--default {
    padding: 5px;
    margin-right: 10px;
  }
}
</style>
