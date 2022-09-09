import { get } from '@/utils/http'
import config from '@/config/api/cityConfig'

export const getCitiesInfoApi = async () => {
  let ret = await get(config.getCitiesInfo)
  let cities = ret.data.cities
  let indexBar = {}
  for (let i = 65; i <= 90; i++) {
    indexBar[String.fromCharCode(i)] = []
  }
  for (let key in indexBar) {
    indexBar[key] = cities.filter((item) => item.pinyin[0].toUpperCase() === key)
    if (indexBar[key].length === 0) delete indexBar[key]
  }
  return indexBar
}
