import api from '@/api'

const reg = /\/admin\/(?<page>[^/]+)(\/.+)?/

export default function showFooterHook(to, from, next) {
  if (reg.test(to.path)) {
    const {
      groups: { page }
    } = reg.exec(to.path)
    recordDetailPv(page)
  }
  next()
}

async function recordDetailPv(page) {
  try {
    await api.pvRecord(page)
  } catch (err) {} // eslint-disable-line
  // let res = await api.pvRecord(page)
  // console.log('记录pv:', res)
}
