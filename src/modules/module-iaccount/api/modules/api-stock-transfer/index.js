import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 查询用户已转入股票记录
   */
  // getTransferredStock: data => post('/securities/transferred_stock', paramsData.NOPARAMS(data)),
  getTransferredStock: data => post('/sec_api/find_transferred_stock', paramsData.COMMON(data)),
  /**
   * 缓存用户已填写转入股票记录
   */
  sendTransferredStockCache: data => post('/sec_api/do_transferred_stock', paramsData.COMMON(data)),
  // sendTransferredStockCache: data => post('/securities/transferred_stock', paramsData.NOPARAMS(data)),

  getSearchStockList: data => post('/securities/find_shares_list', data),

  /**
    * 
    */
  getStocksHistory: data => post('/sec_api/find_transferred_stock_record', paramsData.COMMON(data)),
}