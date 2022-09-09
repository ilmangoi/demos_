<template>
  <div>
    <!--
        列表数据加载组件
        loading: 如果为false数据加载完毕,true加载新数据
        finished: false没有完成，可以继续加载新数据，如果为true没有没有更多的数据了loading设置无效,只有finished为false时，loading设置才有效果
        load:加载事件
        如果你的列表高度没有达到屏幕高度，则它会继续向下加载，直到没有数据可，数据达到屏幕高度，则停止加载
      -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in nowPlayingFilmList" :key="item.filmId">
        <template #title>
          <film-item :info="item" @routerClick="goDetail" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComingSoonFilmListApi } from '@/api/filmApi'
import filmItem from './ui/filmItem'
export default {
  components: {
    filmItem
  },
  data() {
    return {
      nowPlayingFilmList: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    async onLoad() {
      let ret = await getComingSoonFilmListApi(this.page)
      // 有新数据
      if (ret.length > 0) {
        this.nowPlayingFilmList.push(...ret)
        this.loading = false
        this.page++
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

<style scoped lang="scss"></style>
