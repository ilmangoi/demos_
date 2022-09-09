<template>
  <div class="item">
    <div>
      <div>{{ itemData.name }}</div>
      <div>{{ itemData.address }}</div>
    </div>
    <div>
      <div>￥{{ itemData.lowPrice / 100 }}起</div>
      <div>距离未知</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemData']
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  > div:first-child {
    text-align: left;
    flex: 4;
    margin-bottom: 10px;
    font-size: 12px;
    color: #797d82;
    > div:first-child {
      font-size: 15px;
      color: #191a1b;
    }
  }
  > div:last-child {
    text-align: right;
    flex: 1;
    > div:first-child {
      font-size: 15px;
      color: #ff5f16;
    }
  }
}
</style>
