import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 查询用户已转入股票记录
   */
  getTransferredStock: data => post('/sec_stock_api/into/cache_data', paramsData.COMMON(data)),
  /**
   * 缓存用户已填写转入股票记录
   */
  sendTransferredStockCache: data => post('/sec_stock_api/into/cache_data', paramsData.COMMON(data)),

  getSearchStockList: data => post('/securities/find_shares_list', data),
}