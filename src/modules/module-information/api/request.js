/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/main/request/axios/';
import paramsData from '@/main/request/utils/wrap';
import auth from '@/main/request/utils/auth';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
console.log(envConfig)
const baseURL = envConfig.serverInformation;


const axios = new Axios(baseURL, {});

export const post = (url, params = {}, key = "") => {
  return axios.post(url, paramsData.WRAP({ sessionId: auth.getAuthSession(), ...params }, key));
}
