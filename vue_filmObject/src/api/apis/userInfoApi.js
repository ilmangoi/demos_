import { get, post } from '@/utils/http'

export const userinfoList = (params) => get('/local/userinfo/userinfoList', { params })

export const removeUserinfo = (payload) => post(`/local/userinfo/removeUserinfo`, payload)

export const addUserinfo = (formData) => post('/local/userinfo/addUserinfo', formData)

export const updateUserinfo = (formData) => post('/local/userinfo/updateUserinfo', formData)
