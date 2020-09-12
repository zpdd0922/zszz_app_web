import * as types from './mutation-types'
import Utils from '../utils'
import { format_DepositBank } from '@/modules/module-iaccount/format/deposit'
import i18n from '@/modules/module-iaccount/locale'
import SecuritiesApi from '@/modules/module-iaccount/api/modules/api-securities'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

console.log('getDepositCache', Utils.getDepositCache())
const {
  currency: depositCurrency = {},
  bankType: depositBankType = {},
  bankData: depositBankData = {},
  bankHis: depositBankHis,
  way: depositWay = {},
  wayInfo: depositWayInfo = {},
  eddaInfo: depositEddaInfo = {},
  subAccount: depositSubAccount = {}
} = Utils.getDepositCache()

// 初始化数据 --> mapStates
const state = {
  depositBankHis, // 入金 - 用户汇款银行信息
  depositCurrency, // 入金币种类型
  depositBankType, // 入金银行卡类型
  depositBankData, // 入金银行
  depositWay, // 入金方式
  depositWayInfo, // 入金方式对应银行账号信息
  depositEddaInfo, // edda账户
  depositSubAccount // 入金子账号 - 针对accountType = 2处理
}

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  depositBankHis: state => state.depositBankHis,
  depositCurrency: state => state.depositCurrency,
  depositBankType: state => state.depositBankType,
  depositBankData: state => state.depositBankData,
  depositWay: state => state.depositWay,
  depositWayInfo: state => state.depositWayInfo,
  depositEddaInfo: state => state.depositEddaInfo,
  depositSubAccount: state => state.depositSubAccount
}

const mutations = {
  [types.SET_DEPOSIT_BANKHIS](state, payload) {
    Utils.setDepositCache({ bankHis: payload })
    state.depositBankHis = payload
  },

  [types.SELECT_DEPOSIT_CURRENCY](state, payload = {}) {
    Utils.setDepositCache({ currency: payload })
    state.depositCurrency = payload
  },

  [types.SELECT_DEPOSIT_BANK_TYPE](state, payload) {
    Utils.setDepositCache({ bankType: payload })
    state.depositBankType = payload
  },

  [types.SELECT_DEPOSIT_BANKITEM](state, payload = {}) {
    Utils.setDepositCache({ bankData: payload })
    state.depositBankData = payload
  },

  [types.SELECT_DEPOSIT_WAY](state, payload = {}) {
    Utils.setDepositCache({ way: payload })
    state.depositWay = payload
  },

  [types.SET_DEPOSIT_WAY_INFO](state, payload = {}) {
    Utils.setDepositCache({ wayInfo: payload })
    state.depositWayInfo = payload
  },

  [types.SET_DEPOSIT_EDDA_INFO](state, payload = {}) {
    Utils.setDepositCache({ eddaInfo: payload })
    state.depositEddaInfo = payload
  },

  [types.GET_DEPOSIT_SUBACCOUNT](state, payload = {}) {
    Utils.setDepositCache({ subAccount: payload })
    state.depositSubAccount = payload
  },

  // 重置入金缓存数据
  [types.REQUEST_DEPOSIT_INFO](state, payload = {}) {
    Utils.clearDepositCache()
    state.depositCurrency = {}
    state.depositBankType = {}
    state.depositBankData = {}
    state.depositWay = {}
    state.depositWayInfo = {}
    state.depositEddaInfo = {}
    state.depositSubAccount = {}
  }
}

const actions = {
  selectCurrency({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SELECT_DEPOSIT_CURRENCY, data)
      resolve()
    })
  },

  selectBankType({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      // 香港卡 - 清除大陆银行卡下的本地缓存子账号
      if (data.value === i18n.t('iAccount.define.BANK_HK').value) {
        commit(types.GET_DEPOSIT_SUBACCOUNT)
      }
      console.log(data)
      commit(types.SELECT_DEPOSIT_BANK_TYPE, data)
      resolve()
    })
  },

  selectBankItem({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      const obj = format_DepositBank(data)
      commit(types.SELECT_DEPOSIT_BANKITEM, obj)
      resolve()
    })
  },

  setDepositBankHis({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SET_DEPOSIT_BANKHIS, data)
      resolve()
    })
  },

  selectWay({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SELECT_DEPOSIT_WAY, data)
      resolve()
    })
  },

  setWayInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SET_DEPOSIT_WAY_INFO, data)
      resolve()
    })
  },

  selectEddaItem({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit(types.SET_DEPOSIT_EDDA_INFO, data)
      resolve()
    })
  },

  // 申请子账号
  apiGetCollectionNo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      SecuritiesApi.getCollectionNo(data).then(res => {
        commit(types.GET_DEPOSIT_SUBACCOUNT, res)
        resolve(res)
      })
    })
  },

  // 获取子账号信息
  apiFindAccountInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      SecuritiesApi.findAccountInfo(data).then(res => {
        const obj = res || {}
        Utils.setDepositCache({ subAccount: obj })
        commit(types.GET_DEPOSIT_SUBACCOUNT, obj)
        resolve(obj)
      })
    })
  },

  // 提交入金信息 - 清空缓存
  apiSaveIntoMoney({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      SecApi.saveIntoMoney(data).then(res => {
        commit(types.REQUEST_DEPOSIT_INFO)
        resolve(res)
      }).catch((error) => {
        reject(error)
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