import Axios from '@/main/request/axios/';

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const baseURL = envConfig.serverHelpCenter;

const axios = new Axios(baseURL);

/**
 * 帮助中心接口
 * @class ApiHelpCenter
 */
export default class ApiHelpCenter {
  /**
   * getList 获取列表数据
   * @method POST/JSON publish/findPulishItems
   *
   */
  static getList(id) {
    return axios.post('publish/findPulishItems', { id });
  }
  /**
   * getSearchList 获取搜索列表
   * @method POST/JSON publish/searchPulishTitle
   *
   */
  static getSearchList(key) {
    return axios.post('publish/searchPulishTitle', { key });
  }
  /**
   * getSubList 获取子列表数据
   * @method POST/JSON publish/findPulishTitle
   *
   */
  static getSubList(id) {
    return axios.post('publish/findPulishTitle', { id });
  }
  /**
   * getDetail 获取文章详情
   * @method POST/JSON publish/findPulishContent
   *
   */
  static getDetail(id) {
    return axios.post('publish/findPulishContent', { id });
  }
};
