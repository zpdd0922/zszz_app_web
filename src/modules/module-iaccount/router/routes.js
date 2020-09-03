
const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../views/${path}/${file}.vue`);

// 路由配置表
const routes = [
  {
    path: "/iaccount",
    // redirect: { name: 'iaccountHome' },
    component: () => import(/* webpackChunkName:"iaccount-common" */ `../views/layout.vue`),
    children: [
      // 主页面
      {
        path: '/home',
        name: 'iaccountHome',
        meta: {
          title: '首页',
        },
        component: _import('home')
      },
      // 入金页面
      {
        path: '/funds_deposit',
        name: 'funds_deposit',
        meta: {
          title: '存入资金',
        },
        component: _import('funds-deposit'),
        redirect: '/funds_deposit/select_currency',
        children: [{
          path: 'select_currency',
          name: 'select_currency',
          meta: {
            step: 1,
          },
          component: _import('funds-withdraw/currency'),
        },
        {
          path: 'select_bank_type',
          name: 'select_bank_type',
          meta: {
            step: 1,
          },
          component: _import('funds-withdraw/bank-type'),
        },
        {
          path: 'select_bank',
          name: 'select_bank',
          meta: {
            step: 1,
          },
          component: _import('funds-withdraw/bank'),
        },
        {
          path: 'transfer',
          name: 'transfer',
          meta: {
            step: 1,
          },
          component: _import('funds-withdraw/bank'),
        }
        ]
      },
      // // 出金页面
      // {
      //   path: '/funds_withdraw',
      //   name: 'funds_withdraw',
      //   meta: {
      //     title: '提取资金',
      //   },
      //   component: _import('funds-withdraw'),

      // },
      // // 资金历史页面
      // {
      //   path: '/funds_history',
      //   name: 'funds_history',
      //   meta: {
      //     title: '历史记录',
      //   },
      //   component: _import('funds-history'),

      // },
      // 转入股票页面
      // 转出股票页面
      // 股票历史页面
    ]
  },

];

export default routes;
