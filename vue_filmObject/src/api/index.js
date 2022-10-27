import recordLog from '@/utils/recordLog'

// !自动引入api (此处代码勿动)
const moduleFn = require.context('./apis', true, /(.+)\.js$/)
let fileList = moduleFn.keys()
const moduleList = {}
const logContent = []

fileList.forEach((paths) => {
  let content = moduleFn(paths)
  let arr = Object.keys(content)
  arr.forEach((key) => {
    logContent.push({ label: `【${key}】` })
    moduleList[key] = content[key]
  })
})
recordLog('网络请求API', logContent)

export default moduleList
