// import depositRouter from './modules/deposit'
import capitalFlowRouter from './modules/capital-flow'
import hisRouter from './modules/history'
import withdrawRouter from './modules/withdraw'
import companyActRouter from './modules/company-act'
import depositRouter from './fund/deposit'

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../views/${path}/${file}.vue`);

// 路由名称
const getRouterName = () => i18n.t('iAccount.deposit.name')

// 路由配置表
const routes = [
  {
    path: "/",
    redirect: { name: 'sec-home' },
    component: () => import(/* webpackChunkName:"iaccount-common" */ `../views/layout.vue`),
    children: [
      // 主页面
      {
        path: 'home',
        name: 'sec-home',
        meta: {
          title: '首页',
        },
        component: _import('home')
      },
      ...capitalFlowRouter,
      ...depositRouter,
      ...hisRouter,
      ...withdrawRouter,
      ...companyActRouter,
      //费用->佣金
      {
        path: 'fee/statement',
        name: 'fee-statement',
        component: _import('fee-statement')
      }
    ]
  },

];

export default routes;
