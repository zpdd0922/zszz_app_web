import IntoStockLayout from '../../views/into-stock/layout';

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const intoStock = [
  {
    path: '/into-stock',
    name: 'intoStock',
    redirect: '/into-stock/into-way',
    component: IntoStockLayout,
    children: [
      {
        path: 'into-way',
        name: 'intoWay',
        component: _import('into-stock/into-way')
      },
      {
        path: 'transfer-info',
        name: 'transferInfo',
        component: _import('into-stock/transfer-info'),
        // meta: { pageName: 'iaccount.intoStock.pageName', step: 1, nextStep: 'stockDetail' },
        props: true,
      },
      {
        path: 'stock-detail',
        name: 'stockDetail',
        component: _import('into-stock/stock-detail')
      },
      {
        path: 'info-confirm',
        name: 'infoConfirm',
        component: _import('into-stock/info-confirm')
      }
    ]
  }
]

export default intoStock;