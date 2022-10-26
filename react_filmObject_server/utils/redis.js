class Redis {
  static _instance;
  cache = new Map();
  id;

  constructor() {
    // 定时清除过期session
    this.id = global.setInterval(() => {
      for (const data of this.cache.values()) {
        if (data.expires.getTime() < new Date().getTime()) {
          this.deleteData(data.username);
        }
      }
    }, 1000 * 60 * 60);
  }

  static get instance() {
    return Redis._instance || (Redis._instance = new Redis());
  }

  closeInterval() {
    // 如果不关闭定时器，会导致内存泄漏
    global.clearInterval(this.id);
  }

  setData(username) {
    for (const key of this.cache.keys()) {
      if (key === username) {
        const data = this.cache.get(key);
        data.numOfErr++;
        return data;
      }
    }
    const data = {
      username,
      numOfErr: 1,
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
    };
    this.cache.set(username, data);
    return data;
  }

  getData(username) {
    return this.cache.get(username);
  }

  deleteData(username) {
    this.cache.delete(username);
  }
}

module.exports = Redis;
