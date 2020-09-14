import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 查询用户已转入股票记录
   */
  getTransferredStock: data => post('/securities/transferred_stock', paramsData.TRANSFER(data)),
  /**
   * 缓存用户已填写转入股票记录
   */
  sendTransferredStockCache: data => post('/securities/transferred_stock', paramsData.TRANSFER(data)),

  getSearchStockList: data => post('/securities/find_shares_list', data),
}