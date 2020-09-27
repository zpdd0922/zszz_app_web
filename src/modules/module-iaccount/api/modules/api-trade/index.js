import { post } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  getStatements: data => post('/sec_fee_api/statements/list', paramsData.COMMON(data))
}