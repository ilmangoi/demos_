// !自动引入api (此处代码勿动)
const moduleFn = require.context('./apis', true, /(.+)\.js$/)
let fileList = moduleFn.keys()
const moduleList = {}

console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', '当前自动导入的api如下：')
fileList.forEach((paths) => {
  let content = moduleFn(paths)
  let arr = Object.keys(content)
  arr.forEach((key) => {
    console.log(key)
    moduleList[key] = content[key]
  })
})

module.exports = moduleList
