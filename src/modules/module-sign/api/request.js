/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/main/request/axios/';
// import ajaxUpload from '@/main/request/axios/upload';
import paramsData from '@/main/request/utils/wrap';
import auth from '@/main/request/utils/auth';
// import { getDefaultLang } from '@/main/locale/helper';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverUser;
// const baseURL = 'http://121.35.249.13:8001';
// const baseURL = 'http://localhost:9000';

// const updateHeaders = () => ({
//   "X-Accept-Session": auth.getAuthSession(),
//   "X-Accept-Language": getDefaultLang(),
// });

const axios = new Axios(baseURL, {});

export const post = (url, params = {}, key = "") => {
  return axios.post(url, paramsData.NOPARAMS(params));
}
