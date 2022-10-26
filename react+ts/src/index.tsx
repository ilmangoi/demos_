import React from 'react'
import ReactDOM from 'react-dom/client'

// 路由
import { BrowserRouter as Router } from 'react-router-dom'
import RouteView from './router'

// redux
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      {/* 自定义routerView组件，使用配置式路由 */}
      <RouteView />
    </Router>
  </Provider>
)
