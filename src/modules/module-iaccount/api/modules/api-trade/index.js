import { post } from '../../request';
import paramsData from '@/main/request/utils/wrap';

export default {
  getStatements: data => post('/trade/get_statements', paramsData.COMMON(data))
}