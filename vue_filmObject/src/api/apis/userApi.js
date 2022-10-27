import { post, get } from '@/utils/http'

// 登录，携带一个自定义头，用于后端记录日志
export const doLoginApi = (userData) => {
  return post('/local/users/login', userData, {
    headers: {
      'X-Request-User': userData.username
    }
  })
}

export const checkPermissionApi = (action) => post(`/local/users/checkPermission`, action)

export const checkRepeatName = (params) => get('/local/users/checkRepeatName', { params })
