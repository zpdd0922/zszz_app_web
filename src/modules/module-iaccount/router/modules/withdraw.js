import i18n from '@/modules/module-iaccount/locale'

// 出金
import WithDraw from '@/modules/module-iaccount/views/withdraw/layout'

// 出金 - 大陆卡开户
import OpenCN from '@/modules/module-iaccount/views/withdraw/open-cn/layout'

// 出金 - 香港卡开户
import OpenHK from '@/modules/module-iaccount/views/withdraw/open-hk/layout'

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

// 路由名称
const getRouterName = () => i18n.t('iAccount.withdraw.name')

// 路由模块
const withdrawRouter = [
  {
    path: '/:lang?/withdraw',
    name: 'withdraw',
    component: WithDraw,
    redirect: '/:lang?/withdraw/index',
    children: [
      {
        name: 'withdraw-index',
        path: 'index',
        component: _import('withdraw/index'),
        meta: { title: getRouterName }
      }, {
        name: 'open-cn',
        path: 'open-cn',
        component: OpenCN,
        redirect: '/:lang?/withdraw/open-cn/select-bank',
        children: [
          {
            name: 'select-bank',
            path: 'select-bank',
            component: _import('withdraw/open-cn/select-bank'),
            meta: { title: getRouterName }
          }, {
            name: 'request-cn',
            path: 'request',
            component: _import('withdraw/open-cn/request'),
            meta: { title: getRouterName }
          }
        ]
      }, {
        name: 'open-hk',
        path: 'open-hk',
        component: OpenHK,
        redirect: '/:lang?/withdraw/open-hk/request',
        children: [
          {
            name: 'request-hk',
            path: 'request',
            component: _import('withdraw/open-hk/request'),
            meta: { title: getRouterName }
          }
        ]
      }, {
        name: 'withdraw-notify',
        path: 'notify',
        component: _import('withdraw/notify'),
        meta: { title: getRouterName }
      }
    ]
  }
]

export default withdrawRouter