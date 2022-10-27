import axios from 'axios'
import settingConfig from '@/config/api/settings'
import Notify from './notification'
import route from '@/router'
import store from '@/store'

// 不直接使用axios对象，而且使用它创建的一个新的实例化对象
const instance = axios.create()

// 响应拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const res = err.response
    if (res.status === 401 && res.data.msg === 'token验证失败') {
      // 删除本地token,这样在下次跳转页面时，会经过路由守卫，这样路由守卫发现没有token就会跳转到登录页面
      store.commit('login/logoutMutation')
      Notify.info('用户凭据失效', '请重新登录')
      route.replace({ name: 'login' })
    }
    return Promise.reject(err.response.data)
  }
)

// 请求拦截器
instance.interceptors.request.use((config) => {
  config.timeout = settingConfig.timeout
  config.baseURL = settingConfig.baseUrl
  // 如果是访问登录以外的接口，则需要携带token
  if (config.url !== '/local/users/login') {
    config.headers['authorization'] = `Bearer ${store.getters.token}`
  }
  // 在生产环境中没有代理服务器，所以需要将请求地址中的local替换为空，否则请求会错误
  if (process.env.NODE_ENV !== 'development' && config.url.startsWith('/local')) {
    config.url = config.url.replace('/local', '')
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
