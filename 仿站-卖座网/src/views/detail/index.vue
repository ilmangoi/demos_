<template>
  <div>
    <template v-if="film == null">
      <!--
        请求完成前使用显示loading动画，如果这时候直接渲染页面，会导致报错
        因为请求完成前，film是null，而页面中使用了film.title
      -->
      <loading-cmp />
    </template>
    <template v-else>
      <div class="wrapper">
        <!-- 顶层导航 -->
        <van-nav-bar :title="film.name" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- 图片展示 -->
        <div class="poster">
          <van-swipe>
            <van-swipe-item v-for="(image, index) in film.photos" :key="index">
              <img v-lazy="image" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 电影描述 -->
        <div class="film-detail">
          <div class="col">
            <div class="film-name">
              <span class="name">{{ film.name }}</span
              ><span class="item">2D</span>
            </div>
            <div class="film-grade">
              <span class="grade"></span>
            </div>
          </div>
          <div class="film-category grey-text">喜剧 | 剧情</div>
          <div class="film-premiere-time grey-text">2022-09-09上映</div>
          <div class="film-nation-runtime grey-text">中国大陆 | 111分钟</div>
          <div class="film-describe grey-text">{{ film.synopsis }}</div>
        </div>
        <!-- 演职人员 -->
        <div class="actors">
          <div>演职人员</div>
          <div>
            <div v-for="(actor, index) in film.actors" :key="index">
              <img :src="actor.avatarAddress" alt="" />
              <div>{{ actor.name }}</div>
              <div>{{ actor.role }}</div>
            </div>
          </div>
        </div>
        <!-- 选座 -->
        <div class="goSchedule">选座购票</div>
      </div>
    </template>
  </div>
</template>

<script>
import { getFilmInfoApi } from '@/api/filmApi'

export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      film: null
    }
  },
  async mounted() {
    this.film = await getFilmInfoApi(this.id)
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  },
  // 进入详情页时，隐藏footer
  created() {
    // 1.直接找到root根组件下面唯一的子组件，修改里面的数据
    // this.$root.$children[0].isShowFooter = false
    // 2.通过事件总线修改数据
    // this.$bus.$emit('isShowFooter', false)
    // 3.通过vuex修改数据
    // this.$store.commit('setIsShowFooter', false)
  },
  beforeDestroy() {
    // this.$root.$children[0].isShowFooter = true
    // this.$bus.$emit('isShowFooter', true)
    // this.$store.commit('setIsShowFooter', true)
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep {
//   .van-nav-bar {
//     position: fixed !important;
//     left: 0px;
//     top: 0px;
//     width: 100vw;
//   }
// }
.wrapper {
  background: #ccc;

  .poster {
    width: 100vw;
    height: 210px;
    overflow: hidden;
    margin-top: 46px;

    .van-swipe {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    font-size: 13px;
    color: #797d82;
    text-align: left;

    .film-name {
      font-size: 18px;
      color: #191a1b;
    }

    .film-describe {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  .actors {
    margin-top: 10px;
    margin-bottom: 49px;
    background: #fff;

    > div:first-child {
      font-size: 16px;
      color: #191a1b;
      padding: 10px;
    }

    > div:last-child {
      display: flex;
      width: 100vw;
      overflow-x: auto;

      // 让滚动条隐藏起来
      &::-webkit-scrollbar {
        width: 0;
      }

      > div {
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        margin: 10px;
        img {
          flex: 8;
          width: 100%;
          height: 100%;
        }
        div {
          flex: 1;
          font-size: 13px;
        }
      }
    }
  }

  .goSchedule {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
  }
}
</style>
