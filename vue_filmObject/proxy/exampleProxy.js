module.exports = {
  '/example': {
    target: 'https://example.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^/example': ''
    }
  }
}
