/*
 * @Author: Jim
 * @Date: 2020-01-14 14:11:00
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-14 14:12:27
 * @Description: 
 */
// export const OPEN_STATUS = {
//   UN_START: -1, // 未开始
//   UN_SUBMIT: 0, // 未提交
//   PENDING: 1, // 开户中
//   CANCELED: 2, // 开户已取消
//   SUCCESS: 3, // 开户成功
//   FAILED: 4, // 开户失败
//   ACCOUNT_OFF: 5, // 销户
//   ACCOUNT_ABO: 6, // 账户异常
// };

export const OPEN_STATUS = {
  UN_START: 6, // 未开始
  UN_SUBMIT: -1, // 未提交
  PENDING: 1, // 开户中
  CANCELED: 8, // 开户已取消
  SUCCESS: 0, // 开户成功
  FAILED: 3, // 开户失败
  FAILED_1: 4, // 开户失败
  FAILED_2: 5, // 开户失败
  START_CA: 9, // 进行CA认证
  CA_PENG: 10, // CA状态审核
  // ACCOUNT_OFF: 5, // 销户
  // ACCOUNT_ABO: 6, // 账户异常
};

export const FAIL_STATUS_TYPE = {
  UN_KNOW: -1, // 未知
  ERROR_OTHER: 0, // 其他错误
  ERROR_INFO: 1, // 基本数据错误
  ERROR_PIC: 2, // 影像数据错误
  ERROR_INFO_PIC: 3, // 基本或影像数据错误
  ERROR_CA: 4, // CA数据错误
};

export const PENDING_STATUS_TYPE = {
  UN_KNOW: -1, // 未知
  DOING: 0, // 预批中
  APPROVE: 1, // 审批中
  CA: 2, // CA认证中
  OPEN: 3, // 柜台开户中
};