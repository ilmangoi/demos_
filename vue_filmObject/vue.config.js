const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack')
const path = require('path')
const fs = require('fs')

const mockDirs = fs.readdirSync(path.resolve('mock'))
const proxyDirs = fs.readdirSync(path.resolve('proxy'))
const mocks = mockDirs.map((dir) => require(`./mock/${dir}`))
const proxys = proxyDirs.map((dir) => require(`./proxy/${dir}`))
const proxy = {}
proxys.forEach((item) => {
  Object.assign(proxy, item) // 合并多个代理配置
})

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
      proxy,
      // !mock数据统一写在顶层目录下的mock文件夹中
      setupMiddlewares: (mids, { app }) => {
        mocks.forEach((mock) => mock(app))
        return mids
      }
    }
  }
})
