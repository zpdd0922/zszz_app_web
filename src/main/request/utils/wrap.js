import auth from '@/main/request/utils/auth';
import { getSHASign } from './sign';

// api接口公用参数
const WRAP = (params = {}, key = "") => {
  let keys = key;
  let reqData = params;

  if (keys === "") {
    keys = auth.getAuthSession();
    reqData = { sessionId: auth.getAuthSession(), ...params };
  }

  let sign = "";

  if (typeof keys === "string" && keys !== "") {
    sign = getSHASign(keys, reqData);
  }

  return {
    id: +new Date(),
    sign,
    version: '1.0',
    requestSrc: auth.getPlateform(),
    src: auth.getPlateform(),
    params: reqData
  };
};

// 接口数据包裹层
const COMMON = (data = {}) => ({
  requestSrc: auth.getPlateform(),
  params: {
    sessionId: auth.getAuthSession(),
    ...data
  }
});


// 接口数据包裹层
const NOPARAMS = (data = {}) => ({
  requestSrc: auth.getPlateform(),
  sessionId: auth.getAuthSession(),
  ...data
});

// // 转移股票包裹层
// const TRANSFER = (data={}) => ({
//   requestSrc: auth.getPlateform(),
//   sessionId: auth.getAuthSession(),
//   ...data
// })

// // 获取开户相关选项数据字典@params str
// // 'WEB_OCCUPATION_TYPE' 所属行业
const OPTIONS = (str) => ({
  params: {
    mark: str
  }
});

// // 查询开户状态
// const CHECK = (data = {}) => ({
//   requestSrc: auth.getPlateform(),
//   sessionId: auth.getAuthSession(),
//   ...data
// });

// // 更新/绑定 手机号
// const PHONE = (data = {}) => ({
//   requestSrc: auth.getPlateform(),
//   sessionId: auth.getAuthSession(),
//   ...data
// });

export default {
  WRAP,
  COMMON,
  NOPARAMS,
  OPTIONS,
  // CHECK,
  // PHONE,
  // TRANSFER,
};
