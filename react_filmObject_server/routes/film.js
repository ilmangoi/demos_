var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var model = require("../model/mysql.js");

router.post("/removeFilm", async function (req, res, next) {
  const { id } = req.body;
  const { table } = req.query;
  let condition = `id=${id}`;
  if (Array.isArray(id)) condition = `id IN (${id.join(",")})`;
  const result = await model.instance.sqlQuery(`DELETE FROM \`${table}\` WHERE ${condition}`);
  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.get("/filmList", async function (req, res) {
  let { page, limit, keyword, table } = req.query;
  page = page ?? 1;
  limit = limit ?? 10;
  const offset = (page - 1) * limit;

  let sqlStr;
  if (keyword) {
    sqlStr = `SELECT * FROM \`${table}\` 
    WHERE \`name\` LIKE '%${keyword}%' OR
    \`category\` LIKE '%${keyword}%' OR
    \`actor\` LIKE '%${keyword}%' OR
    \`synopsis\` LIKE '%${keyword}%'
    ORDER BY \`id\` DESC;`;
  } else {
    sqlStr = `SELECT * FROM \`${table}\` ORDER BY \`id\` DESC LIMIT ${limit} OFFSET ${offset};`;
  }
  const result = await model.instance.sqlQuery(sqlStr);

  res.status(200).json({
    msg: "ok",
    code: 0,
    data: result,
  });
});

const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/poster"));
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});
const uploader = multer({ storage: storage }).any();

router.post("/addFilm", uploader, async function (req, res, next) {
  const { table } = req.query;
  req.body.poster = JSON.stringify(
    req.files.map((file) => `http://10.9.46.214:3000/public/images/poster/${file.filename}`)
  );
  const data = Object.values(req.body);
  data.unshift(Object.keys(req.body));

  const result = await model.instance.sqlQuery(
    `INSERT INTO \`${table}\` (??) VALUES (${Array(data.length - 1)
      .fill("?")
      .join(",")});`,
    data
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

router.post("/updateFilmInfo", uploader, async function (req, res, next) {
  const { table } = req.query;
  const condition = `id=${req.body.id}`;
  const fieldStr = "?? = ?";
  const data = Object.entries(req.body);

  const result = await model.instance.sqlQuery(
    `UPDATE \`${table}\` SET ${data.map(() => fieldStr).join(",")} WHERE ${condition};`,
    data.flat()
  );

  res.status(200).json({
    msg: "ok",
    code: 0,
  });
});

module.exports = router;
