const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);
//TODO:改名字
const feeRoutes = [
  {
    path: 'fee/statement',
    name: 'fee-statement',
    component: _import('fee/statement')
  }
]

export default feeRoutes