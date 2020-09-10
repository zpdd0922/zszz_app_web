// import feeRoutes from './fee';


// 入金
import Deposit from '../views/deposit/layout'

// 入金 - 选择大陆卡
import BankCN from '../views/deposit/bank-cn/layout'

// 入金 - 选择香港卡
import BankHK from '../views/deposit/bank-hk/layout'
// 入金 - 选择其他地区
import BankOhter from '../views/deposit/bank-other/layout'
// eDDA入金
import BankEdda from '../views/deposit/bank-hk/edda/layout'
// 股票转入
import IntoStock from '../views/into-stock/layout'

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../views/${path}/${file}.vue`);

// 路由名称
const getRouterName = () => i18n.t('deposit.name')

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
      {
        path: '/deposit',
        name: 'deposit',
        component: Deposit,
        redirect: '/deposit/currency-type',
        children: [
          {
            name: 'currency-type',
            path: 'currency-type',
            component: _import('deposit/currency-type'),
          },
          {
            name: 'bank-type',
            path: 'bank-type',
            component: _import('deposit/bank-type'),
            meta: { title: getRouterName }
          },
          {
            name: 'bank-cn',
            path: 'bank-cn',
            component: BankCN,
            redirect: '/deposit/bank-cn/bank-list',
            children: [
              {
                name: 'bank-list-cn',
                path: 'bank-list',
                component: _import('deposit/bank-cn/bank-list'),
                meta: { title: getRouterName }
              }, {
                name: 'e-banking-cn',
                path: 'e-banking',
                component: _import('deposit/bank-cn/e-banking'),
                meta: { title: getRouterName }
              }, {
                name: 'remit-cn',
                path: 'remit',
                component: _import('deposit/bank-cn/remit'),
                meta: { title: getRouterName }
              }
            ]
          },
          {
            name: 'bank-hk',
            path: 'bank-hk',
            component: BankHK,
            redirect: '/:lang?/deposit/bank-hk/bank-list',
            children: [
              {
                name: 'bank-list-hk',
                path: 'bank-list',
                component: _import('deposit/bank-hk/bank-list'),
                meta: { title: getRouterName }
              }, {
                name: 'cmbc-hk',
                path: 'cmbc',
                component: _import('deposit/bank-hk/cmbc'),
                meta: { title: getRouterName }
              }, {
                name: 'cmbwlb-hk',
                path: 'cmbwlb',
                component: _import('deposit/bank-hk/cmbwlb'),
                meta: { title: getRouterName }
              }, {
                name: 'ways-hk',
                path: 'ways',
                component: _import('deposit/bank-hk/ways'),
                meta: { title: getRouterName }
              }, {
                name: 'fps-hk',
                path: 'fps',
                component: _import('deposit/bank-hk/fps'),
                meta: { title: getRouterName }
              }, {
                name: 'e-banking-hk',
                path: 'e-banking',
                component: _import('deposit/bank-hk/e-banking'),
                meta: { title: getRouterName }
              }, {
                name: 'check-hk',
                path: 'check',
                component: _import('deposit/bank-hk/check'),
                meta: { title: getRouterName }
              }, {
                name: 'remit-hk',
                path: 'remit',
                component: _import('deposit/bank-hk/remit'),
                meta: { title: getRouterName }
              }, {
                name: 'edda-hk',
                path: 'edda',
                component: BankEdda,
                redirect: '/:lang?/deposit/bank-hk/edda/list',
                children: [
                  {
                    name: 'edda-list',
                    path: 'list',
                    component: _import('deposit/bank-hk/edda/edda-list'),
                    meta: { title: getRouterName }
                  },
                  {
                    name: 'edda-bind',
                    path: 'bind',
                    component: _import('deposit/bank-hk/edda/bind'),
                    meta: { title: getRouterName }
                  },
                  {
                    name: 'edda-remit',
                    path: 'remit',
                    component: _import('deposit/bank-hk/edda/remit'),
                    meta: { title: getRouterName }
                  },
                  {
                    name: 'edda-detail',
                    path: 'detail',
                    component: _import('deposit/bank-hk/edda/detail'),
                    meta: { title: getRouterName }
                  },
                  {
                    name: 'edda-notify',
                    path: 'notify',
                    component: _import('deposit/bank-hk/edda/notify'),
                    meta: { title: getRouterName }
                  }
                ]
              }
            ]
          },
          {
            name: 'bank-other',
            path: 'bank-other',
            component: BankOhter,
            redirect: '/:lang?/deposit/bank-other/bank-list',
            children: [
              {
                name: 'bank-list-other',
                path: 'bank-list',
                component: _import('deposit/bank-other/bank-list'),
                meta: { title: getRouterName }
              }, {
                name: 'cmbc-other',
                path: 'cmbc',
                component: _import('deposit/bank-other/cmbc'),
                meta: { title: getRouterName }
              }, {
                name: 'ways-other',
                path: 'ways',
                component: _import('deposit/bank-other/ways'),
                meta: { title: getRouterName }
              }, {
                name: 'fps-other',
                path: 'fps',
                component: _import('deposit/bank-other/fps'),
                meta: { title: getRouterName }
              }, {
                name: 'e-banking-other',
                path: 'e-banking',
                component: _import('deposit/bank-other/e-banking'),
                meta: { title: getRouterName }
              }, {
                name: 'check-other',
                path: 'check',
                component: _import('deposit/bank-other/check'),
                meta: { title: getRouterName }
              }, {
                name: 'remit-other',
                path: 'remit',
                component: _import('deposit/bank-other/remit'),
                meta: { title: getRouterName }
              }
            ]
          },
          {
            name: 'deposit-notify',
            path: 'notify',
            component: _import('deposit/notify'),
            meta: { title: getRouterName }
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

      //费用->佣金
      {
        path: 'fee/statement',
        name: 'fee-statement',
        component: _import('fee-statement')
      },
      // 股票->转入股票
      {
        path: '/into-stock',
        name: 'into-stock',
        redirect: '/into-stock/into-way',
        component: IntoStock,
        children: [
          {
            path: 'into-way',
            name: 'into-way',
            component: _import('into-stock/into-way')
          },
          {
            path: 'transfer-info',
            name: 'transferInfo',
            component: _import('into-stock/transfer-info'),
            // meta: { pageName: 'iaccount.intoStock.pageName', step: 1, nextStep: 'stockDetail' },
            props: true,
          }
        ]
      }
    ]
  },

];

export default routes;
