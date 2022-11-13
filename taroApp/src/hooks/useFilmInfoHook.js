import { useState, useEffect } from 'react'
import { get } from '../utils/http'
import Taro, { useRouter } from '@tarojs/taro'

const useFilmInfoHook = () => {
  const [data, setData] = useState(null)
  const [id, setId] = useState(null)
  const router = useRouter()
  useEffect(() => {
    let id = router.params.id
    get(`https://api.iynn.cn/film/api/v1/getFilmInfo?cors=T&filmId=${id}`).then(ret => {
      setData(ret.data.data.film)
      setId(id)
    })
  }, [])
  return [id, data]
}

export default useFilmInfoHook
