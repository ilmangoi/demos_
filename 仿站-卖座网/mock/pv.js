module.exports = (app) => {
  app.post('/soap/pv/:id', (req, res) => {
    res.send({
      code: 0,
      msg: 'ok',
      data: req.params.id
    })
  })
}
