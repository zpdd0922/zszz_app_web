import * as types from './mutation-types'
import Utils from '../utils'

console.log('getDepositCache', Utils.getCompanyCache())
const {
  stockValue
} = Utils.getCompanyCache()

// 初始化数据 --> mapStates
const state = {
  stockValue
}

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  activeStock: state => state.stockValue
}

const mutations = {
  [types.SELECT_STOCK_VALUE](state, payload) {
    Utils.setCompanyCache({ stockValue: payload })
    state.stockValue = payload
  },

  // 重置入金缓存数据
  [types.REQUEST_INFO](state, payload = {}) {
    Utils.clearCompanyCache()
  }
}

const actions = {
  selectStock({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SELECT_STOCK_VALUE, data)
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}