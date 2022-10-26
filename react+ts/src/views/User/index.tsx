import React from 'react'
import { Divider } from 'antd'
import { Outlet, NavLink } from 'react-router-dom'
import './style.scss'

const User = () => {
  return (
    <div>
      <div className="user-container">
        <NavLink className="user-link-container" to="/" end>
          用户列表
        </NavLink>
        <NavLink className="user-link-container" to="/useradd">
          添加用户
        </NavLink>
      </div>
      <Divider />
      {/* 子路由 */}
      <Outlet />
    </div>
  )
}

export default User
