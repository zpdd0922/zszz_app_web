import { postCommon } from '../../request';

export default {
  /**
  * 查询用户现金账户及交易账户信息
  * @return clientStatus 客户状态
  * '1': 账户冻结(联系客服)    '0'：正常
  */
 submitOpenMargin: data => postCommon('http://192.168.1.19:6012/web_bpm/open_more_user_info/save_open_more_user_info', data),
  /**
  * 查询用户现金账户及交易账户信息
  * @return clientStatus 客户状态
  * '1': 账户冻结(联系客服)    '0'：正常
  */
//  submitOpenMargin: data => postCommon('http://192.168.1.19:6012/web_bpm/sec_api/find_acc_info', data),
};