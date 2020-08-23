/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/main/request/axios/';
// import ajaxUpload from '@/main/request/axios/upload';
import paramsWrap from '@/main/request/utils/wrap-icrm';
import auth from '@/main/request/utils/auth-icrm';
import { getDefaultLang } from '@/main/locale/helper';
const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverUser;
// const baseURL = "http://localhost:8901/securities";

// const baseURL = 'http://121.35.249.13:8001';
// const baseURL = 'http://localhost:9000';

const updateHeaders = () => ({
  "X-Accept-Token": auth.getAuthToken(),
  "X-Accept-Language": getDefaultLang(),
});

// const axios = new Axios(baseURL, {});
const axios = new Axios(baseURL, { updateHeaders });

export const post = (url, params = {}, key = "") => {
  return axios.post(url, paramsWrap.WRAP(params, key));
}


