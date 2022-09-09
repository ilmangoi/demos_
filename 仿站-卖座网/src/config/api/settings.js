export default {
  timeout: 10000,
  // vue-cli中配置了cross-env，所以可以使用process.env.NODE_ENV
  baseUrl: process.env.NODE_ENV === 'development' ? '' : 'https://api.iynn.cn'
}
