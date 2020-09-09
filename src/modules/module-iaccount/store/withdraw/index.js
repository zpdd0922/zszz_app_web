import * as types from './mutation-types'
import Utils from '../utils'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

console.log('getWithdrawCache', Utils.getWithdrawCache())
const {
  bankHis: withdrawBankHis,
  bankInfo: withdrawBankInfo = {}
} = Utils.getWithdrawCache()

// 初始化数据 --> mapStates
const state = {
  withdrawBankHis, // 出金历史银行信息
  withdrawBankInfo // 出金银行
}

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  withdrawBankHis: state => state.withdrawBankHis,
  withdrawBankInfo: state => state.withdrawBankInfo
}

const mutations = {
  [types.SET_WITHDRAW_BANKHIS](state, payload) {
    Utils.setWithdrawCache({ bankHis: payload })
    state.withdrawBankHis = payload
  },

  [types.SELECT_WITHDRAW_BANK](state, payload = {}) {
    Utils.setWithdrawCache({ bankInfo: payload })
    state.withdrawBankInfo = payload
  },

  // 重置出金缓存数据
  [types.REQUEST_WITHDRAW_INFO](state) {
    Utils.clearWithdrawCache()
    state.withdrawBankHis = null
    state.withdrawBankInfo = {}
  }
}

const actions = {
  selectWithdrawBank({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SELECT_WITHDRAW_BANK, data)
      resolve()
    })
  },

  setWithdrawBankHis({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SET_WITHDRAW_BANKHIS, data)
      resolve()
    })
  },

  // 提交出金信息 - 清空缓存
  apiToCommitCashOutData({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      SecApi.toCommitCashOutData(data).then(res => {
        commit(types.REQUEST_WITHDRAW_INFO)
        resolve(res)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}