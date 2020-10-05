import {
  KEY_USER_INFO,
  KEY_SESSION_INFO,
} from "@/modules/module-iaccount/api/config";
// import paramsData from '@/modules/module-iaccount/api/params/params-wrap'
import paramsData from "@/main/request/utils/wrap";
import AccountApi from "@/modules/module-double-check/api/modules/api-account";

import * as types from "./mutation-user-types";

// 初始化数据 --> mapStates
const state = {
  openAccountNum: null, // 开户手机号
};

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  openAccountNum: (state) => state.openAccountNum,
};

// mutations，同步数据，vue视图文件中可用this.$store.commit
const mutations = {
  [types.SET_OPEN_ACCOUNT_NUM](state, payload = { phoneNumber: null }) {
    state.openAccountNum = payload.phoneNumber;
  },
};

// actions， 异步操作数据，vue视图文件中可用this.$store.dispatch
const actions = {
  getOpenAccountNum({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      AccountApi.getOpenAccountNum(data).then((res) => {
        if (res) {
          commit(types.SET_OPEN_ACCOUNT_NUM, res);
        }
        resolve(res);
      });
    });
  },
  getVerifyCode({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      AccountApi.getVerifyCode(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  checkCaptcha({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      AccountApi.checkCaptcha(data)
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
