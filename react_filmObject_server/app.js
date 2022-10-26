var createError = require("http-errors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var { expressjwt } = require("express-jwt");
var Tools = require("./utils/tools.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var filmRouter = require("./routes/film");
var pvRouter = require("./routes/pv");
var userInfoRouter = require("./routes/userInfo");
var commonRouter = require("./routes/common");
var roleRouter = require("./routes/role");
var permissionRouter = require("./routes/permission");
var static = require("./routes/static");

var app = express();

// 静态文件不需要token验证，所以写在token验证之前
app.use("/public", express.static(path.join(__dirname, "public")));

// 验证token是否过期并规定哪些路由不用验证
global.PrivateKey = "hello  BigManing"; //加密token 校验token时要使用
app.use(
  expressjwt({
    secret: global.PrivateKey,
    algorithms: ["HS256"],
  }).unless({
    path: ["/users/login", "/static/uploadImg"], //除了这个地址，其他的URL都需要验证
  })
);

// 记录登录日志
const loginLogPath = path.join(__dirname, "log/loginLog", `${Tools.dateStr(new Date())}.log`);
const accessLogStream = fs.createWriteStream(loginLogPath, {
  flags: "a", // 以追加的方式写入文件末尾
});
app.use(
  logger("[:remote-addr] - :req[X-Request-User] - :user-agent - :date[web] ", {
    skip: function (req, res) {
      return req.originalUrl !== "/users/login";
    },
    stream: accessLogStream,
  })
);

// app.use(function (req, res, next) {
//   // 定义 不用token 的api（unless）
//   if (req.originalUrl.indexOf("/getToken") >= 0) {
//     return next();
//   }
//   //定义 用token的api  对其验证
//   var token = rq.body.token || rq.query.token || rq.headers["x-access-token"];
//   jwt.verify(token, global.PrivateKey, function (err, decoded) {
//     if (err) {
//       // 返回错误信息
//       res.send({
//         success: false,
//         message:
//           "Failed to authenticate token. Make sure to include the " +
//           "token returned from /users call in the authorization header " +
//           " as a Bearer token",
//       });
//       return;
//     } else {
//       // 解析必要的数据（相应字段为定义token时的字段）
//       req.username = decoded.name;
//       req.data = decoded.data;
//       logger.debug(util.format("Decoded from JWT token: username - %s, orgname - %s", decoded.name, decoded.data));
//       return next();
//     }
//   });
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/film", filmRouter);
app.use("/pv", pvRouter);
app.use("/userinfo", userInfoRouter);
app.use("/role", roleRouter);
app.use("/permission", permissionRouter);
app.use("/common", commonRouter);
app.use("/static", static);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    //如果验证token失败，返回401
    res.status(401).send({
      msg: "token验证失败",
    });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
