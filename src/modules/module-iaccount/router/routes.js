const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../views/${path}/${file}.vue`);

import depositRouter from './modules/deposit'
import capitalFlowRouter from './modules/capital-flow'
import hisRouter from './modules/history'
import withdrawRouter from './modules/withdraw'

// 路由配置表
const routes = [
  {
    path: "/iaccount",
    redirect: { name: 'iaccountHome' },
    component: () => import(/* webpackChunkName:"iaccount-common" */ `../views/layout.vue`),
    children: [
      // 主页面
      {
        path: 'home',
        name: 'iaccountHome',
        meta: {
          title: '首页',
        },
        component: _import('home')
      },
      ...capitalFlowRouter,
      ...depositRouter,
      ...hisRouter,
      ...withdrawRouter
    ]
  },

];

export default routes;
