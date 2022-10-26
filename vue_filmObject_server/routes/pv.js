var express = require("express");
var PvRecord = require("../utils/pvRecord.js");
var fs = require("fs");
var path = require("path");
const readline = require("readline");
var Tools = require("../utils/tools.js");
var router = express.Router();

const template = [
  {
    itemStyle: {
      color: "#5470C6",
    },
  },
  {
    itemStyle: {
      color: "#728AE3",
    },
  },
  {
    itemStyle: {
      color: "#8FA4FF",
    },
  },
  {
    itemStyle: {
      color: "#ACC0FF",
    },
  },
  {
    itemStyle: {
      color: "#CADCFF",
    },
  },
];

router.get("/pvRecord/:page", function (req, res) {
  PvRecord.instance[req.params.page]();
  res.send(req.params.page);
});

router.get("/getPv", function (req, res) {
  const record = JSON.parse(fs.readFileSync(path.join(__dirname, "../log/pv.json")).toString());
  const xAxisData = Object.keys(record);
  const seriesData = Object.values(record).map((count, index) => Object.assign(template[index], { value: count }));
  res.json({
    msg: "ok",
    code: 0,
    data: {
      xAxisData,
      seriesData,
    },
  });
});

router.get("/getLoginLog", async function (req, res) {
  const date = req.query?.date ? new Date(+req.query.date) : new Date();
  let loginLog;
  if (!req.query?.endDate) {
    loginLog = await getLoginLog(date);
  } else {
    const endDate = new Date(+req.query.endDate);
    loginLog = {};
    while (true) {
      const res = await getLoginLog(date);
      loginLog[Tools.dateStr(date)] = res; // 将当天的登录日志记录保存到 loginLog 对象中
      date.setDate(date.getDate() + 1); // 将日期加一天
      if (date.getDate() > endDate.getDate()) break; // 如果日期大于结束日期，跳出循环
    }
  }
  res.json({
    msg: "ok",
    code: 0,
    data: loginLog,
  });
});

const getLoginLog = (date) => {
  return new Promise((resolve) => {
    const filePath = path.join(__dirname, `../log/loginLog/${Tools.dateStr(date)}.log`);
    if (!fs.existsSync(filePath)) return resolve([]); // 如果文件不存在，直接返回空数组
    let fRead = fs.createReadStream(filePath); // 创建可读流，读取文件
    const objReadline = readline.createInterface({
      input: fRead,
      terminal: false,
    });

    const records = [];
    objReadline.on("line", (strLine) => {
      const [ip, username, userAgent, loginTime] = strLine.split(" - ");
      records.push({ ip, username, userAgent, loginTime });
      // if (--count <= 0) {
      //   // rl.close() 方法会关闭 readline.Interface 实例，并放弃对 input 和 output 流的控制
      //   objReadline.close();
      //   // 调用 rl.close() 不会立即停止 readline.Interface 实例触发
      //   // 的其他事件（包括 'line'）,因此这里移除所有的监听事件
      //   objReadline.removeAllListeners();
      // }
    });
    objReadline.on("close", () => {
      resolve(records);
    });
  });
};

module.exports = router;
