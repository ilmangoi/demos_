import { detailPvApi } from '@/api/filmApi'

export const showFooterHook = (to, from, next) => {
  if (to.name === 'detail') {
    recordDetailPv(to)
  }
  next()
}

async function recordDetailPv(to) {
  // 通过ajax网络请求，把用户的每次访问记录下来
  let res = await detailPvApi(to.params.id)
  console.log('记录pv:', res)
}
