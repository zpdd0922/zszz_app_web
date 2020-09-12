import i18n from '@/modules/module-iaccount/locale'

// 资金流水
import CapitalFlow from '@/modules/module-iaccount/views/capital-flow'
import StockFlow from '@/modules/module-iaccount/views/stock-flow'

// 路由名称
const getRouterName = () => i18n.t('iAccount.capital_flow.name')
const getRouterName1 = () => i18n.t('iAccount.capital_flow.stock_flow_name')

// 路由模块
const capitalFlowRouter = [
  {
    path: '/:lang?/capital-flow',
    name: 'sec-funds-capital-flow',
    component: CapitalFlow,
    meta: { title: getRouterName }
  },
  {
    path: '/:lang?/stock-flow',
    name: 'stock-flow',
    component: StockFlow,
    meta: { title: getRouterName1 }
  }
]

export default capitalFlowRouter