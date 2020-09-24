import ApiStockTransfer from '../../api/modules/api-stock-transfer'
import * as types from './mutation-types'

// 初始化数据 --> mapStates
const state = {
  // isGetTransferHistory: {
  //   in: false,
  //   out: false,
  // },
  // 港股历史数据
  stockTransferredHK: {
    in: {},
    out: {},
  },
  // 美股历史数据
  stockTransferredUS: {
    in: {},
    out: {},
  },
  // 选择港股还是美股
  isShares: localStorage["isShares"] ? localStorage["isShares"] : '',
  isSharesOut: localStorage["isSharesOut"] ? localStorage["isSharesOut"] : '',
  // 历史选择
  // isHistoryShares: {
  //   in: null,
  //   out: null,
  // },
  // 历史转入股票
  sharesList: {
    in: [],
    out: [],
  },
  // searchStockList: [],
  // 股票转移历史
  stockTransferHistory: [],
}

const getters = {
  // isGetTransferHistory: state => state.isGetTransferHistory,
  stockTransferredHK: state => state.stockTransferredHK,
  stockTransferredUS: state => state.stockTransferredUS,
  isShares: state => state.isShares,
  isSharesOut: state => state.isSharesOut,
  // isHistoryShares: state => state.isHistoryShares,
  sharesList: state => state.sharesList,
  stockTransferHistory: state => state.stockTransferHistory,

  // searchStockList: state => state.searchStockList,
}

const mutations = {
  // [types.SET_SEARCH_STOCK_LIST](state, payload) {
  //   state.searchStockList = payload.stks;
  // },
  // 股票列表存储
  [types.SET_SHARES_LIST](state, payload) {
    if (payload.stock.type === 'in') {
      state.sharesList.in = payload.sharesList;
    } else if (payload.stock.type === 'out') {
      state.sharesList.out = payload.sharesList;
    }
  },
  [types.SET_STOCK_TRANSFERRED_HK](state, payload) {
    if (payload.type === 'in') {
      state.stockTransferredHK.in = payload.stockTransferredHK;
    } else if (payload.type === 'out') {
      state.stockTransferredHK.out = payload.stockTransferredHK;
    }
  },
  [types.SET_STOCK_TRANSFERRED_US](state, payload) {
    if (payload.type === 'in') {
      state.stockTransferredUS.in = payload.stockTransferredUS;
    } else if (payload.stock.type === 'out') {
      state.stockTransferredUS.out = payload.stockTransferredUS;
    }
  },
  [types.SET_ISSHARES](state, payload) {
    // if (payload.stock.type === 'in') {
      state.isShares = payload.isShares;
      localStorage.setItem("isShares", payload.isShares);
    // } 
    // else if (payload.stock.type === 'out') {
    //   state.isSharesOut = payload.isShares;
    //   localStorage.setItem("isSharesOut", payload.isShares);
    // }
  },
  [types.SET_ISSHARES_OUT](state, payload) {
    state.isSharesOut = payload.isShares;
    localStorage.setItem("isSharesOut", payload.isShares);
  },
  // [types.SET_ISHISTORYSHARES](state, payload) {
  //   if (!payload.stock) {
  //     return
  //   }
  //   if (payload.stock.type === 'in') {
  //     state.isHistoryShares.in = payload.stock.isShares;
  //   } else if (payload.stock.type === 'out') {
  //     state.isHistoryShares.out = payload.stock.isShares;
  //   }
  // },
  [types.GET_STOCK_TRANSFERRED](state, payload) {
    if (!payload.stock) {
      return
    }
    if (payload.stock.type === 'in') {
      //TODO:现在find接口不会返回全字段，等后台修改后再做调整
      if (!payload.stock.isShares) {
        state.stockTransferredHK.in = { ...payload.stock }
      } else if (payload.stock.isShares === 2) {
        state.stockTransferredUS.in = { ...payload.stock }
      }
    } else if (payload.stock.type === 'out') {
      if (payload.stock.isShares === 1) {
        state.stockTransferredHK.in = { ...payload.stock }
      } else if (payload.stock.isShares === 2) {
        state.stockTransferredUS.in = { ...payload.stock }
      }
    }
  },
  [types.UPDATE_CACHE_DATA_STATUS](state, payload) {
    if (payload.stock.type === 'in') {
      state.isGetTransferHistory.in = true;
    } else if (payload.stock.type === 'out') {
      state.isGetTransferHistory.out = true;
    }
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
      if (!data.type) {
        reject('no Type params');
      }
      ApiStockTransfer.getTransferredStock(data).then((res) => {
        if (res.stock) {
          commit(types.GET_STOCK_TRANSFERRED, res)
          // commit(types.SET_ISHISTORYSHARES, res)
          commit(types.SET_SHARES_LIST, res)
        }
        // commit(types.UPDATE_CACHE_DATA_STATUS, res);
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  setMarketStatus({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (data.type === 'in') {
        commit(types.SET_ISSHARES, { isShares: data.marketCode })
      } else if ( data.type === 'out'){
        commit(types.SET_ISSHARES, { isShares: data.marketCode })
      }
      resolve()
    })
  },
  setOutMarketStatus({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (data.type === 'in') {
        commit(types.SET_ISSHARES_OUT, { isShares: data.marketCode })
      } else if ( data.type === 'out'){
        commit(types.SET_ISSHARES_OUT, { isShares: data.marketCode })
      }
      resolve()
    })
  },

  // 缓存数据
  sendTransferredStockCache({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (!data .type) {
        reject('no Type params')
      }
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