import { post } from '@/utils/http'

// 登录
export const doLoginApi = (userData) => post('/login', userData)
