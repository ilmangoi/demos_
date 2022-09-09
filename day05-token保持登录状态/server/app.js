var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var { expressjwt } = require("express-jwt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

global.PrivateKey = "hello  BigManing"; //加密token 校验token时要使用
app.use(
  expressjwt({
    secret: global.PrivateKey,
    algorithms: ["HS256"],
  }).unless({
    path: ["/users/login"], //除了这个地址，其他的URL都需要验证
  })
);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    //如果验证token失败，返回401
    res.status(401).send({
      msg: "token验证失败",
    });
  }
});
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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
