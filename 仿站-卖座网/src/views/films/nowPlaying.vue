<template>
  <div>
    <!--
        List 组件通过 loading 和 finished 两个变量控制加载状态
        loading属性:
        如果为false表示数据加载完毕,true表示开始加载新数据，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true
        finished属性:
        false没有完成，可以继续加载新数据，如果为true没有没有更多的数据了loading设置无效,只有finished为false时，loading设置才有效果
        load:加载事件
        如果你的列表高度没有达到屏幕高度，则会触发load事件，直到没有数据，如果数据达到屏幕高度，则不会再触发load事件
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
import { getNowPlayingFilmListApi } from '@/api/filmApi'
import filmItem from './ui/filmItem'
export default {
  components: {
    filmItem
  },
  data() {
    return {
      nowPlayingFilmList: this.$store.state.film.nowPlaying,
      page: 1,
      loading: false,
      finished: false,
      init: true
    }
  },
  /**
   * 这里有一个问题，如果页面刷新，那么就会重新请求数据，这样就会导致数据重复
   * 解决方法就是把数据存储到vuex中集中管理，组件先使用vuex中的数据进行渲染，
   * 如果vuex中没有数据，再去请求数据
   *
   * 下面的代码就是判断vuex中是否有数据，如果没有数据，再主动执行一次onLoad函数
   * 由于onLoad处理函数是异步函数，并且是在mounted生命周期中调用的，所以它的触发
   * 一定是早于van-list组件触发的，这样当把this.init设为false后，van-list组件
   * 触发load事件后其实是不会执行的，因为onLoad函数中进行了判断，这样就避免了重复请求
   * 在请求完成后，再把init值设为true，这样load事件触发后就可以正常运行了
   *
   * 如果vuex中有数据，则init值默认为true，不会发生改变，load事件正常触发运行
   */
  // 其实这个问题可以通过keep-alive组件来解决，但是这里为了演示vuex的使用，就不用keep-alive组件了
  async mounted() {
    if (this.$store.state.film.nowPlaying.length == 0) {
      this.onLoad()
      this.init = false
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    async onLoad() {
      if (this.init) {
        let ret = await getNowPlayingFilmListApi(this.page)
        // 有新数据
        if (ret.length > 0) {
          this.$store.commit('addNowPlayingFilmList', ret)
          // 使用vuex中的数据进行渲染，这里就不需要了
          // this.nowPlayingFilmList.push(...ret)
          this.loading = false
          this.page++
          this.init = true
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
}
</script>

<style scoped lang="scss"></style>
