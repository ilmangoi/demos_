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
