import React, { Component } from 'react';
import store from '@/store'
import { Link } from 'react-router-dom';

class ShowLoginBtn extends Component {
  render() {
    let nickname = store.getState().getIn(['user', 'nickname']) || ''
    return (
      <>
        {
          nickname ?
            <span>{nickname}</span>
            :
            <Link to="/login">立即登录</Link>
        }
      </>
    );
  }
}

export default ShowLoginBtn;
