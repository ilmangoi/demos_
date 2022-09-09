export default {
  template: '#goods',
  data() {
    return {
      goodsList: [
        { id: 1, imgSrc: './img/1.jpg', name: '商品名：悦花|得揽星河', price: 99 },
        { id: 2, imgSrc: './img/2.jpg', name: '商品名：悦花|得揽星河', price: 99 },
        { id: 3, imgSrc: './img/3.jpg', name: '商品名：悦花|得揽星河', price: 99 },
        { id: 4, imgSrc: './img/4.jpg', name: '商品名：悦花|得揽星河', price: 99 },
        { id: 5, imgSrc: './img/5.jpg', name: '商品名：悦花|得揽星河', price: 99 }
      ]
    }
  },
  methods: {
    clickFn(event) {
      const goodsId = Number(event.target.parentElement.getAttribute('keys'))
      const data = this.goodsList[goodsId - 1]
      this.$bus.$emit('addToShoppingCart', data)
    }
  },
  mounted() {
    window.axios.get('/database/goodsList.json').then((res) => {
      this.carts = res
    })
  }
}
