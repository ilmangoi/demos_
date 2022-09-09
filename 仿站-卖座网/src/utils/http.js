import axios from 'axios'
import settingConfig from '@/config/api/settings'
import store from '@/store'

// 不直接使用axios对象，而且使用它创建的一个新的实例化对象
const instance = axios.create()

// 响应拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)

// 请求拦截器
instance.interceptors.request.use((config) => {
  config.timeout = settingConfig.timeout
  config.baseURL = settingConfig.baseUrl
  // 在请求拦截器中给所有的请求都加上cityid
  // 下面进行判断是因为有的请求接口地址中没有?
  if (config.url.includes('?')) {
    config.url += '&cityId=' + store.getters.cityid
  } else {
    config.url += '?cityId=' + store.getters.cityid
  }
  return config
})

/**
 * get请求
 * @param {string} url 请求的url地址
 * @param {object} config 额外的表求头信息的补充，可选
 * @returns Promise
 */
export const get = (url, config = {}) => instance.get(url, config)

/**
 * post请求
 * @param {string} url 请求的url地址
 * @param {object} data 请求体数据，可选 例：{id:1,name:'aaa'}
 * @param {object} config 额外的表求头信息的补充，可选
 * @returns Promise
 */
export const post = (url, data = {}, config = {}) => instance.post(url, data, config)
