module.exports = (app) => {
  // !mock数据的样板，可以根据实际情况进行修改
  // !注意路由命名规范，应与所开发的页面名称对应
  app.post('/test', (req, res) => {
    res.json({
      code: 200,
      data: 'test'
    })
  })
}
