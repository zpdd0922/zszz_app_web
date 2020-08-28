import openCNApi from '@/modules/module-iopen/api/api-cn';
import openApi from '@/modules/module-iopen/api/api-common';
import paramsData from '@/main/request/utils/wrap-icrm';
import { SUFFIX, IMAGE_REQUEST_LIST } from '@/modules/module-iopen/api/params-define';
import { arrayToObject } from '@/main/utils/format/array';
import * as types from './mutation-cn-types';
import _ from 'lodash';

const state = {
  openInfoInit: {},
  openImg: {},
  openSt: {},
  openInfo: null
};

const getters = {
  // openInfoInit: state => state.openInfoInit,
  openImg: state => state.openImg,
  openSt: state => state.openSt,
  openInfo: state => state.openInfo
};

const mutations = {
  [types.OPEN_INFO_INIT](state, payload) {
    state.openInfoInit = payload.result;
  },

  [types.OPEN_IMG](state, payload) {
    const { openImg = {} } = state;

    // updateImg 其后每次上传图片字段
    // userImg 第一次初始化获取用户图片
    const { userImg, updateImg = {} } = payload;

    const userImgList = {};
    if (userImg && Array.isArray(userImg) && userImg.length !== 0) {
      const userImgObj = arrayToObject(userImg, 'type');
      Object.keys(IMAGE_REQUEST_LIST).forEach(key => {
        const itemImgInfo = userImgObj[IMAGE_REQUEST_LIST[key].type];
        if (itemImgInfo) {
          userImgList[`${key}${SUFFIX}`] = itemImgInfo.imgUrl;
        }
      });
    }
    state.openImg = { ...openImg, ...userImgList, ...updateImg };
  },

  [types.OPEN_INFO](state, payload) {
    const { openInfo = {} } = state;
    const { info = {} } = payload;
    state.openInfo = { ...openInfo, ...info };
  },

  [types.OPEN_ST](state, payload) {
    const { openSt = {} } = state;
    const { info = {} } = payload;
    state.openSt = { ...openSt, ...info };
  }

};

const actions = {
  getCnCacheData({ commit, state }, params = { step: 0 }) {
    return new Promise((resolve, reject) => {
      openCNApi.getCacheData(params)
        .then(res => {
          const { userInfo, userImg } = res || {};
          commit(types.OPEN_INFO_INIT, { result: res });
          commit(types.OPEN_IMG, { userImg: userImg });
          commit(types.OPEN_INFO, { info: userInfo });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  saveCnCacheInfo({ commit, state }, params) {
    const { info } = params;
    const paramsCopy = _.clone(params)
    const obj = { ...params, info: JSON.stringify(paramsCopy.info) }
    return new Promise((resolve, reject) => {
      openCNApi.saveCacheInfo(obj)
        .then(res => {
          commit(types.OPEN_INFO, { info });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  setStInfo({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      commit(types.OPEN_ST, { info: params });
      resolve();
    });
  },
  saveImage({ commit, state }, { imgType, imgBase64, callback }) {
    const { ocr, type, location } = IMAGE_REQUEST_LIST[imgType];
    const params = { ocr, type, location, imgBase64 };
    return new Promise((resolve, reject) => {
      openCNApi.saveCacheImg(params, { imgType, callback })
        .then(res => {
          const updateImg = { [`${imgType}${SUFFIX}`]: res.path };
          commit(types.OPEN_IMG, { updateImg });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  saveImageSt({ commit, state }, { imgType, imgPath }) {
    return new Promise((resolve, reject) => {
      const updateImg = { [`${imgType}${SUFFIX}`]: imgPath };
      commit(types.OPEN_IMG, { updateImg });
      resolve();
    });
  },
  // 生产PIN
  getCaPin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openCNApi.getCaPin(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        });
    });
  },
  // 生产PIN
  saveCaPin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openCNApi.saveCaPin(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        });
    });
  },
  // 补录签发机关&民族
  getCaUpdateOpeninfo({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openCNApi.getCaUpdateOpeninfo(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        });
    });
  },
  toCommitAllData({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openCNApi.toCommitAllData(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
