// 此文件相当于之前的app.json文件
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro学习',
    navigationBarTextStyle: 'black'
  }
})
