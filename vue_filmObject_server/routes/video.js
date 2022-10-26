var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var crypto = require("crypto");

// 判断视频是否存在
router.get("/isVideoExist", function (req, res, next) {
  const { filename } = req.query;
  const videoPath = path.join(__dirname, "../public/video/trailer", filename);
  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.json({
        code: 0,
        msg: "视频不存在",
        data: false,
      });
    } else {
      res.json({
        code: 1,
        msg: "视频存在",
        data: {
          path: `http://localhost:9000/public/video/trailer/${filename}`,
        },
      });
    }
  });
});

const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/video/temp"));
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const uploader = multer({ storage });

// 把chunk字段的数据当做文件来接收
router.post("/uploadChunkFile", uploader.single("chunk"), (req, res) => {
  let upDir = path.resolve("public/video/temp"); // 得到存放文件的目录
  let dirname = req.body.filename.split("_").shift(); // 获取文件hash，以文件hash为目录名
  if (!fs.existsSync(path.join(upDir, dirname))) {
    // 判断当前目录下面有没有此目录，没有则创建
    fs.mkdirSync(path.join(upDir, dirname));
  }
  const oldFilepath = path.resolve(req.file.path);
  const newFilepath = path.join(path.dirname(oldFilepath), dirname, req.body.filename);
  fs.renameSync(oldFilepath, newFilepath); // 重命名文件，以客户端传来的filename为文件名
  res.send({
    code: 0,
    msg: "ok",
    data: {
      filename: req.body.filename,
    },
  });
});

router.get("/mergeChunkFile", (req, res) => {
  let hash = req.query.hash || ""; // 客户端传来文件hash
  let extName = req.query.ext || ""; // 文件拓展名
  let upDir = path.resolve("public/video/temp", hash);
  const newFilePath = path.resolve("public/video/trailer", `${hash}.${extName}`); // 解析出要合并出来文件的名称
  // 如果文件不存在，则创建，文件内容为一个buffer
  if (!fs.existsSync(newFilePath)) fs.writeFileSync(newFilePath, Buffer.from(""));
  // 如果要合并文件的临时目录不存在，则直接报错
  if (!fs.existsSync(upDir)) {
    return res.send({
      code: 404,
      msg: "文件未上传",
      data: null,
    });
  }
  // 读取目录下面的文件列表
  let dirs = fs.readdirSync(upDir);
  // 对文件进行排序，以客户端切片后给文件编的序号为升序（从0开始）
  dirs.sort((a, b) => {
    let n1 = +a.match(/\w+\_(\d+)\.\w+$/)[1];
    let n2 = +b.match(/\w+\_(\d+)\.\w+$/)[1];
    return n1 - n2;
  });
  for (let i = 0; i < dirs.length; i++) {
    let filename = dirs[i];
    const readFilePath = path.join(upDir, filename);
    // 追加内容（合并）
    fs.appendFileSync(newFilePath, fs.readFileSync(readFilePath));
  }
  // 递归删除目录[文件夹]
  fs.rmSync(upDir, { recursive: true });
  // 验证文件hash，如果不一致，则判定为文件上传的文件内容不完整，或已被篡改
  const video = fs.readFileSync(newFilePath);
  const videoDigest = crypto.createHash("md5").update(video).digest("hex");
  if (videoDigest !== hash) {
    fs.unlinkSync(newFilePath);
    return res.send({
      code: 100,
      msg: "文件上传失败",
      data: null,
    });
  }
  res.send({
    code: 0,
    msg: "ok",
    data: {
      path: `http://localhost:9000/public/video/trailer/${hash}.${extName}`,
    },
  });
});

module.exports = router;
