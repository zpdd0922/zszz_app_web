import userApi from '@/modules/module-sign/api/user';

import auth from '@/main/request/utils/auth';
import * as types from './mutation-user-types';

// 初始化数据 --> mapStates
const state = {
  isShowImgCaptcha: false,
  userInfo: auth.getLocalUserInfo(),
  userSessionInfo: auth.getLocalUserSessionInfo(),
};

// 衍生数据，追踪数据更新后值 --> mapGetters
const getters = {
  isShowImgCaptcha: state => state.isShowImgCaptcha,
  userInfo: state => state.userInfo,
  userSessionInfo: state => state.userSessionInfo
};

// mutations，同步数据，vue视图文件中可用this.$store.commit
const mutations = {
  [types.SHOW_CAPTACH](state, payload) {
    state.isShowImgCaptcha = payload.status;
  },

  [types.SET_USER_INFO](state, payload) {
    const { result = {} } = payload;
    const obj = { sessionId: result.sessionId };
    state.userInfo = result;
    state.userSessionInfo = obj;
    auth.updateLocalUserSessionInfo(result.sessionId);
    auth.updateLocalUserInfo(result);
  }
};

// actions， 异步操作数据，vue视图文件中可用this.$store.dispatch
const actions = {
  /**
   * 获取短信验证码
   */
  fetchCaptcha({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.fetchCaptcha(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /**
   * H5登录
   */
  login({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.login(params)
        .then(res => {
          commit(types.SET_USER_INFO, { result: res });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
 * APP内模拟登录 --> 直接获取用户信息
 */
  appLogin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      commit(types.SET_USER_INFO, { result: params })
      resolve()
    })
  },
  /**
   * 登出 --> 后台
   */
  logout({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.logout(params)
        .then(res => {
          // 清除本地缓存
          auth.logout();
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 登出 --> 前端
   */
  fedLogout({ commit }) {
    return new Promise(resolve => {
      // 清除本地缓存
      auth.logout();
      resolve();
    });
  },

  /**
   * 发送短信验证码
   */
  sendCode({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.sendCode(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 是否需要图形验证码
   */
  needCaptcha({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.needCaptcha(params)
        .then(res => {
          commit(types.SHOW_CAPTACH, { status: res });
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 注册
   */
  register({ commit, state }, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      userApi.register(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 检查手机号码是否可用
   */
  checkMobile({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.checkMobile(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 检查验证码是否可用
   */
  checkCode({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.checkCode(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 更换手机
   */
  updateMobile({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.updateMobile(paramsData.PHONE(params))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 修改登录密码
   */
  updatePassword({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.updatePassword(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 修改交易密码
   */
  updateTradePassword({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.updateTradePassword(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 获取用户渠道类别
   */
  getUserType({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.getUserType(params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 重置登录密码
   */
  resetPassword({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userApi.resetPassword(params)
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
