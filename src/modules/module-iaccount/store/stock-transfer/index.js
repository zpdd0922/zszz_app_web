import ApiStockTransfer from '../../api/modules/api-stock-transfer'
import * as types from './mutation-types'

// 初始化数据 --> mapStates
const state = {
  // 港股历史数据
  stockTransferredHK: {},
  // 美股历史数据
  stockTransferredUS: {},
  //选择港股还是美股
  isShares: localStorage["isShares"]?localStorage["isShares"]:'',
  // 历史选择
  isHistoryShares: '',
}

const getters = {
  stockTransferredHK: state => state.stockTransferredHK,
  stockTransferredUS: state => state.stockTransferredUS,
  isShares: state => state.isShares,
  isHistoryShares: state => state.isHistoryShares,
}

const mutations = {
  [types.SET_ISSHARES](state, payload) {
    localStorage.setItem("isShares", payload.isShares);
  },
  [types.SET_ISHISTORYSHARES](state, payload) {
    state.isHistoryShares = payload.stock.isShares
  },
  [types.GET_STOCK_TRANSFERRED](state, payload) {
    if (payload.stock.isShares === 1) {
      state.stockTransferredHK = {...payload}
      console.log('wanchenglishi')
      state.isHistoryShares = 1;
    } else if (payload.stock.isShares === 2) {
      state.stockTransferredUS = {...payload}
      state.isHistoryShares = 2;
    }
  },
}

const actions = {
  // 获取历史转入数据
  getTransferredStock({commit}, data) {
    return new Promise((resolve, reject) => {
      ApiStockTransfer.getTransferredStock(data).then((res) => {
        commit(types.GET_STOCK_TRANSFERRED, res)
        resolve(res)
      })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}