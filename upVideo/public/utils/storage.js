class Storage {
  constructor(attrName = "session") {
    this.attrName = attrName + "Storage";
  }

  set(key, value) {
    if (/(Array|Object)/.test({}.toString.call(value))) {
      value = JSON.stringify(value);
    }
    if (typeof value !== "string" && typeof value !== "number") {
      throw new Error("存储的类型只能为 数组、对象、数字、字符串");
    }
    window[this.attrName].setItem(key, value);
  }

  get(key, defaultValue = "") {
    let value = window[this.attrName].getItem(key);
    if (value) {
      // 对象或数组 { 或 [开头
      if (/^\{|\[/.test(value)) {
        value = JSON.parse(value);
      }
      return value;
    }
    return defaultValue;
  }

  remove(key) {
    window[this.attrName].getItem(key) && window[this.attrName].removeItem(key);
  }

  has(key) {
    return window[this.attrName].getItem(key) ? true : false;
  }
}

export default Storage;
