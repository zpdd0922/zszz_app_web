import { post, postImg } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  /**
   * 查询用户已转入股票记录 - 绑定的银行卡列表
   * @param bankType 0 - 全部  1 - 大陆  2 - 香港
   * @param bankCount 3 - 返回银行卡数量
   * @param fundAccount 现金账号
   */
  getTransferredStock: data => post('/securities/transferred_stock', paramsData.TRANSFER(data)),
}