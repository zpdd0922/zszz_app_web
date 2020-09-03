import { post, postImg } from '../request';
import paramsData from '@/main/request/utils/wrap-icrm';

export default {
  /**
   * 获取开户缓存数据
   * @method POST/JSON
   * @param openType          int 开户类型
   * openType
   * ONLINE_CN(1, "线上内地开户"),
   * ONLINE_HK(2, "线上香港开户"),
   * OFFLINE(3, "线下（开户宝）");
   * @return JSON { code: integer, message: string, result: { lastStep: integer, cacheInfos:{}, cacheImages: [],} }
  */
  // getCacheData: data => post('/open_api_cn/get_cache_data', data),
  getCacheData: data => post('/open_api/findUserTemp', data),

  /**
   * @param step
   * @param info  --> JSON字符串
   *
   */
  // saveCacheInfo: data => post('/open_api_cn/save_cache_info', data),
  saveCacheInfo: data => post('/open_api/save_user_info_temp', data),

  /**
   * @param ocr
   * @param imgBase64
   * @param type
   * @param location
   *
   */
  // saveCacheImg: (data, options) => postImg('/open_api_cn/save_cache_img', data, options),
  saveCacheImg: (data, options) => postImg('/open_api/saveimg', data, options),

  /**
   * @param info --> JSON字符串
   * @param imgIds --> 图片ID集合
   * @param actId --> 活动ID
   * @param openType --> 1、线上预约开户，2、线下（开户宝）3、香港预约开户
   * @param otherInfo --> {}
   *
   */
  // toCommitAllData: data => post('/open_api_cn/submit_open_info', data),
  toCommitAllData: data => post('/open_api/saveuinfo', data),

  /**
   * 获取PIN码
   */
  getCaPin: data => post('/open_api/get_ca_pin', data),

  /**
   * 保存pin码
   */
  saveCaPin: data => post('/open_api/save_ca_pin', data),

  /**
   * CA补录数据接口
   */
  getCaUpdateOpeninfo: data => post('/open_api/ca_update_openinfo', data)
};
