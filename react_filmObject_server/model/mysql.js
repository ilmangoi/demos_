var mysql = require("mysql");

class Model {
  static _instance;
  connectPool;
  connection;

  constructor() {
    this.connectPool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "cms",
      port: 3306,
    });
  }

  static get instance() {
    return this._instance || (this._instance = new Model());
  }

  getConnection() {
    return new Promise((resolve) => {
      this.connectPool.getConnection((err, connection) => {
        if (err) {
          throw err;
        } else {
          resolve(connection);
        }
      });
    });
  }

  async sqlQuery(sql, load) {
    if (!this.connection) this.connection = await this.getConnection();

    return new Promise((resolve, reject) => {
      this.connection.query(sql, load, (err, result) => {
        if (err) {
          console.log(sql);
          console.log(load);
          throw new Error(err);
          resolve(null);
        } else {
          resolve(result);
        }
      });
    });
  }

  async beginTransaction() {
    if (!this.connection) this.connection = await this.getConnection();

    const result = {
      commit: this.connection.commit.bind(this.connection),
      rollback: this.connection.rollback.bind(this.connection),
    };

    return new Promise((resolve) => {
      this.connection.beginTransaction((err) => {
        if (err) resolve(null);
        else resolve(result);
      });
    });
  }

  async getTotalCount(tableName) {
    const result = await this.sqlQuery(`SELECT COUNT(*) FROM \`${tableName}\``);
    return result[0]["COUNT(*)"];
  }
}

module.exports = Model;
