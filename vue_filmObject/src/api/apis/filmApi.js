import { post, get } from '@/utils/http'

export const addFilm = (formData, params) => post('/local/film/addFilm', formData, { params })

export const changeFilmInfo = (formData, params) => post('/local/film/updateFilmInfo', formData, { params })

// axios.get的第二个参数如果是一个对象，并且这个对象有params属性，那么这个params属性会自动被拼接到url后面
export const filmList = async (params) => {
  // 解析传回来的数据
  const res = await get(`/local/film/filmList`, { params })
  for (const item of res.data) {
    Object.keys(item).forEach((key) => {
      try {
        item[key] = JSON.parse(item[key])
      } catch (err) {} // eslint-disable-line
    })
  }
  return res
}

// 删除电影可能是批量删除，所以这里的id参数可能是一个数组，因此使用了post请求
export const removeFile = (data, params) => post(`/local/film/removeFilm`, data, { params })
