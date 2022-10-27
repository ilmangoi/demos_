import LocalStore from '@/utils/store'
const localStore = new LocalStore('local')

class OperateUserinfo {
  static getInfo() {
    return {
      token: localStore.get('token') || '',
      userInfo: localStore.get('userInfo') || {},
      routes: localStore.get('routes') || []
    }
  }

  static setInfo(payload) {
    localStore.set('token', payload.token)
    localStore.set('userInfo', payload.userInfo)
    localStore.set('routes', payload.routes)
  }

  static delInfo() {
    localStore.remove('token')
    localStore.remove('userInfo')
    localStore.remove('routes')
  }
}

export default OperateUserinfo
