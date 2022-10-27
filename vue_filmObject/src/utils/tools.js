export const isObject = (obj) => {
  return {}.toString.call(obj) === '[object Object]'
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 ? true : false
}

export const jsonToQuery = (obj) => {
  // 必须为对象
  if (!isObject(obj)) throw new Error('必须为对象')
  let str = ''
  // id=1&name=abc&
  for (let key in obj) {
    str += `${key}=${obj[key]}&`
  }
  return str.length === 0 ? str : str.slice(0, -1)
}

export const setJsonFieldToXlsxField = (data, field) => {
  if (Array.isArray(data)) {
    return switchField(data, field)
  }
  if (isObject(data)) {
    for (let key in data) {
      data[key] = switchField(data[key], field)
    }
    return data
  }
}

export const getFormatDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const switchField = (data, field) => {
  return data.map((item) => {
    let obj = {}
    for (let key in item) {
      obj[field[key]] = item[key]
    }
    return obj
  })
}
