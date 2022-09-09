export default {
  template: '#cart',
  data() {
    return {
      carts: []
    }
  },
  computed: {
    totalPrice() {
      return this.carts.reduce((prev, item) => {
        return prev + item.price * item.num
      }, 0)
    }
  },
  methods: {
    setNum(n, id) {
      const item = this.carts.find((item) => item.id === id)
      item.num += n
      item.num = Math.min(10, Math.max(1, item.num))
      this.$forceUpdate()
    },
    del(id) {
      if (confirm('确定删除咩？')) {
        const index = this.carts.findIndex((item) => item.id === id)
        this.carts.splice(index, 1)
      }
      this.uploadCart()
    },
    uploadCart() {
      window.axios.post('/cart/change', this.carts)
    }
  },
  mounted() {
    this.$bus.$on('addToShoppingCart', (data) => {
      const item = this.carts.find((item) => item.id === data.id)
      if (item) {
        this.setNum(1, data.id)
      } else {
        data.num = 1
        this.carts.push(data)
      }
      this.uploadCart()
    })
    window.axios.get('/database/shoppingList.json').then((res) => {
      this.carts = res
    })
  },
  beforeDestroy() {
    this.$bus.$off('addToShoppingCart')
  }
}
