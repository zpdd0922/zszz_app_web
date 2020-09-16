import { post } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  // 获取用户历史佣金记录
  getUsercommissionRecord: data => post('/activ_api/find_user_commission_record', paramsData.TRANSFER(data)),
  // 获取用户香港佣金标准
  getHKcommissionInfo : data => post('/activ_api/getHKCommissionInfo', paramsData.TRANSFER(data)) ,
  // 获取用户美国佣金标准
  getUScommissionInfo : data => post('/activ_api/getUSCommissionInfo', paramsData.TRANSFER(data)),
}