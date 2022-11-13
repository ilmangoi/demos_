import Taro from '@tarojs/taro'

const request = (url, data = null, method = 'GET') => {
  return Taro.request({
    url,
    method,
    data
  })
}

export const get = url => request(url)
export const post = (url, data) => request(url, data, 'POST')

