var express = require("express");
var router = express.Router();
var model = require("../model/mysql.js");
var multer = require("multer");
var path = require("path");

router.get("/userinfoList", async function (req, res) {
  let { page, limit, keyword } = req.query;
  page = page ?? 1;
  limit = limit ?? 10;
  const offset = (page - 1) * limit;

  let sqlStr;
  const fieldStr = "`id`,`username`,`password`,`email`,`phonenumber`,`avatar`,`sex`";
  if (keyword) {
    sqlStr = `SELECT * FROM \`userinfo\` 
      WHERE \`username\` LIKE '%${keyword}%' OR
      \`phonenumber\` LIKE '%${keyword}%' OR
      \`email\` LIKE '%${keyword}%'
      ORDER BY \`id\` DESC;`;
  } else {
    sqlStr = `SELECT ${fieldStr} FROM \`userinfo\` ORDER BY \`id\` DESC LIMIT ${limit} OFFSET ${offset};`;
  }
  const result = await model.instance.sqlQuery(sqlStr);

  res.status(200).json({
    msg: "ok",
    code: 0,
    data: result,
  });
});

router.post("/removeUserinfo", async function (req, res) {
  const { id } = req.body;
  let condition = `id=${id}`;
  if (Array.isArray(id)) condition = `id IN (${id.join(",")})`;
  const result = await model.instance.sqlQuery(`DELETE FROM \`userinfo\` WHERE ${condition}`);
  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/avatar"));
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});
const uploader = multer({ storage: storage }).any();

router.post("/addUserinfo", uploader, async function (req, res, next) {
  // FormData.append方法会把所有的数据都转换成字符串
  req.body.sex = Number(req.body.sex);
  // 判断是否传头像了，如果没有传，则根据性别使用默认头像
  if (req.files.length) {
    req.body.avatar = `http://10.9.46.214:3000/public/images/avatar/${req.files[0].filename}`;
  } else {
    if (req.body.sex === 1) {
      req.body.avatar = `http://10.9.46.214:3000/public/images/avatar/male_default.webp`;
    } else if (req.body.sex === 2) {
      req.body.avatar = `http://10.9.46.214:3000/public/images/avatar/female_default.webp`;
    }
  }
  const data = Object.values(req.body);
  data.unshift(Object.keys(req.body));

  const result = await model.instance.sqlQuery(
    `INSERT INTO \`userinfo\` (??) VALUES (${Array(data.length - 1)
      .fill("?")
      .join(",")});`,
    data
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/updateUserinfo", uploader, async function (req, res, next) {
  const condition = `id=${req.body.id}`;
  const fieldStr = "?? = ?";
  const data = Object.entries(req.body);

  const result = await model.instance.sqlQuery(
    `UPDATE \`userinfo\` SET ${data.map(() => fieldStr).join(",")} WHERE ${condition};`,
    data.flat()
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

module.exports = router;
