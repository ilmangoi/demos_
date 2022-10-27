module.exports = {
  '/local': {
    target: 'http://10.9.46.214:3000',
    // target: 'http://192.168.43.54:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/local': ''
    }
  }
}
