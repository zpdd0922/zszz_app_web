/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:43
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 14:00:27
 * @Description:
 */

import axios from 'axios';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';

import ResCode from '../config/res-code';
import { toast } from '@/main/utils/common/tips/';
import { getMessage } from '../../locale/helper';
import _ from 'lodash';


export default class Axios {
  constructor(
    host,
    { notNeedLoading = [], successCode = ResCode.SUCCESS_CODE, loginxpriceCode = ResCode.LOGIN_EXPRICE_CODE, updateHeaders = null, whiteApiList = [] } = {}
  ) {
    const Fetch = axios.create({
      baseURL: host, // 前缀
      responseType: 'json', // 数据格式
      withCredentials: true, // 是否允许带cookie这些
      headers: {
        'Content-Type': 'application/json;charset=UTF-8', // json格式数据
      }
    });

    // http请求拦截器<pendding>
    Fetch.interceptors.request.use(
      config => {
        const reqUrl = config.url;
        console.log(reqUrl)
        const isLoading = notNeedLoading.some(val => reqUrl.indexOf(val) > -1);
        if (!isLoading) {
          // 发送请求做的处理
          BroadCast.send(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, { isFetching: true });
          // store.commit('updateLoadingStatus', { isLoading: true })
        }
        // 防止get请求获取数据304缓存，必须保证状态为200
        if (config.method === 'get') {
          if (config.params) {
            config.params['_'] = +new Date();
          } else {
            config.params = { '_': +new Date() };
          }
        }
        if (typeof updateHeaders === "function") {
          const headers = updateHeaders();
          Object.keys(headers).forEach(key => {
            config.headers[key] = headers[key];
          })
        }
        return config;
      },
      error => {
        console.log(error)
        toast({ type: 'error', txt: error.data.message });
        return Promise.reject(error);
      }
    );

    // http响应拦截器<done>
    Fetch.interceptors.response.use(
      response => {
        BroadCast.send(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, { isFetching: false });

        const reqUrl = response.config.url || '';
        const reqApi = reqUrl.replace(host, "");
        const langKey = _.get(response, ['config', 'headers', 'X-Accept-Language'], 'zk_CN');
        const data = response.data;

        // 接口请求数据格式固定
        const { code, message = getMessage("failBusy", langKey), result = {} } = data;

        // 处理请求完成code
        if (code !== successCode) {
          // -9999 未登录或者session已失效
          if (code === loginxpriceCode) {
            toast({
              type: 'error',
              txt: getMessage("failLogin", langKey),
              callback: () => {
                // 前端登出 --> 清除缓存数据
                BroadCast.send(BROADCAST_ENUMS.LOGIN_EXPRIS);
              }
            });
          } else {
            if (!whiteApiList.includes(reqApi))
              toast({ type: 'error', txt: message });
          }
          return Promise.reject(data);
        } else {
          // 成功请求，统一处理返回字段result
          return result;
        }
      },
      error => {
        // Loading模态框结束
        BroadCast.send(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, { isFetching: false });

        let message = error.message;
        // 超时错误
        if (error.code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          message = getMessage("failOvertime", langKey);
        }
        toast({ type: 'error', txt: message });
        return Promise.reject(error);
      }
    );

    return Fetch;
  }
}

// // 请求时的截拦器
// axios.interceptors.request.use(config => {
//   console.log(interfaceConfig)
//   // 发送请求做的处理
//   BroadCast.send(BROADCAST_ENUMS.FETCH_STARTING);
//   return config;
// }, error => {
//   BroadCast.send(BROADCAST_ENUMS.FETCH_STARTING);
//   return Promise.reject(error);
// });

// // 请求完成后的截拦器
// axios.interceptors.response.use(response => {
//   if (process.env.NODE_ENV === 'development' || envConfig.debug) {
//     const method = response.config.method || 'unknow method';
//     const url = response.config.url || 'unknow url';
//     const data = response.config.data || 'unknow data';
//     const headers = response.config.headers;
//     const respHeaders = response.headers;
//     const respData = response.data;

//     // 输出网络记录
//     // console.groupCollapsed(`[${method}] [${url}] %cSUCCESS`, 'color:green');
//     // console.info(`[Req_headers] %c${JSON.stringify(headers)}`, 'font-style:italic;color:#666');
//     // console.info(`[params] %c${data}`, 'font-style:italic;color:#666');
//     // console.info(`[Resp_headers] %c${JSON.stringify(respHeaders)}`, 'font-style:italic;color:#666');
//     // console.info(`%c${JSON.stringify(respData, null, '\t')}`, 'color:green');
//     // console.groupEnd();
//   }
//   BroadCast.send(BROADCAST_ENUMS.FETCH_ENDING);
//   return response;
// }, error => {
//   // if (process.env.NODE_ENV === 'development' || envConfig.debug) {
//   // const method = error.response.config.method || 'unknow method';
//   // const url = error.response.config.url || 'unknow url';
//   // const data = error.response.config.data || 'unknow data';
//   // const headers = error.response.config.headers;
//   // const respHeaders = error.response.headers;
//   // const respData = error.response.data;
//   // 输出网络记录
//   // console.groupCollapsed(`[${method}] [${url}] %cSUCCESS`, 'color:red');
//   // console.info(`[Req_headers] %c${JSON.stringify(headers)}`, 'font-style:italic;color:#666');
//   // console.info(`[params] %c${data}`, 'font-style:italic;color:#666');
//   // console.info(`[Resp_headers] %c${JSON.stringify(respHeaders)}`, 'font-style:italic;color:#666');
//   // console.info(`%c${JSON.stringify(respData, null, '\t')}`, 'color:red');
//   // console.groupEnd();
//   // }
//   BroadCast.send(BROADCAST_ENUMS.FETCH_ENDING);
//   return Promise.reject(error.response);
// });

// // 请求头
// const formatHeaders = (customHeaders = {}) => {
//   const defaultHeaders = {
//     'Content-Type': 'application/json;charset=UTF-8' // json格式数据
//   };

//   const headers = {
//     ...defaultHeaders,
//     ...customHeaders
//   };
//   return headers;
// };
