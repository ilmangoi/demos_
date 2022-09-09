export default function (axios) {
  // axios全局配置
  axios.defaults.baseURL = 'http://10.9.46.214:3000'
  // 设置超时时间 ms
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  // axios.defaults.headers.token = 'aaaaa'

  // 拦截器  ==> 中间件
  // 请求拦截器  回调函数中的config对象一定要return出去
  axios.interceptors.request.use((config) => {
    if (config.method === 'get') {
      config.headers.token = 'abc'
    }
    return config
  })

  // 响应拦截器
  axios.interceptors.response.use(
    (res) => {
      if (res.status === 200) return res.data
    },
    (err) => Promise.reject(err)
  )
}
