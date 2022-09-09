<template>
  <ul>
    <template v-for="(item, index) of routerList" :key="index">
      <router-link :to="item.link">
        <li>
          <span>{{ item.name }}</span>
        </li>
      </router-link>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    routerList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #ccc;
    color: #409eff;
  }
}

ul {
  display: flex;
  flex-direction: column;
}
</style>
