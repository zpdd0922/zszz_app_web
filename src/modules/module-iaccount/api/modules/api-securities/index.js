import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {

  /**
  *  搜索股票
  *
  *   "requestSrc":"h5", // 请求来源 h5: web登录 | ios: ios平台app内 | android： 安卓平台app内
  *   "params":{
  *    "sessionId":"12345678",
  *     "mkt":"US",  // 股票市场： "US":美股 | "HK":港股
  *     "condition":"1", // 模糊匹配字符串
  *     "flag":1    // 相关标记，查询股票传 1
  *    }
  *
  */
  queryStocks: data => post('/securities/find_shares', paramsData.COMMON(data)),

  getsecAccountInfo: data => post('/securities/find_acc_info', paramsData.COMMON(data)),

  /**
  * { isShares: 0, state: 0 }
  */
  getStocksHistory: data => post('/securities/find_transferred_stock_record', paramsData.NOPARAMS(data)),

  /**
   * 入金记录
   * @param currency  币种类型
   * 0-默认所有  前端分页1-港币 2-美元
   * @param type   查询记录类型
   * 1-存入    2-提取
   * @param state  操作状态
   * 99 默认所有  前端分页
   */
  getFundsHistory: data => post('/securities/find_deposit_record', paramsData.NOPARAMS(data)),

  /**
   * 查询子账号信息
   * 根据入金银行字段accountType判断处理
   * 1-大账户  2-子账号（该接口）
   */
  findAccountInfo: data => post('/securities/find_accountInfo', paramsData.CHECK(data)),

  /**
   * 子账号申请
   * 根据入金银行字段accountType判断处理
   * 1-大账户  2-子账号（该接口）
   * @param clientId       交易账号
   * @param clientNameEn   英文名
   * @param clientNameCn   中文名
   * @param fundAccount    现金账号
   */
  getCollectionNo: data => post('/securities/apply_bank_itemaccount', paramsData.CHECK(data)),

  /**
   * { moneyType, fundAccount }
   */
  toGetExtractableMoney: data => post('/securities/find_extractable_money_new', paramsData.CHECK(data)),

  toCommitWithdrawData: data => post('/securities/save_hong', paramsData.CHECK(data)),

  /**
   * { mkt, condition, flag: 1 }
   */
  searchStock: data => post('/securities/find_shares_list', paramsData.OTHER(data)),

  /**
   * { type: 1, name: '转入股票', ...obj }
   */
  commitIntoStockStep: data => post('/securities/transferred_stock', paramsData.CHECK(data)),

  /**
   * { type: 1, name: '证券服务', ...obj }
   */
  saveIntoStockInfoStep: data => post('/securities/save_distribute_save_tmp', paramsData.CHECK(data)),

  /**
   * { type: 1, name: '证券服务', ...obj }
   */
  findIntoStockInfoStep: data => post('/securities/find_distribute_save_tmp', paramsData.CHECK(data)),

  toCommitIntoStockInfo: data => post('/securities/save_transferred_stock', paramsData.CHECK(data)),

  toCommitIntoStockList: data => post('/securities/save_shares_stock', paramsData.CHECK(data)),

  toCommitIntoStockData: data => post('/securities/transferred_stock_apply', paramsData.CHECK(data)),
  
  toGetIntoStockAllInfo: data => post('/securities/find_transferred_stock', paramsData.CHECK(data)),
  
  /**
   * 查询股票代码
   */
  findShares: data => post('/securities/find_shares', paramsData.COMMON(data)),
};