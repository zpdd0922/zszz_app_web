import auth from '@/main/request/utils/auth-icrm';
import { getSHASign } from './sign';

// api接口公用参数
const WRAP = (params = {}, key = "") => {
  let keys = key;
  if (keys === "") {
    keys = auth.getAuthToken();
  }

  const sign = getSHASign(keys, params);

  return {
    id: +new Date(),
    sign,
    version: '1.0',
    params
  };
};

// 接口数据包裹层
const COMMON = (data = {}) => ({
  requestSrc: auth.getPlateform(),
  params: {
    ...data
  }
});

// 获取开户相关选项数据字典@params str
// 'WEB_OCCUPATION_TYPE' 所属行业
const OPTIONS = (str) => ({
  params: {
    mark: str
  }
});

// 查询开户状态
const CHECK = (data = {}) => ({
  requestSrc: auth.getPlateform(),
  sessionId: auth.getAuthToken()
});

// 更新/绑定 手机号
const PHONE = (data = {}) => ({
  requestSrc: auth.getPlateform(),
  sessionId: auth.getAuthToken(),
  ...data
});

export default {
  WRAP,
  OPTIONS,
  COMMON,
  CHECK,
  PHONE
};
