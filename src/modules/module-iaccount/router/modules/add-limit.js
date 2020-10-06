const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);
//TODO:改名字
const addLimit = [
  {
    path: 'fund/add-limit',
    name: 'add-limit',
    component: _import('add-limit')
  },
  {
    path: 'fund/add-limit-history',
    name: 'add-limit-history',
    component: _import('add-limit/history')
  },

]

export default addLimit