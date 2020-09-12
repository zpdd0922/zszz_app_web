const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);
//TODO:改名字
const feeStatementRouter = [
  {
    path: 'fee-statement',
    name: 'feeStatement',
    component: _import('fee-statement')
  }
]

export default feeStatementRouter