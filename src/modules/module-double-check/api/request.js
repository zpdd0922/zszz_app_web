/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/main/request/axios/';
import ajaxUpload from '@/main/request/axios/upload';
import paramsData from '@/main/request/utils/wrap';
import auth from '@/main/request/utils/auth';
import { getDefaultLang } from '@/main/locale/helper';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverUser;
// const baseURL = "http://localhost:8901/securities";

// const DEV = process.env.NODE_ENV !== 'production'
// const HOST_OPEN = DEV ? '/dev-open' : baseURL

const updateHeaders = () => ({
  // "X-Accept-Token": auth.getAuthToken(),
  // "X-Accept-Language": getDefaultLang(),
});

const axios = new Axios(baseURL, { updateHeaders, whiteApiList: ['/sec_api/save_into_money'] });

export const post = (url, params) => {
  return axios.post(url, params);
}

export const postCommon = (url, params) => {
  return axios.post(url, paramsData.COMMON(params));
}

export const postImg = (url, params, options) => {
  return ajaxUpload(baseURL, url, updateHeaders, params, options);
}