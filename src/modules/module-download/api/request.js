/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/modules/common/api/axios/';
// import ajaxUpload from '@/modules/common/api/axios/upload';
import paramsData from '@/modules/common/api/params/params-wrap';
import auth from '@/main/request/utils/auth';
// import { getDefaultLang } from '@/modules/common/locale/helper';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverMaster;
// const baseURL = 'http://121.35.249.13:8001';

// const updateHeaders = () => ({
//   "X-Accept-Session": auth.getAuthSession(),
//   "X-Accept-Language": getDefaultLang(),
// });

const axios = new Axios(baseURL, {});

export const post = (url, params = {}, key = "") => {
  return axios.post(url, paramsData.WRAP({ sessionId: auth.getAuthSession(), ...params }, key));
}
