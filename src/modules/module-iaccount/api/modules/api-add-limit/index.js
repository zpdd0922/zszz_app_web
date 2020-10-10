import { postCommon } from "../../request";

export default {
  /**
   * 查询用户提额历史记录
   * @return 
   */
  getAddLimitHistory: (data) => postCommon("/inc_credit_limit/find_inc_credit_limit", data),
  /**
   * 查询用户提额历史记录
   * @return 
   */
  getMarginLoanLimitInfo: (data) => postCommon("/inc_credit_limit/find_inc_credit_limit_now", data),
  /**
   * 查询用户提额历史记录
   * @return 
   */
  submitAddLimit: (data) => postCommon("/inc_credit_limit/save_inc_credit_limit", data),
};
