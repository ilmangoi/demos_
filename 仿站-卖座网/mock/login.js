module.exports = (app) => {
  app.post('/soap/login', (req, res) => {
    // 获取post数据
    let buffer = []
    req.on('data', (chunk) => buffer.push(chunk))
    req.on('end', () => {
      let postData = Buffer.concat(buffer).toString('utf-8')
      res.send({
        code: 0,
        msg: 'ok',
        data: {
          nickname: '李四',
          body: JSON.parse(postData),
          token: 'fewejfwej;lfewj;fjfi;;ewfj;fjew;fjewl;fewjoifewj;ooejg'
        }
      })
    })
  })
}
