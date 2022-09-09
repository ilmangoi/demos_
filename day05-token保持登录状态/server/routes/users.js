var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Redis = require("../utils/redis.js");

//  何时返回token  要根据自己的业务逻辑
router.post("/login", function (req, res) {
  // 定义管理员账号密码
  const admin = {
    username: "admin",
    password: "123456",
  };
  const { username, password } = req.body;
  const data = Redis.instance.getData(username);
  // 如果用户输入错误次数超过3次，返回错误信息
  if (data && data.numOfErr >= 3) {
    const time = (data.expires.getTime() - new Date().getTime()) / 1000 / 60 / 60;
    return res.status(401).send({ msg: `错误次数过多\n请${parseInt(time)}小时后再试` });
  }
  // 如果用户输入的账号密码错误，增加错误次数并返回错误信息
  if (username !== admin.username || password !== admin.password) {
    const data = Redis.instance.setData(username);
    const msg =
      data.numOfErr > 2
        ? "用户名或密码输入错误\n请24小时后重试"
        : `用户名或密码输入错误\n您还有${3 - data.numOfErr}次机会`;
    return res.status(401).send({ msg });
  }
  // 如果用户输入的账号密码正确，清除data并返回token
  if (data) Redis.instance.delData(username);
  res.json({
    result: "ok",
    token: jwt.sign(
      {
        name: "admin",
        data: "=============",
      },
      global.PrivateKey,
      {
        expiresIn: 60 * 60 * 24, // 24小时过期
      }
    ),
  });
});

router.get("/info", function (req, res) {
  res.json({
    name: req.auth,
  });
});

module.exports = router;
