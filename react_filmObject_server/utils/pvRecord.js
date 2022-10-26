const path = require("path");
const fs = require("fs");

class PvRecord {
  static _instance;
  record;
  recordFile = path.join(__dirname, "../log/pv.json");
  expire = new Date(Date.now() + 1000 * 60);
  constructor() {
    let pv = fs.readFileSync(this.recordFile, "utf-8");
    this.record = JSON.parse(pv);
  }

  static get instance() {
    return PvRecord._instance || (PvRecord._instance = new PvRecord());
  }

  execRecord() {
    // 节流操作，最少每分钟写入一次
    if (Date.now() > this.expire.getTime()) {
      console.log("record");
      fs.writeFileSync(this.recordFile, JSON.stringify(this.record));
      this.expire = new Date(Date.now() + 1000 * 60);
    }
  }

  films() {
    this.record.films++;
    this.execRecord();
  }

  cinema() {
    this.record.cinema++;
    this.execRecord();
  }

  dashboard() {
    this.record.dashboard++;
    this.execRecord();
  }

  order() {
    this.record.order++;
    this.execRecord();
  }

  userManage() {
    this.record.userManage++;
    this.execRecord();
  }
}

module.exports = PvRecord;
