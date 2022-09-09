import { post } from '@/utils/http'
import config from '@/config/api/centerConfig'

export const doLoginApi = async (userData) => {
  let ret = await post(config.login, userData)
  console.log(ret)
  console.log(userData)
  return ret
}
