import { get } from '@/utils/http'

export const getTotal = (tableName) => get(`/local/common/getTotal`, { params: { tableName } })
