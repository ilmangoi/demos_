export default {
  timeout: 10000,
  // VUE_APP_HOST是配置在.env.development和.env.production文件中的变量
  // vue-cli会根据当前的环境自动加载对应的文件，通过cross-env设置环境变量
  // 这样就可以根据不同的环境来设置不同的请求地址
  baseUrl: process.env.VUE_APP_HOST
}
