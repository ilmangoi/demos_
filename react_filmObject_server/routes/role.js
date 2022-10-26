var express = require("express");
var router = express.Router();
var model = require("../model/mysql.js");
var path = require("path");

router.get("/roleList", async function (req, res) {
  const sqlStr = `SELECT \`id\`,\`name\`,\`description\` FROM \`role\` WHERE 1;`;
  const result = await model.instance.sqlQuery(sqlStr);

  res.status(200).json({
    msg: "ok",
    code: 0,
    data: result,
  });
});

router.get("/removeRole", async function (req, res) {
  const sqlStr = `DELETE FROM \`role\` WHERE id=${req.query.id}`;
  const result = await model.instance.sqlQuery(sqlStr);
  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/addRole", async function (req, res, next) {
  const data = Object.values(req.body);
  data.unshift(Object.keys(req.body));

  const result = await model.instance.sqlQuery(
    `INSERT INTO \`role\` (??) VALUES (${Array(data.length - 1)
      .fill("?")
      .join(",")});`,
    data
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/updateRole", async function (req, res, next) {
  const condition = `id=${req.body.id}`;
  const fieldStr = "?? = ?";
  const data = Object.entries(req.body);

  const result = await model.instance.sqlQuery(
    `UPDATE \`role\` SET ${data.map(() => fieldStr).join(",")} WHERE ${condition};`,
    data.flat()
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

module.exports = router;
