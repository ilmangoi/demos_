var express = require("express");
var router = express.Router();
var model = require("../model/mysql.js");
var path = require("path");

router.get("/permissionList", async function (req, res) {
  const sqlStr = `SELECT * FROM \`permission\` WHERE 1;`;
  const result = await model.instance.sqlQuery(sqlStr);

  res.status(200).json({
    msg: "ok",
    code: 0,
    data: result,
  });
});

router.get("/removePermission", async function (req, res) {
  const sqlStr = `DELETE FROM \`permission\` WHERE id=${req.query.id}`;
  const result = await model.instance.sqlQuery(sqlStr);
  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/addPermission", async function (req, res, next) {
  const data = Object.values(req.body);
  data.unshift(Object.keys(req.body));

  const result = await model.instance.sqlQuery(
    `INSERT INTO \`permission\` (??) VALUES (${Array(data.length - 1)
      .fill("?")
      .join(",")});`,
    data
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/updatePermission", async function (req, res, next) {
  const condition = `id=${req.body.id}`;
  const fieldStr = "?? = ?";
  const data = Object.entries(req.body);

  const result = await model.instance.sqlQuery(
    `UPDATE \`permission\` SET ${data.map(() => fieldStr).join(",")} WHERE ${condition};`,
    data.flat()
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

module.exports = router;
