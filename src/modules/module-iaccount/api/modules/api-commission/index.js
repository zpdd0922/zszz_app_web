import { post } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  // 获取用户历史佣金记录
  getUsercommissionRecord: data => post('/sec_fee_api/comm/get_free_commission', paramsData.NOPARAMS(data)),
  // 获取用户香港佣金标准
  getHKcommissionInfo : data => post('/sec_fee_api/comm/get_user_commission', paramsData.COMMON(data)) ,
  // 获取用户美国佣金标准
  getUScommissionInfo : data => post('/sec_fee_api/comm/get_us_commission', paramsData.NOPARAMS(data)),
}