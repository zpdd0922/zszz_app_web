import {
  KEY_USER_INFO,
  KEY_SESSION_INFO,
} from "@/modules/module-iaccount/api/config";
// import paramsData from '@/modules/module-iaccount/api/params/params-wrap'
import paramsData from "@/main/request/utils/wrap";
import AccountApi from "@/modules/module-iaccount/api/modules/api-account";

import * as types from "./mutation-user-types";

// 初始化数据 --> mapStates
const state = {
  secAccountInfo: null, // 账户信息
  isOpenCnStockMarket: null, // 是否开通A股
  isOpenHkStockMarket: null, // 是否开通港股
  isOpenUsaStockMarket: null, // 是否开通美股
};

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  secAccountInfo: (state) => state.secAccountInfo,
  isOpenCnStockMarket: (state) => state.isOpenCnStockMarket,
  isOpenHkStockMarket: (state) => state.isOpenHkStockMarket,
  isOpenUsaStockMarket: (state) => state.isOpenUsaStockMarket,
};

// mutations，同步数据，vue视图文件中可用this.$store.commit
const mutations = {
  [types.GET_SEC_USER_INFO](state, payload = {}) {
    state.secAccountInfo = payload;
    state.isOpenCnStockMarket = payload.isOpenCnStockMarket && Boolean(payload.isOpenCnStockMarket);
    state.isOpenHkStockMarket = payload.isOpenHkStockMarket && Boolean(payload.isOpenHkStockMarket);
    state.isOpenUsaStockMarket = payload.isOpenUsaStockMarket && Boolean(payload.isOpenUsaStockMarket);
  },
  // [types.SET_OPEN_CN_STOCK_MARKET](state, payload = {}) {
  //   state.isOpenCnStockMarket = payload.isOpenCnStockMarket
  // },
  // [types.SET_OPEN_HK_STOCK_MARKET](state, payload = {}) {
  //   state.isOpenHkStockMarket = payload.isOpenHkStockMarket
  // },
  // [types.SET_OPEN_USA_STOCK_MARKET](state, payload = {}) {
  //   state.isOpenUsaStockMarket = payload.isOpenUsaStockMarket
  // },
};

// actions， 异步操作数据，vue视图文件中可用this.$store.dispatch
const actions = {
  getSecAccountInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      AccountApi.getSecAccountInfo(data).then((res) => {
        if (res) {
          commit(types.GET_SEC_USER_INFO, res);
        }
        resolve(res);
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
