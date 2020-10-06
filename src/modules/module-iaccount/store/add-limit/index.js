import ApiAddLimit from "../../api/modules/api-add-limit";
import * as types from "./mutation-types";

// 初始化数据 --> mapStates
const state = {
  isFetching: false,
  // 历史数据
  addLimitHistoryList: [
    {
      fundAccount: "102334",
      tradeAccount: "1000376",
      lineCredit: 5000.0,
      createTime: 1601955036000,
      updateTime: 1601978482000,
      id: 25,
      userId: 1005977,
      creditRating: 12.0,
      backReason: null,
      status: 2,
    },
    {
      fundAccount: "102334",
      tradeAccount: "1000376",
      lineCredit: 8000.0,
      createTime: 1601978419000,
      updateTime: 1601985521000,
      id: 26,
      userId: 1005977,
      creditRating: 13.0,
      backReason: null,
      status: 2,
    },
    {
      fundAccount: "123456",
      tradeAccount: "1000376",
      lineCredit: null,
      createTime: 1601985550000,
      updateTime: null,
      id: 27,
      userId: 1005977,
      creditRating: null,
      backReason: null,
      status: 0,
    },
  ],
  curLimit: null,
};

const getters = {
  isFetching: (state) => state.isFetching,
  curLimit: (state) => state.curLimit,
  addLimitHistoryList: (state) => state.addLimitHistoryList,
};

const mutations = {
  [types.SET_IS_FETCHING](state, payload) {
    state.isFetching = payload.isFetching;
  },
  [types.SET_CUR_LIMIT](state, payload) {
    state.curLimit = payload.lineCredit;
  },

  [types.SET_ADD_LIMIT_HISTORY_LIST](state, payload) {
    state.addLimitHistoryList = payload.addLimitHistoryList;
  },
};

const actions = {
  //获取当前额度
  getCurLimit({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAddLimit.getCurLimit(data)
        .then((res) => {
          if (res) {
            commit(types.SET_CUR_LIMIT, res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 获取历史数据
  fetchingAddLimitHistory({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAddLimit.getCurLimit(data)
        .then((res) => {
          if (res) {
            commit(types.SET_IS_FETCHING, { isFetching: false });
            commit(types.SET_ADD_LIMIT_HISTORY_LIST, res);
          }
          resolve(res);
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
