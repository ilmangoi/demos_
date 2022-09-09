import { get, post } from '@/utils/http'
import config from '@/config/api/filmApiConfig'

// 正在热映列表
export const getNowPlayingFilmListApi = async (page = 1) => {
  let ret = await get(config.getNowPlayingFilmList + page)
  let films = ret.data.films
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(
  //       films.map((item) => ({
  //         ...item,
  //         // actors可能是undefined,所以要判断一下
  //         actorsStr: item.actors?.reduce((prev, { name }) => (prev += name + ','), '').slice(0, -1)
  //       }))
  //     )
  //   }, 1000)
  // })
  return films.map((item) => ({
    ...item,
    actorsStr: item.actors?.reduce((prev, { name }) => (prev += name + ','), '').slice(0, -1)
  }))
}

// 即将上映
export const getComingSoonFilmListApi = async (page = 1) => {
  // 进行网络请求得到正在热映列表数据
  let ret = await get(config.getComingSoonFilmList + page)
  // 正在热映列表数据 数组
  let films = ret.data.films
  return films.map((item) => ({
    ...item,
    actorsStr: item.actors?.reduce((prev, { name }) => (prev += name + ','), '').slice(0, -1)
  }))
}

// 电影详情
export const getFilmInfoApi = async (id) => {
  let ret = await get(config.getFilmInfo + id)
  return ret.data.film
}

// pv收集接口，接口是假的，定义在middleware中
export const detailPvApi = async (id) => {
  let ret = await post(config.detailPv + '/' + id)
  return ret
}
