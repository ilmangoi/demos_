export default {
  data() {
    return {
      navigateMap: []
    }
  },
  mounted() {
    this.navigateMap = this.$route.meta.navigateMap
  }
}
