import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { usePageScroll, useRouter, useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro'
import './index.css'
import Loading from '../../components/Loading'
import ShowDetail from '../../components/ShowDetail'

const Detail = () => {
  const [title, setTitle] = useState('')
  const [film, setFilm] = useState(null)
  // 通过hooks来得到当前的路由对象，获取数据
  const router = useRouter()

  useEffect(() => {
    let id = router.params.id
    Taro.request({
      url: `https://api.iynn.cn/film/api/v1/getFilmInfo?cors=T&filmId=${id}`
    }).then(ret => {
      setFilm(ret.data.data.film)
    })
  }, [])

  // 分享给朋友  ---
  useShareAppMessage(() => ({
    path: `/pages/detail/index?id=${this.id}`,
    imageUrl: 'http://img.1314000.cn/face.png',
    title: '一个关于冬瓜的故事'
  }))
  //   // 朋友圈
  //   onShareTimeline() {
  //     return {
  //       query: `?id=${this.id}`,
  //       imageUrl: 'http://img.1314000.cn/face.png',
  //       title: '一个关于冬瓜的故事 -- 朋友圈'
  //     }
  //   }
  //   // 收藏
  //   onAddToFavorites() {
  //     return {
  //       query: `?id=${this.id}`,
  //       imageUrl: 'http://img.1314000.cn/face.png',
  //       title: '一个关于冬瓜的故事 -- 收藏'
  //     }
  //   }

  return (
    <View className="detail">
      {!film ? <Loading /> : <ShowDetail poster={film.poster} title={film.name} />}
      <View>{title}</View>
    </View>
  )
}

export default Detail

// export default class Detail extends Component {
//   // 方案1
//   // 使用小程序中的生命周期方法来获取页面传过来的参数
//   // 属性小程序的，防止有些平台不支持，可以用方案2
//   // onLoad(options) {
//   //   console.log(options)
//   // }

//   state = {
//     title: '平台',
//     film: null
//   }

//   async componentDidMount() {
//     // 方案2
//     // console.log(Taro.getCurrentInstance().router.params)

//     // console.log(ret.data.data.film)
//     Taro.setNavigationBarTitle({
//       title: ret.data.data.film.name
//     })

//     // 根据不同的平台来显示不同的标题
//     if (process.env.TARO_ENV === 'weapp') {
//       this.setState({ title: '小程序' })
//     } else {
//       this.setState({ title: 'h5' })
//     }
//   }

//   // 分享给朋友
//   onShareAppMessage() {
//     return {
//       path: `/pages/detail/index?id=${this.id}`,
//       imageUrl: 'http://img.1314000.cn/face.png',
//       title: '一个关于冬瓜的故事'
//     }
//   }
//   // 朋友圈
//   onShareTimeline() {
//     return {
//       query: `?id=${this.id}`,
//       imageUrl: 'http://img.1314000.cn/face.png',
//       title: '一个关于冬瓜的故事 -- 朋友圈'
//     }
//   }
//   // 收藏
//   onAddToFavorites() {
//     return {
//       query: `?id=${this.id}`,
//       imageUrl: 'http://img.1314000.cn/face.png',
//       title: '一个关于冬瓜的故事 -- 收藏'
//     }
//   }

//   componentWillUnmount() {}

//   render() {
//     return (
//       <View className="detail">
//         {!this.state.film ? <View>加载中...</View> : <View>{this.state.film.name}</View>}

//         <View>{this.state.title}</View>
//       </View>
//     )
//   }
// }
