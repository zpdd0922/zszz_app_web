
// import paramsData from '@/modules/module-iaccount/api/params/params-wrap'
import paramsData from "@/main/request/utils/wrap";
import openMarginApi from "@/modules/module-iopen-extension/api/modules/api-open-margin";

import * as types from "./mutation-user-types";

// 初始化数据 --> mapStates
const state = {
};

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
};

// mutations，同步数据，vue视图文件中可用this.$store.commit
const mutations = {
};

// actions， 异步操作数据，vue视图文件中可用this.$store.dispatch
const actions = {
  submitOpenMargin({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      openMarginApi.submitOpenMargin(data)
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
