// import axios from '../axios';
import { post, postImg } from '../request';

export default {

  /**
   * 获取开户状态
   * @method POST/JSON open_api/processstep
   * @param openType      int 开户类型
   ** openType
   * 1: 只查询线上开户情况
   * 2: 线上线下开户状态均查询
   * @return JSON { code: integer, message: string, result }
   * 0 开户成功
   * 1 开户中(线上已提交资料 || 线上已经预约)
   * 2 开户失败（线下相关）
   * 3 基本资料错误（线上相关）
   * 4 图片资料错误（线上相关）
   * 5 基本资料以及图片资料错误（线上相关）
   * 6 未提交资料 （单独处理）
   * 7 开户被拒绝
   * 8 用户取消开户
   */
  getOpenProgress: data => post('/open_api/get_open_progress', data),

  /**
   * OCR识别
   * @param type
   * @param location
   * @param openType
   */
  getOcrData: data => post('/open_api/ocr_by_image', data),

  /**
   * 身份证唯一性校验 - 大陆开户
   * @param idCard
   * @param name
   * @param cardType : 1
   */
  checkIdCard: data => post('/open_api/verify_id_card', data),

  /**
   * 四要素校验 - 大陆开户
   * @param bankCode
   * @param bankCard
   * @param idCard
   * @param name
   */
  checkBankCard: data => post('/open_api/verify_bank_card_4e', data),

  /**
   * 邮箱唯一性校验
   * @param email
   */
  checkEmail: data => post('/open_api/verify_email', data),

  /**
   * 查询手机号是否已绑定
   */
  checkIsBindPhone: data => post('/open_api/is_bind_phone', data),

  /**
   * 获取用户拼音
   * @param userName
   */
  getUserNamePY: data => post('/open_api/getUserNamePy', data),

  /**
   * @param name
   *
   */
  saveSTInfo: data => post('/open_api/saveStInfo', data),

  /**
   * 收听语音
   */
  startPlayRiskAudio: data => post('/open_api/riskstart', data),

  /**
   * 暂停语音
   */
  endPlayRiskAudio: data => post('/open_api/riskend', data),

  /**
   * 衍生品开户状态
   */
  getDerivativeOpenStatus: data => post('/open_api/openDerivativeStatus', data),

  /**
   * 衍生品开户
   * @param info --> JSON字符串
   *
   */
  toSaveOpenDerivative: data => post('/open_api/saveOpenDerivative', data),

  /**
   * 获取打回图片
   * @method POST/JSON
   * @return JSON { code: integer, message: string, result: { userInfo:{}, userImg: [],} }
  */
  getErrorImage: data => post('/open_api/getUserErrorInfo', data),

  /**
   * 更新打回图片
   * @param ocr
   * @param lastImg  --> 默认0
   * @param imgBase64
   * @param type
   * @param location
   *
   */
  updateImage: data => postImg('/open_api/saveimg_update', data),

  /**
   * 获取开户方式
   *
   * @return JSON { code: integer, message: string, result: { bankType } }
   * bankType ==> 银行账户类型 [0-香港银行卡 1-大陆银行卡]
   */
  getOpenBankType: data => post('/open_api/get_open_bank_type', data),

  /**
   * 获取所属行业
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  getDictionary: data => post('/open_api/get_dictionary', data),

  /**
   * 是否能参加赠股活动
   */
  getHandselStockShow: data => post('/reward_center_api/handsel_stock_show', data)

};
