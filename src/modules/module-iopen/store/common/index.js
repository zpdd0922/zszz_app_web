import openApi from '../../api/api-common';
import paramsData from '@/main/request/utils/wrap-icrm';
import { SUFFIX, IMAGE_REQUEST_LIST, WEB_OCCUPATION_TYPE } from '@/modules/module-iopen/api/params-define';
import { arrayToObject } from '@/main/utils/format/array';
import * as types from './mutation-types';

const state = {
  openProgress: null,
  openImgErr: {},
  openIndustry: []
};

const getters = {
  openProgress: state => state.openProgress,
  openImgErr: state => state.openImgErr,
  openIndustry: state => state.openIndustry
};

const mutations = {
  [types.OPEN_PROGRESS](state, payload) {
    state.openProgress = payload.result;
  },
  [types.OPEN_INDUSTRY](state, payload) {
    // 先排序
      const temp = payload.result.sort((a, b) => a.sort - b.sort);
      // 再取值
      state.openIndustry = temp.map(item => {
        const { name, value } = item;
        return { text: name, value: Number(value) };
      });
  },

  [types.OPEN_IMG_ERR](state, payload) {
    const { openImgErr = {} } = state;

    // errImg 初始化获取用户打回图片
    const { errImg } = payload;
    const errImgList = {};
    if (errImg && Array.isArray(errImg) && errImg.length !== 0) {
      const userImgObj = arrayToObject(errImg, 'imageLocationType');
      Object.keys(IMAGE_REQUEST_LIST).forEach(key => {
        const itemImgInfo = userImgObj[IMAGE_REQUEST_LIST[key].type];
        if (itemImgInfo) {
          errImgList[`${key}${SUFFIX}`] = itemImgInfo.imgPath;
        }
      });
    }
    state.openImgErr = { ...openImgErr, ...errImgList };
  }
};

const actions = {
  getOpenProgress({ commit, state }, params = {}) {
    return new Promise((resolve, reject) => {
      openApi.getOpenProgress(params)
        .then(res => {
          // TODO: 获取失败处理
          commit(types.OPEN_PROGRESS, { result: res });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getOcrData({ commit, state }, { imgType, openType }) {
    const { type, location } = IMAGE_REQUEST_LIST[imgType];
    const params = { type, location, openType };
    return new Promise((resolve, reject) => {
      openApi.getOcrData(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getOpenBankType({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.getOpenBankType(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  checkIdCard({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.checkIdCard(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  checkEmail({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.checkEmail(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  checkBankCard({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.checkBankCard(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  checkIsBindPhone({ commit, state }) {
    return new Promise((resolve, reject) => {
      openApi.checkIsBindPhone(paramsData.CHECK())
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getUserNamePY({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.getUserNamePY(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  saveSTInfo({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.saveSTInfo(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  startPlayRiskAudio({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.startPlayRiskAudio(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  endPlayRiskAudio({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.endPlayRiskAudio(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getDerivativeOpenStatus({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.getDerivativeOpenStatus(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  toSaveOpenDerivative({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.toSaveOpenDerivative(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getErrorImage({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.getErrorImage(params)
        .then(res => {
          commit(types.OPEN_IMG_ERR, { errImg: res });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  // lastImg: 0默认状态，1最后一张图
  updateImage({ commit, state }, { imgType, imgBase64, lastImg = 0, callback }) {
    const { ocr, type, location } = IMAGE_REQUEST_LIST[imgType];
    const params = { ocr, type, location, imgBase64, lastImg };
    return new Promise((resolve, reject) => {
      openApi.updateImage({ ...params, imgType, callback })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  // 是否显示赠股
  getHandselStockShow({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      openApi.getHandselStockShow(paramsData.COMMON(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  // 获取后台数据字典
  getDictionary({ commit, state }, mark) {
    return new Promise((resolve, reject) => {
      openApi.getDictionary({ mark })
        .then(res => {
          const re = res || [];
          commit(types.OPEN_INDUSTRY, { result: re });
          resolve(re);
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
