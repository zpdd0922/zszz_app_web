import { postCommon } from "../../request";

export default {
  /**
   * 查询用户提额历史记录
   * @return 
   */
  getAddLimitHistory: (data) => postCommon("http://192.168.1.19:6012/web_bpm/inc_credit_limit/find_inc_credit_limit", data),
  /**
   * 查询用户当前额度
   * @return 
   */
  getMarginLoanLimitInfo: (data) => postCommon("/inc_credit_limit/find_inc_credit_limit_now", data),
  /**
   * 查询用户提额历史记录
   * @return 
   */
  submitAddLimit: (data) => postCommon("http://192.168.1.19:6012/web_bpm/inc_credit_limit/save_inc_credit_limit", data),
};
