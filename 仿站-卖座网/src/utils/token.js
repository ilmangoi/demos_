import Store from './store'
const store = new Store()
const key = 'token'

export const getToken = () => store.get(key)
export const delToken = () => store.remove(key)
export const setToken = (value) => store.set(key, value)
export const hasToken = () => (store.get(key) ? true : false)
