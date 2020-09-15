import IntoStockLayout from '../../views/into-stock/layout';

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const intoStock = [
  {
    path: '/into-stock',
    name: 'intoStock',
    redirect: '/into-stock/into-way',
    component: IntoStockLayout,
    props: true,
    children: [
      {
        path: 'into-way',
        name: 'intoWay',
        component: _import('into-stock/into-way'),
        meta: {step: 0, state: 0},
        props: true,
      },
      {
        path: 'transfer-info',
        name: 'transferInfo',
        component: _import('into-stock/transfer-info'),
        meta: {step: 1},
        // meta: { pageName: 'iaccount.intoStock.pageName', step: 1, nextStep: 'stockDetail' },
        props: true,
      },
      {
        path: 'stock-detail',
        name: 'stockDetail',
        component: _import('into-stock/stock-detail'),
        meta: {step: 2},
        props: true,
      },
      {
        path: 'info-confirm',
        name: 'infoConfirm',
        component: _import('into-stock/info-confirm'),
        meta: {step: 3},
        props: true,
      }
    ]
  }
]

export default intoStock;