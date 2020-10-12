import ApiAddLimit from "../../api/modules/api-add-limit";
import * as types from "./mutation-types";

// 初始化数据 --> mapStates
const state = {
  isFetching: false,
  // 历史数据
  curLimit: null,
};

const getters = {
  isFetching: (state) => state.isFetching,
  // curLimit: (state) => state.curLimit,
  // addLimitHistoryList: (state) => state.addLimitHistoryList,
};

const mutations = {
  [types.SET_IS_FETCHING](state, payload) {
    state.isFetching = payload.isFetching;
  },
  // [types.SET_CUR_LIMIT](state, payload) {
  //   state.curLimit = payload.lineCredit;
  // },

  // [types.SET_ADD_LIMIT_HISTORY_LIST](state, payload) {
  //   state.addLimitHistoryList = payload;
  // },
};

const actions = {
  //获取当前额度
  getMarginLoanLimitInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAddLimit.getMarginLoanLimitInfo(data)
        .then((res) => {
          // if (res) {
          //   commit(types.SET_CUR_LIMIT, res);
          // }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 获取历史数据
  getAddLimitHistory({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAddLimit.getAddLimitHistory(data)
        .then((res) => {
          if (res) {
            resolve(res);
          } else {
            resolve([]);
          }
          commit(types.SET_IS_FETCHING, { isFetching: false });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 提交申请
  submitAddLimit({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAddLimit.submitAddLimit(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
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
