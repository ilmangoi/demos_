module.exports = (app) => {
  app.post('/login', (req, res) => {
    let data = ''
    req.on('data', (_chunk) => {
      data += _chunk
    })
    req.on('end', () => {
      res.json({
        code: 200,
        data: JSON.parse(data)
      })
    })
  })
}
