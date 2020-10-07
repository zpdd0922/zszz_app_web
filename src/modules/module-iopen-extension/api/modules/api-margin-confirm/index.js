import { postCommon } from '../../request';

export default {
  /**
  * 查询用户现金账户及交易账户信息
  * @return clientStatus 客户状态
  * '1': 账户冻结(联系客服)    '0'：正常
  */
 handleOpenMargin: data => postCommon('/sec_api/find_acc_info', data),

};