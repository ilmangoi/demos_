const mysql = require("mysql");
// 连接数据库,以数据库连接池的方案来，这样效率会更高一些
const db = mysql.createPool({
  connectionLimit: 2, // 创建多少个连接句柄(连接池中保持连接状态的连接数)
  database: "weChat", // 数据库的名称
  user: "root", // 连接数据库的账号
  password: "123456", // 连接数据库的密码
});

// 查询第一条匹配的记录
const first = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// 查询所有匹配的记录
const all = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  first,
  all,
};
