class Storage {
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
    value = value ? value : defaultValue
    value = /[[{]/.test(value) ? JSON.parse(value) : value
    return value
  }

  remove(key) {
    window[this.attrName].removeItem(key)
  }
}

export default Storage
