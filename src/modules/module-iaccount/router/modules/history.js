const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);


const hisRouter = [
  {
    path: '/:lang?/history-funds',
    name: 'sec-funds-history',
    component: _import('history-funds/index'),
    meta: { title: () => i18n.t('iAccount.history.name') }
  }, {
    path: '/:lang?/history-funds/deposit',
    name: 'funds-deposit',
    component: _import('history-funds/deposit'),
    meta: { title: () => i18n.t('iAccount.history.common.text_1') }
  }, {
    path: '/:lang?/history-funds/withdraw',
    name: 'funds-withdraw',
    component: _import('history-funds/withdraw'),
    meta: { title: () => i18n.t('iAccount.history.common.text_2') }
  }
]

export default hisRouter