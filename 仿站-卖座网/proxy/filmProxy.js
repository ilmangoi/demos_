module.exports = {
  '/api': {
    target: 'https://api.iynn.cn/film',
    // 这个配置会把请求头中的host设置为target，从而绕过host同源检查
    changeOrigin: true,
    // 不需要重写,因为target请求地址中包含/api
    // https://api.iynn.cn/film/api/v1/getNowPlayingFilmList?cityId=110100&pageNum=1&pageSize=10
    pathRewrite: {
      // '^/api': ''
    }
  }
}
