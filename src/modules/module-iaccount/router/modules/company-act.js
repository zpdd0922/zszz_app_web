
import CompanyAct from '../../views/company-act/layout'
const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const companyActRouter = [
  {
    path: '/company-act',
    name: 'company-act',
    component: CompanyAct,
    redirect: '/company-act/act-form',
    children: [
      {
        name: 'act-form',
        path: 'act-form',
        component: _import('company-act/act-form'),
      },
      {
        name: 'act-detail',
        path: 'act-detail',
        component: _import('company-act/act-detail'),
      },
      {
        name: 'act-search',
        path: 'act-search',
        component: _import('company-act/act-search'),
      }
    ]
  }
]

export default companyActRouter