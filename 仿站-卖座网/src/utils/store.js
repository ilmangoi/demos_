class Store {
  // attrname 表示它是 sessionStorage 还是  localStorage
  // constructor(attrName = 'sessionStorage') {
  // session / local
  constructor(attrName = 'session') {
    this.attrName = attrName + 'Storage'
  }
  set(key, value) {
    if (typeof value == 'object') {
      value = JSON.stringify(value)
    }
    window[this.attrName].setItem(key, value)
  }

  get(key, defaultValue = '') {
    let value = window[this.attrName].getItem(key)
    // 为空时使用默认值
    value = value ? value : defaultValue
    // 判断是否为json字符串
    value = /[[{]/.test(value) ? JSON.parse(value) : value
    return value
  }

  remove(key) {
    sessionStorage.removeItem(key)
  }
}

export default Store
