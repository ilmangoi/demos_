const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack')
const path = require('path')
const fs = require('fs')

const dirs = fs.readdirSync(path.resolve('mock'))
const mocks = dirs.map((dir) => require(`./mock/${dir}`))

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // 页面标题
      args[0].title = '后台管理系统'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        BASE_URL: "'./'"
      })
    ],
    devServer: {
      // !proxy数据应统一写在顶层目录proxy文件夹下
      proxy: {
        ...require('./proxy/exampleProxy')
      },
      // !mock数据统一写在顶层目录下的mock文件夹中
      setupMiddlewares: (mids, { app }) => {
        mocks.forEach((mock) => mock(app))
        return mids
      }
    }
  }
})
