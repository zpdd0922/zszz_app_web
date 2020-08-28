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

const WRAP_APP = (data = {}) => {
  const sessionId = auth.getAuthToken()
  const params = {
    sessionId: sessionId,
    ...data
  }
  const signParams = getSHASign(sessionId, params)
  return {
    id: +new Date(),
    version: '1.0',
    requestSrc: auth.getPlateform(),
    params: params,
    sign: signParams
  }
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
  WRAP_APP,
  OPTIONS,
  COMMON,
  CHECK,
  PHONE
};
