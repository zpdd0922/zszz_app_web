import { post } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 用户状态
   */
  findCrmUserStatus: data => post('/open_api/findCrmUserStatus', paramsData.COMMON(data)),

  /**
   * 获取开户方式
   *
   * @return JSON { code: integer, message: string, result: { bankType } }
   * bankType ==> 银行账户类型 [0-香港银行卡 1-大陆银行卡]
   */
  getOpenBankType: data => post('/open_api/get_open_bank_type', paramsData.COMMON(data)),

  /**
   * 获取开户状态
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
  getOpenStatus: data => post('/open_api/processstep', paramsData.COMMON(data)),

  /**
   * 获取邮箱激活状态
   */
  getActiveStatus: data => post('/open_api/update_open_email', paramsData.COMMON(data)),
};
