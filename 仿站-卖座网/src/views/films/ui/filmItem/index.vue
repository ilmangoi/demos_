<template>
  <div class="item">
    <div class="left">
      <!--
        这里图片懒加载的原理是，当图片进入可视区域时，才会加载图片，这样可以减少图片的加载，提高性能
        在图片还没有进入可视区域时，v-lazy其实会把图片url放在一个data-src属性上，当图片进入可视区域时
        会把data-src的值赋值给src，这样就会加载图片
        在图片还没有加载完成时，会显示一个loading的图片，当图片加载完成后，才会把加载到的图片替换点位图
      -->
      <img v-lazy="info.poster" @click="goDetail(info.filmId)" />
    </div>
    <div class="middle">
      <div>{{ info.name }}</div>
      <div>
        <span>观众评分</span>
        <span>7.6</span>
      </div>
      <div>主演：{{ info.actorsStr }}</div>
      <div>中国大陆 | 150分钟</div>
    </div>
    <div class="right" @click="goDetail(info.filmId)">
      <span>购票</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  methods: {
    goDetail(id) {
      this.$emit('routerClick', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #797d82;
  font-size: 13px;
  position: relative;
  /* 用css完成一个移动端1px */
  // &::after {
  //   content: '';
  //   border-bottom: 1px solid #ccc;
  //   transform: scale(0.5);
  //   height: 1px;
  //   width: 200%;
  //   position: absolute;
  //   left: -190px;
  //   bottom: 0;
  // }

  .left {
    width: 77px;
    height: 100px;
    img {
      width: 66px;
      height: 100%;
      margin-right: 5px;
    }
  }

  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;

    div:nth-of-type(1) {
      color: #191a1b;
      font-size: 16px;
    }

    div:nth-of-type(3) {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .right {
    width: 50px;
    display: flex;
    align-items: center;

    span {
      border: 1px solid #ff5f16;
      background: white;
      color: #ff5f16;
      border-radius: 2px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      width: 50px;
      text-align: center;
    }
  }
}
</style>
