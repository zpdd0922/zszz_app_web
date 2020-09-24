import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 查询用户已转出股票记录
   */
  getOutStock: data => post('/sec_api/find_transferred_stock', paramsData.COMMON(data)),
  // getTransferredStock: data => post('/sec_api/find_transferred_stock', paramsData.COMMON(data)),
  /**
   * 缓存用户已填写转出股票记录
   */
  sendOutStockCache: data => post('/sec_api/do_transferred_stock', paramsData.COMMON(data)),
}