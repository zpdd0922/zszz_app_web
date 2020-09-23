import ApiStockTransfer from '../../api/modules/api-stock-transfer'
import * as types from './mutation-types'

// 初始化数据 --> mapStates
const state = {
  isGetHistory: false,
  // 港股历史数据
  stockTransferredHK: {},
  // 美股历史数据
  stockTransferredUS: {},
  // 选择港股还是美股
  isShares: localStorage["isShares"] ? localStorage["isShares"] : '',
  // 历史选择
  isHistoryShares: null,
  // 历史转入股票
  sharesList: [],
  // searchStockList: [],
  // 股票转移历史
  stockTransferHistory: [],
}

const getters = {
  isGetTransferHistory: state => state.isGetHistory,
  stockTransferredHK: state => state.stockTransferredHK,
  stockTransferredUS: state => state.stockTransferredUS,
  isShares: state => state.isShares,
  isHistoryShares: state => state.isHistoryShares,
  sharesList: state => state.sharesList,
  stockTransferHistory: state => state.stockTransferHistory,

  // searchStockList: state => state.searchStockList,
}

const mutations = {
  // [types.SET_SEARCH_STOCK_LIST](state, payload) {
  //   state.searchStockList = payload.stks;
  // },
  [types.SET_SHARES_LIST](state, payload) {
    state.sharesList = payload.sharesList;
  },
  [types.SET_STOCK_TRANSFERRED_HK](state, payload) {
    state.stockTransferredHK = payload.stockTransferredHK;
  },
  [types.SET_STOCK_TRANSFERRED_US](state, payload) {
    state.stockTransferredUS = payload.stockTransferredUS;
  },
  [types.SET_ISSHARES](state, payload) {
    state.isShares = payload.isShares;
    localStorage.setItem("isShares", payload.isShares);
  },
  [types.SET_ISHISTORYSHARES](state, payload) {
    if (!payload.stock) {
      return
    }
    state.isHistoryShares = payload.stock.isShares
  },
  [types.GET_STOCK_TRANSFERRED](state, payload) {
    if (!payload.stock) {
      return
    }
    if (payload.stock.isShares === 1) {
      state.stockTransferredHK = { ...payload }
    } else if (payload.stock.isShares === 2) {
      state.stockTransferredUS = { ...payload }
    }
  },
  [types.UPDATE_CACHE_DATA_STATUS](state, payload) {
    state.isGetHistory = true;
  },
  [types.STOCK_TRANSFER_HISTORY](state, payload) {
    state.stockTransferHistory = payload;
  },

}

const actions = {
  // 获取历史转入数据
  getTransferredStock({ commit }, data) {
    // const fullData = {...state.stockTransferredHK, ...data}
    return new Promise((resolve, reject) => {
      ApiStockTransfer.getTransferredStock(data).then((res) => {

        if (res.stock) {
          commit(types.GET_STOCK_TRANSFERRED, res)
          commit(types.SET_ISHISTORYSHARES, res)
          commit(types.SET_SHARES_LIST, res)
        }
        commit(types.UPDATE_CACHE_DATA_STATUS);
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  setMarketStatus({ commit }, marketCode) {
    return new Promise((resolve, reject) => {
      commit(types.SET_ISSHARES, { isShares: marketCode })
      resolve()
    })
  },

  // 缓存数据
  sendTransferredStockCache({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiStockTransfer.sendTransferredStockCache(data).then((res) => {
        if (res.stock) {
          commit(types.GET_STOCK_TRANSFERRED, res)
        }
        resolve(res);
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // 搜索接口
  getSearchStockList({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiStockTransfer.getSearchStockList(data).then((res) => {
        // commit(types.SET_SEARCH_STOCK_LIST, res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  // 获取股票转移记录
  getStocksHistory({ commit }, data) {
    return new Promise((resolve, reject) => {
    ApiStockTransfer.getStocksHistory(data).then((res) => {
        commit(types.STOCK_TRANSFER_HISTORY, res)
        resolve(res)
      }).catch((err) => {
        reject(err)
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