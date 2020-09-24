
import CompanyAct from '../../views/company-act/layout'
const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const companyActRouter = [
  {
    path: 'company-act',
    name: 'company-act',
    component: CompanyAct,
    redirect: 'company-act/act-market',
    children: [
      {
        name: 'act-market',
        path: 'act-market',
        component: _import('company-act/act-market'),
        meta: { title: 'iAccount.company_act.market.title'},
      },
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