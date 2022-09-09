import { get } from '@/utils/http'
import config from '@/config/api/cinemaConfig'
import { jsonToQuery, isEmptyObject } from '@/utils/tools'

// 影院列表
export const getCinemaListApi = async (page = 1, query = {}) => {
  let url = isEmptyObject(query) ? config.getCinemaList + page : config.getCinemaList + page + '&' + jsonToQuery(query)
  let ret = await get(url)
  return ret.data.cinemas
}
