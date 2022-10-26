var express = require("express");
var model = require("../model/mysql.js");
var router = express.Router();

router.get("/getTotal", async function (req, res) {
  const result = await model.instance.getTotalCount(req.query.tableName);
  res.status(200).json({
    msg: "ok",
    code: 0,
    data: result,
  });
});

module.exports = router;
