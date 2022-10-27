import { get } from '@/utils/http'
import { getFormatDate, isObject } from '@/utils/tools'

export const pvRecord = (page) => get(`/local/pv/pvRecord/${page}`)

export const pvGet = () => get('/local/pv/getPv')

export const getLoginLog = async (params) => {
  let { data } = await get('/local/pv/getLoginLog', { params })
  if (Array.isArray(data)) {
    data = cleanData(data)
  } else if (isObject(data)) {
    for (const key in data) {
      data[key] = cleanData(data[key])
    }
  }
  return data
}

const cleanData = (data) => {
  for (const item of data) {
    const date = new Date(item.loginTime)
    item.loginTime = getFormatDate(date) // 格式化时间
    item.ip = /(?<ip>\d*\.\d*\.\d*\.\d*)/.exec(item.ip).groups.ip // 提取ip
  }
  return data.reverse()
}
