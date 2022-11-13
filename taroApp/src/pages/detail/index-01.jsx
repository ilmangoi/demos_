import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default class Detail extends Component {
  // 方案1
  // 使用小程序中的生命周期方法来获取页面传过来的参数
  // 属性小程序的，防止有些平台不支持，可以用方案2
  // onLoad(options) {
  //   console.log(options)
  // }

  state = {
    title: '平台',
    film: null
  }

  async componentDidMount() {
    // 方案2
    // console.log(Taro.getCurrentInstance().router.params)

    let id = Taro.getCurrentInstance().router.params.id

    let ret = await Taro.request({
      url: `https://api.iynn.cn/film/api/v1/getFilmInfo?cors=T&filmId=${id}`
    })

    this.setState({
      film: ret.data.data.film
    })

    // console.log(ret.data.data.film)
    Taro.setNavigationBarTitle({
      title: ret.data.data.film.name
    })

    // 根据不同的平台来显示不同的标题
    if (process.env.TARO_ENV === 'weapp') {
      this.setState({ title: '小程序' })
    } else {
      this.setState({ title: 'h5' })
    }
  }

  // 分享给朋友
  onShareAppMessage() {
    return {
      path: `/pages/detail/index?id=${this.id}`,
      imageUrl: 'http://img.1314000.cn/face.png',
      title: '一个关于冬瓜的故事'
    }
  }
  // 朋友圈
  onShareTimeline() {
    return {
      query: `?id=${this.id}`,
      imageUrl: 'http://img.1314000.cn/face.png',
      title: '一个关于冬瓜的故事 -- 朋友圈'
    }
  }
  // 收藏
  onAddToFavorites() {
    return {
      query: `?id=${this.id}`,
      imageUrl: 'http://img.1314000.cn/face.png',
      title: '一个关于冬瓜的故事 -- 收藏'
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <View className="detail">
        {!this.state.film ? <View>加载中...</View> : <View>{this.state.film.name}</View>}

        <View>{this.state.title}</View>
      </View>
    )
  }
}
