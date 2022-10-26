var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var query = require("./utils/db"); // 导入数据库存查询方法
var session = require("cookie-session"); // 导入cookie-session模块

var app = express();

// session配置
app.use(
  session({
    name: "session_id",
    secret: "tRyw6vU!iMnzHD4x8jTxCXS7RjGiPhq31exwD2X0O$u7vrBULT$&JsgGUW&EE$4jbBFQAArPdmW18WA4c1kOe8*4NCYbZ2ZErW^",
  })
);

// view engine setup
app.engine("art", require("express-art-template"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 引入路由(把数据库查询方法传递给路由)
app.use(require("./routes")(query));

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
