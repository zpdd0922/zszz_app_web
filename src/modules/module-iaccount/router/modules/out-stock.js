import outStockLayout from '../../views/out-stock/layout';

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const outStock = [
  {
    path: '/out-stock',
    name: 'outStock',
    redirect: '/out-stock/out-way',
    component: outStockLayout,
    props: true,
    children: [
      {
        path: 'out-way',
        name: 'outWay',
        component: _import('out-stock/out-way'),
        meta: { title: 'iAccount.outStock.outWay.title', step: 0, state: 0 },
        props: true,
      },
      {
        path: 'transfer-out-info',
        name: 'transferOutInfo',
        component: _import('out-stock/transfer-out-info'),
        meta: { step: 1 },
        // meta: { pageName: 'iaccount.intoStock.pageName', step: 1, nextStep: 'stockDetail' },
        props: true,
      },
      {
        path: 'out-stock-detail',
        name: 'outStockDetail',
        component: _import('out-stock/out-stock-detail'),
        meta: { step: 2 },
        props: true,
      },
      {
        path: 'out-info-confirm',
        name: 'outInfoConfirm',
        component: _import('out-stock/out-info-confirm'),
        meta: { step: 3 },
        props: true,
      }
    ]
  }
]

export default outStock;