// 此文件相当于之前的app.js文件
import { Component } from 'react'
import './app.css'

class App extends Component {
  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
