/* eslint-disable */
/*
 * @Author: Jim
 * @Date: 2019-12-18 15:18:24
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:21:42
 * @Description: 用戶本地權限相關
 */
import UaInfo from '@/main/utils/common/ua-info';
import StorageCache from '@/main/utils/cache/localstorage';
import { getURLParameters } from "@/main/utils/format/url";

class Auth {
  /**
   * 获取平台
   *
   * @return string
   */
  getPlateform = () => {
    //TODO:
    return 'h5';
    // return 'ios';
    if (UaInfo.isApp()) {
      if (UaInfo.isAndroid()) {
        return 'android';
      } else if (UaInfo.isIOS()) {
        return 'ios';
      }
      return 'unknown';
    }
    return 'h5';
  }

  updateLocalUserSessionInfo = (sessionId) => {
    StorageCache.set('userSessionInfo', { sessionId });
  }

  getLocalUserSessionInfo = () => {
    return StorageCache.get('userSessionInfo');
  }

  updateLocalUserInfo = (userInfo) => {
    StorageCache.set('userInfo', userInfo);
  }

  getLocalUserInfo = () => {
    return StorageCache.get('userInfo');
  }

  /**
  * 获取登录凭证
  *
  * @return string
  */
  getAuthSession = () => {
    //TODO:
    return '255ebb808c80454fb65f200065afcf2f136059';
    // return 'f103ae8036da43aba073b4f3b51ee214135079';
    // 获取地址栏session，有则更新本地
    const urlParams = getURLParameters() || {};
    const urlSession = urlParams.sessionId || '';
    if (urlSession) {
      this.updateLocalUserSessionInfo(urlSession);
      return urlSession
    }

    const sessionInfo = this.getLocalUserSessionInfo();
    if (sessionInfo) {
      return sessionInfo.sessionId;
    }

    return '';
  }

  /**
   * 获取userId
   *
   * @return string
   */
  getUserId = () => {
    const urlParams = getURLParameters() || {};
    const urlUserId = urlParams.userId || '';
    if (urlUserId) {
      let localUserInfo = this.getLocalUserInfo();
      if (!localUserInfo) {
        localUserInfo = {};
      }

      localUserInfo.userId = matches[1];

      this.updateLocalUserInfo(localUserInfo);
      return matches[1]
    }
    const userInfo = this.getLocalUserInfo();
    if (userInfo) {
      return userInfo.userId;
    }
    return ''
  };

  logout = () => {
    StorageCache.clear();
  }
}

export default new Auth()
