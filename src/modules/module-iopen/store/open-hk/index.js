import openHKApi from '@/modules/module-iopen/api/api-hk';
import paramsData from '@/main/request/utils/wrap-icrm';
import { SUFFIX, IMAGE_REQUEST_LIST } from '@/modules/module-iopen/api/params-define';
import { arrayToObject } from '@/main/utils/format/array';
import * as types from './mutation-hk-types';
import _ from 'lodash';

const state = {
  openInfoInitHK: {},
  openImgHK: {},
  openInfoHK: null
};

const getters = {
  openImgHK: state => state.openImgHK,
  openInfoInitHK: state => state.openInfoInitHK,
  openInfoHK: state => state.openInfoHK
};

const mutations = {
  [types.OPEN_INFO_INIT_HK](state, payload) {
    state.openInfoInitHK = payload.result;
  },

  [types.OPEN_IMG_HK](state, payload) {
    const { openImgHK = {} } = state;

    // userImg 第一次初始化获取用户图片
    // updateImg 其后每次上传图片字段
    const { userImg, updateImg = {} } = payload;

    const userImgList = {};
    if (userImg && Array.isArray(userImg) && userImg.length !== 0) {
      const userImgObj = arrayToObject(userImg, 'imageLocationType');
      Object.keys(IMAGE_REQUEST_LIST).forEach(key => {
        const itemImgInfo = userImgObj[IMAGE_REQUEST_LIST[key].type];
        if (itemImgInfo) {
          userImgList[`${key}${SUFFIX}`] = itemImgInfo.imgPath;
        }
      });
    }
    state.openImgHK = { ...openImgHK, ...userImgList, ...updateImg };
  },

  [types.OPEN_INFO_HK](state, payload) {
    const { openInfoHK = {} } = state;
    const { info = {} } = payload;
    state.openInfoHK = { ...openInfoHK, ...info };
  }

};

const actions = {
  getHkCacheData({ commit, state }, params = { step: 0 }) {
    return new Promise((resolve, reject) => {
      openHKApi.getCacheData(params)
        .then(res => {
          // const { cacheInfos, cacheImages } = res || {};
          const { userInfo, userImg } = res || {};
          commit(types.OPEN_INFO_INIT_HK, { result: res });
          commit(types.OPEN_IMG_HK, { userImg: userImg });
          commit(types.OPEN_INFO_HK, { info: userInfo });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  saveHkCacheInfo({ commit, state }, params) {
    const { info } = params;
    const paramsCopy = _.clone(params)
    const obj = { ...params, info: JSON.stringify(paramsCopy.info) }
    return new Promise((resolve, reject) => {
      openHKApi.saveCacheInfo(obj)
        .then(res => {
          commit(types.OPEN_INFO_HK, { info });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  setUserInfoHK({ commit, state }, params) {
    const { info } = params;
    return new Promise((resolve, reject) => {
      openHKApi.saveCacheInfo(params)
        .then(res => {
          commit(types.OPEN_INFO_HK, { info: JSON.parse(info) });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  saveImageHK({ commit, state }, { imgType, imgBase64, callback }) {
    const { type, location } = IMAGE_REQUEST_LIST[imgType];
    const params = { type, location, imgBase64 };
    return new Promise((resolve, reject) => {
      openHKApi.saveCacheImg(params, { imgType, callback })
        .then(res => {
          const updateImg = { [`${imgType}${SUFFIX}`]: res.path };
          commit(types.OPEN_IMG_HK, { updateImg });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  checkPhoneHK({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openHKApi.checkPhone(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  toCommitAllDataHK({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openHKApi.toCommitAllData(params)
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
