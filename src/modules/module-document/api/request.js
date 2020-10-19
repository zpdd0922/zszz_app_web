/*
 * @Author: Jim
 * @Date: 2020-01-14 12:23:58
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 16:57:07
 * @Description: 
 */
import Axios from '@/main/request/axios/';
import ajaxUpload from '@/main/request/axios/upload';
import paramsData from '@/main/request/utils/wrap-icrm';
import auth from '@/main/request/utils/auth-icrm';
import { getDefaultLang } from '@/main/locale/helper';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverDocument;

const updateHeaders = () => ({
  "X-Accept-Token": auth.getAuthToken(),
  "X-Accept-Language": getDefaultLang(),
});

const axios = new Axios(baseURL, { updateHeaders, whiteApiList: [] });

export const getLocal = (key, lang) => {
  return axios.get(baseURL + `/mockdata/${key}_${lang}.json`)
    .then(response => {
      console.log(response)
      return response;
    });
}
