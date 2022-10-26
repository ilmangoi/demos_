const Koa = require('koa2')
const wechat = require('co-wechat');
require('dotenv').config()
const config = {
  token: process.env.TOKEN,
  appid: process.env.APPID,
};

// 声明一个koa对象
const app = new Koa()
app.listen(9000)

const methods = {
  text(content) {
    return {
      type: 'text',
      content
    }
  }
}

// 接入和回复就完成了
app.use(wechat(config).middleware(async (message, ctx) => {
  // if ('text' === message.MsgType) {
  //   return {
  //     type: 'text',
  //     content: '你好，我是co-wechat服务器=' + Date.now()
  //   }
  // }
  try {
    return methods[message.MsgType]('你好，我是co-wechat服务器=' + Date.now())
  } catch (error) {
    return { type: 'text', content: '没有服务' }
  }
}));


