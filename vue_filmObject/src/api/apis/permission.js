import { get, post } from '@/utils/http'

export const permissionList = (params) => get('/local/permission/permissionList', { params })

export const removePermission = (params) => get(`/local/permission/removePermission`, { params })

export const addPermission = (payload) => post('/local/permission/addPermission', payload)

export const updatePermission = (payload) => post('/local/permission/updatePermission', payload)
