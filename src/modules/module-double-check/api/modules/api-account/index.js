import { post, postCommon } from "../../request";
import paramsData from "@/main/request/utils/wrap";

export default {
  /**
   * 查询用户现金账户及交易账户信息
   * @return clientStatus 客户状态
   * '1': 账户冻结(联系客服)    '0'：正常
   */
  getSecAccountInfo: (data) => postCommon("/sec_api/find_acc_info", data),

  /**
   * 校验交易密码
   *
   */
  validTrdPwd: (data) => postCommon("/sec_api/valid_trd_pwd", data),

  /**
   * 获取用户信息
   */
  findSecAccountInfo: (data) => postCommon("/sec_api/find_user_info", data),

  /**
   * 用户状态
   */
  findCrmUserStatus: (data) => postCommon("/open_api/findCrmUserStatus", data),

  /**
   * 获取开户方式
   *
   * @return JSON { code: integer, message: string, result: { bankType } }
   * bankType ==> 银行账户类型 [0-香港银行卡 1-大陆银行卡]
   */
  getOpenBankType: (data) => postCommon("/open_api/get_open_bank_type", data),

  /**
   * 获取用户交易手机号
   *
   */
  getOpenAccountNum: (data) =>
    post("/user_api/find_trade_phone", paramsData.PARAMSWITHVERSION(data)), 
  
  /**
   * 获取二重认证验证码
   *
   */
  getVerifyCode: (data) =>
    post("/user_api/reg_valcode",data),

  /**
   * 校验二重认证验证码
   *
   */
  checkCaptcha: (data) =>
    post("/user_api/sms_verify", paramsData.PARAMSWITHVERSION(data)),

  // /**
  //  * 获取邮箱激活状态
  //  */
  // getActiveStatus: data => postCommon('/open_api/update_open_email', data),
};
