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
          userId: searchResult[0].id,
        },
        global.PrivateKey,
        {
          expiresIn: 60 * 60 * 24, // 24小时过期
        }
      ),
      userInfo: {
        username: searchResult[0].username,
        avatar: searchResult[0].avatar,
        roleId: searchResult[0].rid,
        userId: searchResult[0].id,
      },
      routes: [
        "/dashboard",
        "/users/account",
        "/users/role",
        "/users/auth",
        "/films/nowplaying",
        "/films/addNowplaying",
        "/films/comingsoon",
        "/order/indentList",
      ],
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

router.post("/menu", (req, res) => {
  res.send({
    code: 0,
    msg: "ok",
    data: [
      {
        path: "/dashboard",
        icon: "DashboardOutlined",
        name: "控制台",
      },
      {
        path: "/users",
        icon: "UserOutlined",
        name: "账号管理",
        children: [
          {
            path: "/users/account",
            name: "用户列表",
          },
          {
            path: "/users/role",
            name: "角色列表",
          },
          {
            path: "/users/auth",
            name: "权限列表",
          },
        ],
      },
      {
        path: "/films",
        icon: "BarsOutlined",
        name: "电影管理",
        children: [
          {
            path: "/films/nowplaying",
            name: "正在热映",
          },
          {
            path: "/films/comingsoon",
            name: "即将上映",
          },
        ],
      },
      {
        path: "/order",
        icon: "ProfileOutlined",
        name: "订单管理",
        children: [
          {
            path: "/order/indentList",
            name: "订单列表",
          },
        ],
      },
    ],
  });
});

module.exports = router;
