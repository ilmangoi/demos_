import store from '@/store'
import footerConfig from '@/config/site/pageFooter.config'

export const showFooterHook = (to, from, next) => {
  let { path } = to
  // 方法4：只有在一级路由下才显示底部菜单
  // 这样就不在每个需要隐藏底部菜单的路由中都要配置了
  store.commit(
    'setIsShowFooter',
    footerConfig.map(({ to }) => to).some((item) => new RegExp(item).test(path))
  )
  next()
}
