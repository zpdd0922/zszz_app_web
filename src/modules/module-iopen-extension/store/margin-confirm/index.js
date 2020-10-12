import openApi from '@/modules/module-iopen/api/api-common/index.js';
import paramsData from '@/main/request/utils/wrap-icrm';
import { SUFFIX, IMAGE_REQUEST_LIST, WEB_OCCUPATION_TYPE } from '@/modules/module-iopen/api/params-define';
import { arrayToObject } from '@/main/utils/format/array';
import * as types from './mutation-types';
import openMarginApi from "@/modules/module-iopen-extension/api/modules/api-open-margin";


const state = {
  openProgress: null,

};

const getters = {
  openProgress: state => state.openProgress
};

const mutations = {
  [types.OPEN_PROGRESS](state, payload) {
    state.openProgress = payload.result;
  },
};

const actions = {
  getOpenProgress({ commit, state }, params = {}) {
    return new Promise((resolve, reject) => {
      openApi.getOpenProgress(params)
        .then(res => {
          commit(types.OPEN_PROGRESS, { result: res });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
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
  actions
};

