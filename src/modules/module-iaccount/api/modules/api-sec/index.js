import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';


export default {
  /**
   * 上传图片
   * { serviceType, imgBase64, type: 1 }
   */
  saveImage: data => postImg('/sec_api/save_img', paramsData.COMMON(data)),

  /**
   * 根据图片id获取图片资源
   * @param imgIds 图片id，多个使用逗号分隔
   */
  getImg: data => post('/sec_api/get_img', paramsData.COMMON(data)),

  /**
   * 根据入金方式获取详情数据
   * @param depositType 入金方式 (默认1：fps转数快)
   *
   */
  typeSettingInfo: data => post('/sec_api/deposit/type_setting_info', paramsData.COMMON(data)),

  /**
   * 获取入金银行卡列表信息
   * @param bankType 银行类型  1:大陆  2:香港
   *
   */
  bankListDeposit: data => post('/sec_api/deposit/bank_setting_info', paramsData.COMMON(data)),

  /**
   * 获取出金银行卡列表信息
   * @param bankType 银行类型  1:大陆  2:香港
   *
   */
  bankListWithdraw: data => post('/sec_api/withdrawals/bank_setting_info', paramsData.COMMON(data)),

  /**
   * 解绑 - 已绑定的银行卡
   */
  depositBankCancel: data => post('/sec_api/deposit_bank_cancel', paramsData.COMMON(data)),

  /**
   * 查询用户入金成功 - 绑定的银行卡列表
   * @param bankType 0 - 全部  1 - 大陆  2 - 香港
   * @param bankCount 3 - 返回银行卡数量
   * @param fundAccount 现金账号
   */
  depositBank: data => post('/sec_api/deposit_bank', paramsData.COMMON(data)),

  /**
   * 存入资金
   */
  saveIntoMoney: data => post('/sec_api/save_into_money', paramsData.COMMON(data)),

  /**
   * 提取资金
   */
  toCommitCashOutData: data => post('/sec_api/extract_fund', paramsData.COMMON(data)),

  /**
   * 查询用户最近出金成功 - 银行卡信息
   * @param extMethod 1 - 大陆卡  2 - 香港卡
   * @return {"address":"","swiftCode":"","bankName":"","bankAccount":"","bankCode":""}
   */
  withdrawBank: data => post('/sec_api/withdraw_bank', paramsData.COMMON(data)),

  /**
  * 查询用户现金账户及交易账户信息
  * @return clientStatus 客户状态
  * '1': 账户冻结(联系客服)    '0'：正常
  */
  findsecAccountInfo: data => post('/sec_api/find_acc_info', paramsData.COMMON(data)),

  getStockInfo: data => post('/sec_api/find_transferred_stock', paramsData.COMMON(data)),
  
  saveStockInfo: data => post('/sec_api/transferred_stock', paramsData.COMMON(data)),

  /**
   * 获取用户可提取资金信息
   * @param fundAccount 现金账号
   * @param moneyType 2-港币 1-美元
   */
  findExtractableMoney: data => post('/sec_api/find_extractable_money', paramsData.COMMON(data)),

  /**
   * 是否可以大陆银行卡入金 - 针对已大陆卡开户用户（早期业务需求）
   * 区分运行环境tips
   * H5-大陆银行卡入金需先进行CA认证，请下载智珠宝APP进行此操作
   * APP-大陆银行卡入金需先进行CA认证
   * @param verifyIsRestrictOpenAccount <Boolean>
   */
  validataPurview: data => post('/sec_api/validata_purview', paramsData.COMMON(data)),

  /**
   * 取消冻结资金
   */
  cancelWithdrawal: data => post('/sec_api/cancel_withdrawal', paramsData.COMMON(data)),

  /**
   * 校验交易密码
   *
   */
  validTrdPwd: data => post('/sec_api/valid_trd_pwd', paramsData.COMMON(data)),

  /**
   * 获取资金流水汇总
   */
  fundRecordSum: data => post('/sec_api/fund_record_sum', paramsData.COMMON(data)),

  /**
   * 获取资金流水
   */
  fundRecordInfo: data => post('/sec_api/fund_record_info', paramsData.COMMON(data)),

  /**
   * 获取股票流水
   */
  stockRecordInfo: data => post('/sec_api/stock_record_info', paramsData.COMMON(data)),

  /**
   * edda提交保存接口
   */
  eddaBankSave: data => post('/sec_api/eddaBankSave', paramsData.COMMON(data)),

  /**
   *  edda修改接口
   */
  eddaBankUpdate: data => post('/sec_api/eddaBankUpdate', paramsData.COMMON(data)),

  /**
   * edda 绑定列表接口
   */
  getEddaBankInfo: data => post('/sec_api/getEddaBankInfo', paramsData.COMMON(data)),

  /**
   * edda 删除接口
   */
  eddaBankDelete: data => post('/sec_api/eddaBankDelete', paramsData.COMMON(data)),

  /**
   * 存入资金账号入金记录获取
   */
  saveMoneyCheckAccount: data => post('/sec_api/save_money_check_account', paramsData.COMMON(data)),

  /**
   * 获取用户信息
   */
  findUserInfo: data => post('/sec_api/find_user_info', paramsData.COMMON(data)),

  /**
   * 提交公司行动
   */
  saveCorporateActions: data => post('/sec_company_api/save_actions', paramsData.COMMON(data)),
};