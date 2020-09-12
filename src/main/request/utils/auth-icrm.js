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
    return 'ios'
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

  updateLocalUserTokenInfo = (token) => {
    StorageCache.set('userTokenInfo', { token });
  }

  getLocalUserTokenInfo = () => {
    return StorageCache.get('userTokenInfo');
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
  getAuthToken = () => {
    // return '02f204d9a91d45a39081fb26bd2c3e75135074';
    // return 'e57f3825fa574b97b5690f7b9d6de26d134614';
    // 获取地址栏token，有则更新本地
    const urlParams = getURLParameters() || {};
    const urlToken = urlParams.token || '';
    if (urlToken) {
      this.updateLocalUserTokenInfo(urlToken[1]);
      return urlToken[1]
    }
    
    const tokenInfo = this.getLocalUserTokenInfo();
    if (tokenInfo) {
      return tokenInfo.token;
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
