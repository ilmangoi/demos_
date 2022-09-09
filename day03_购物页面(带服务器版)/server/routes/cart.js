const express = require('express')
const fsp = require('fs/promises')
const path = require('path')
const router = express.Router()

/* GET users listing. */
router.post('/change', function (req, res, next) {
  fsp
    .writeFile(path.join(__dirname, '../public/database/shoppingList.json'), JSON.stringify(req.body))
    .then(() => {
      res.status(200).send('respond with a resource')
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

module.exports = router
