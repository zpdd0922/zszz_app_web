import * as types from './mutation-types'

// 初始化数据 --> mapStates
const state = {
  businessType: { text: 'text_12', key: 'all' }, // 业务类型
  currencyType: { text: 'text_34', key: 'all' }, // 币种
  capitalFlow: { text: 'text_12', key: 'all' }, // 资金流向
  dataFilter: {
    text: 'text_7',
    key: '3',
    date: null
  }, // 日期
  marketType: { text: 'text_12', key: 'all' } // 市场
}

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  // all：全部；secFund：证券存取；newStock：新股认购；secTransact：证券交易；com：公司行动；other：其他；accountFund：资金存取
  businessType: state => state.businessType,
  // 1:美元; 2:港币
  currencyType: state => state.currencyType,
  // all全部；1：转入；-1：转出
  capitalFlow: state => state.capitalFlow,
  // 0 今日 1 近一周 2 近一个月 3 近三个月 4 用户自选区间
  dataFilter: state => state.dataFilter,
  // all:全部;K:港股; P:美股
  marketType: state => state.marketType
}

const mutations = {
  [types.BUSINESS_TYPE](state, payload) {
    state.businessType = payload
  },
  [types.CURRENCY_TYPE](state, payload) {
    state.currencyType = payload
  },
  [types.CAPITAL_FLOW](state, payload) {
    state.capitalFlow = payload
  },
  [types.DATA_FILTER](state, payload) {
    state.dataFilter.key = payload.key || null
    state.dataFilter.date = payload.date || null
    if (payload.text) {
      state.dataFilter.text = payload.text
    }
  },
  [types.MARKET_TYPE](state, payload) {
    state.marketType = payload
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}