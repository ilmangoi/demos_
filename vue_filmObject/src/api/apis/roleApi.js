import { get, post } from '@/utils/http'

export const roleList = (params) => get('/local/role/roleList', { params })

export const removeRole = (params) => get(`/local/role/removeRole`, { params })

export const addRole = (payload) => post('/local/role/addRole', payload)

export const updateRole = (payload) => post('/local/role/updateRole', payload)
