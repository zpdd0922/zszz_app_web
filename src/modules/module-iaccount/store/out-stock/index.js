import ApiOutStock from '../../api/modules/api-out-stock'
import * as types from './mutation-types'

// 初始化数据 --> mapStates
const state = {
  isGetOutHistory: {
    in: false,
    out: false,
  },
  // // 港股历史数据
  // stockTransferredHK: {},
  // // 美股历史数据
  // stockTransferredUS: {},
  // // 选择港股还是美股
  // isShares: localStorage["isShares"] ? localStorage["isShares"] : '',
  // // 历史转入股票
  // sharesList: [],
  // // searchStockList: [],
  // 转出港股
  outStockHK: {
    in: {},
    out: {},
  },
  // 转出美股
  outStockUS: {
    in: {},
    out: {},
  },
  //选择转出港股还是美股
  outMarketType: 
    localStorage["isShares"] ? localStorage["isShares"] : '',

  // // 历史选择
  outMarketTypeHistory: {
    in: null,
    out: null,
  },
  //转出股票列表
  outSharesList: {
    in: [],
    out: [],
  }

}

const getters = {
  // isGetOutHistory: state => state.isGetOutHistory,
  // outStockHK: state => state.outStockHK,
  // outStockUS: state => state.outStockUS,
  // outMarketType: state => state.outMarketType,
  // outMarketTypeHistory: state => state.outMarketTypeHistory,
  // outSharesList: state => state.outSharesList,
  // searchStockList: state => state.searchStockList,
}

const mutations = {
  // [types.SET_SEARCH_STOCK_LIST](state, payload) {
  //   state.searchStockList = payload.stks;
  // },
  // [types.SET_OUT_SHARES_LIST](state, payload) {
  //   if (res.type && res.type === 'out') {
  //     state.outSharesList.out = payload.sharesList;
  //   }
  // },
  // [types.SET_OUT_STOCK_HK](state, payload) {
  //   if (res.type && res.type === 'out') {
  //     state.outStockHK.out = payload.outStockHK;
  //   }
  // },
  // [types.SET_OUT_STOCK_US](state, payload) {
  //   if (res.type && res.type === 'out') {
  //     state.outStockUS.out = payload.outStockUS;
  //   }
  // },
  // [types.SET_OUT_MARKET_TYPE](state, payload) {
  //   if (res.type && res.type === 'out') {
  //     state.outMarketType.out = payload.isShares;
  //     localStorage.setItem("outMarketType", payload.isShares);
  //   }
  // },
  // [types.SET_OUT_MARKET_TYPE_HISTORY](state, payload) {
  //   if (!payload) {
  //     return
  //   }
  //   if (res.type && res.type === 'out') {
  //     state.outMarketTypeHistory.out = payload.isShares
  //   }
  // },
  // [types.GET_OUT_STOCK_TRANSFERRED](state, payload) {
  //   if (!payload.stock) {
  //     return
  //   }
  //   if (res.type && res.type === 'out') {
  //     if (payload.stock.isShares === 1) {
  //       state.outStockHK.out = { ...payload.stock }
  //     } else if (payload.stock.isShares === 2) {
  //       state.outStockUS.out = { ...payload.stock }
  //     }
  //   }
  // },
  // [types.UPDATE_OUT_CACHE_DATA_STATUS](state, payload) {
  //   if (res.type && res.type === 'out') {
  //     state.isGetOutHistory.out = true;
  //   }
  // },


}

const actions = {
  // 获取历史转入数据
  // getOutStock({ commit }, data) {
  //   // const fullData = {...state.stockTransferredHK, ...data}
  //   return new Promise((resolve, reject) => {
  //     ApiOutStock.getOutStock({type: 'out', ...data}).then((res) => {
  //       if (res.stock) {
  //         commit(types.GET_STOCK_TRANSFERRED, res)
  //         commit(types.SET_OUT_MARKET_TYPE_HISTORY, res)
  //       }
  //       if (res.sharesList) {
  //         commit(types.SET_OUT_SHARES_LIST, res)
  //       }
  //       commit(types.UPDATE_OUT_CACHE_DATA_STATUS);
  //       resolve(res)
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // },

  // setOutMarketStatus({ commit }, marketCode) {
  //   return new Promise((resolve, reject) => {
  //     commit(types.SET_OUT_MARKET_TYPE, { isShares: marketCode })
  //     resolve()
  //   })
  // },

  // // 缓存数据
  // sendOutStockCache({ commit }, data) {
  //   const shares = state.outSharesList.map((item) => {
  //     return {
  //       stockName: item.sharesName,
  //       stockCode: item.sharesCode,
  //       transferNumber: item.sharesNum,
  //     };
  //   });
  //   console.log({type: 'out', step: 0, shares: shares,...data}, '缓存数据')
  //   return new Promise((resolve, reject) => {
  //     ApiOutStock.sendOutStockCache({type: 'out', step: 0, shares: shares,...data}).then((res) => {
  //       if (res.stock) {
  //         commit(types.GET_OUT_STOCK_TRANSFERRED, res)
  //       }
  //       if (res.sharesList) {
  //         commit(types.SET_OUT_SHARES_LIST, res)
  //       }
  //       resolve(res);
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // },

  // //更改获取转出已缓存数据状态
  // updateOutCached({commit, data}) {
  //   return new Promise((resolve,reject)=>{
  //     commit(types.UPDATE_OUT_CACHE_DATA_STATUS)
  //     resolve();
  //   })

  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}