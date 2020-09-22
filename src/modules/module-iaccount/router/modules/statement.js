const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const statementRouter = [
  {
    path: 'statement',
    name: 'statement',
    component: _import('statement')
  }
]

export default statementRouter
