var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Redis = require("../utils/redis.js");
var Model = require("../model/mysql.js");

//  何时返回token  要根据自己的业务逻辑
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const sqlStr = `SELECT * FROM \`userinfo\` WHERE \`username\`='${username}' AND \`password\`='${password}'`;
  const searchResult = await Model.instance.sqlQuery(sqlStr);
  const data = Redis.instance.getData(username);
  // 如果用户输入错误次数超过3次，返回错误信息
  if (data && data.numOfErr >= 3) {
    const time = (data.expires.getTime() - new Date().getTime()) / 1000 / 60 / 60;
    return res.status(401).send({ msg: `错误次数过多\n请${parseInt(time)}小时后再试` });
  }
  // 如果用户输入的账号密码错误，增加错误次数并返回错误信息
  if (searchResult.length === 0) {
    const data = Redis.instance.setData(username);
    const msg =
      data.numOfErr > 2
        ? "用户名或密码输入错误\n请24小时后重试"
        : `用户名或密码输入错误\n您还有${3 - data.numOfErr}次机会`;
    return res.status(401).send({ msg });
  }
  // 如果用户输入的账号密码正确，清除data并返回token
  if (data) Redis.instance.deleteData(username);
  res.json({
    code: 0,
    msg: "ok",
    data: {
      token: jwt.sign(
        {
          username: searchResult[0].username,
          roleId: searchResult[0].rid,
        },
        global.PrivateKey,
        {
          expiresIn: 60 * 60 * 24, // 24小时过期
        }
      ),
      userInfo: {
        username: searchResult[0].username,
        avatar: searchResult[0].avatar,
      },
      routes: ["/admin/dashboard", "/admin/films", "/admin/cinema", "/admin/order", "/admin/userManage"],
    },
  });
});

router.post("/checkPermission", function (req, res, next) {
  res.send({
    msg: "ok",
    code: 0,
    data: "allow", // allow, deny
  });
});

router.get("/checkRepeatName", async function (req, res, next) {
  const { table, name } = req.query;
  let condition;
  switch (table) {
    case "userinfo":
      condition = `username='${name}'`;
      break;
    case "role":
      condition = `name='${name}'`;
      break;
  }
  const sqlStr = `SELECT \`id\` FROM \`${table}\` WHERE ${condition}`;
  const searchResult = await Model.instance.sqlQuery(sqlStr);
  const data = searchResult.length === 0 ? false : true;
  res.send({
    msg: "ok",
    code: 0,
    data,
  });
});

router.get("/info", function (req, res) {
  res.json({
    msg: "ok",
    code: 0,
    data: req.auth,
  });
});

module.exports = router;
