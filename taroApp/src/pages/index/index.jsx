import { Component } from 'react'
// 在taro中，小程序中的所有的组件它都是以 自定义组件的方式来导入使用
// 自定义组件它的首字母要大写
import { View, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default class Index extends Component {
  state = {
    films: []
  }

  onPageScroll({ scrollTop }) {
    console.log(scrollTop)
  }

  async componentDidMount() {
    let ret = await Taro.request({
      url: 'https://api.iynn.cn/film/api/v1/getNowPlayingFilmList?cors=T&cityId=110100&pageSize=10&pageNum=1'
    })
    if (ret.data.data.films.length > 0) {
      this.setState({
        films: ret.data.data.films
      })
    }
  }

  render() {
    return (
      <View>
        {this.state.films.map(item => (
          <View className="film-item" key={item.filmId}>
            <Image
              onClick={() => {
                Taro.navigateTo({ url: `/pages/detail/index?id=${item.filmId}` })
              }}
              src={item.poster}
            />
            <View>
              {/* 声明式导航 */}
              <Navigator url={`/pages/detail/index?id=${item.filmId}`}>{item.name}</Navigator>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
