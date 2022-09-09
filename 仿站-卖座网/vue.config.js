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
      args[0].title = '电影网站'
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
      proxy: {
        ...require('./proxy/filmProxy')
      },
      setupMiddlewares: (mids, { app }) => {
        mocks.forEach((mock) => mock(app))
        return mids
      }
    }
  }
})
