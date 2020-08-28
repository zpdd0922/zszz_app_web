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
//  getCacheData: data => post('/open_api_hk/get_cache_data', data),
 getCacheData: data => post('/open_api_hk/get_open_info_temp', paramsData.WRAP_APP(data)),

 /**
  * @param step
  * @param info  --> JSON字符串
  *
  */
//  saveCacheInfo: data => post('/open_api_hk/save_cache_info', data),
 saveCacheInfo: data => post('/open_api_hk/save_open_info_temp', paramsData.WRAP_APP(data)),

 /**
  * @param ocr
  * @param imgBase64
  * @param type
  * @param location
  *
  */
 saveCacheImg: (data, options) => postImg('/open_api_hk/save_img', data, options),

 /**
  * @param info --> JSON字符串
  * @param imgIds --> 图片ID集合
  * @param actId --> 活动ID
  * @param openType --> 1、线上预约开户，2、线下（开户宝）3、香港预约开户
  * @param otherInfo --> {}
  *
  */
//  toCommitAllData: data => post('/open_api_hk/submit_open_info', data),
 toCommitAllData: data => post('/open_api_hk/save_open_info', paramsData.WRAP_APP(data)),

  /**
   * 手机号唯一性校验
   * @param phoneNumber
   */
  // checkPhone: data => post('/open_api_hk/phone_verify', data),
  checkPhone: data => post('/open_api_hk/phone_verify', paramsData.WRAP_APP(data)),
};
