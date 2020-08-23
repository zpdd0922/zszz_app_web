
/* eslint-disable */
// Disables all rules for the rest of the file
// 关于扫描，统一增加version版本号，以区分开户版本不同而处理不同图片字段

import {
  getSTIDCardModule,
  getSTBankCardModule,
  getSTLivenessModule
} from '@/main/utils/native-app/';

export const SDK_TYPE = {
  idCard: 'idCard',
  bankCard: 'bankCard',
  liveNess: 'liveNess',
};

// ST身份证扫描类型
export const STIDCardType = {
  all: 0,     // 连续扫描
  face: 1,    // 扫描正面
  back: 2,    // 扫描反面
};

/**
 * 打开ST身份证扫描
 *
 * @param version string 区分版本: 主要兼容App开户新旧版本关于图片字段定义
 * @param scan_type string 扫描类型: 0 连续扫描  1 扫描正面 2 扫描反面
 * @param success func 成功回调
 * @param fail func 失败回调
 * @param complete func 所有回调
 *
 * */
export const stCameraIdCard = (type, { success, fail, complete }) => {
  getSTIDCardModule({
      version: '2.0.0', // 区分版本 -- 主要兼容图片字段定义
      scan_type: type,      // 0 连续扫描  1 扫描正面 2 扫描反面
      timeout: 10,          // 超时时间，string 单位秒
      success: (res, msg) => {
        typeof success === 'function' && success(JSON.parse(res.data), msg);
      },
      fail: (res, msg) => {
        typeof fail === 'function' && fail(msg);
      },
      complete: (res) => {
        typeof complete === 'function' && complete(res);
      }
    }
  )
};

/**
 * 打开ST银行卡扫描
 *
 * @param validBankName array 支持的银行list
 * @param validBankCardType array 支持的银行类型list
 * @param success func 成功回调
 * @param fail func 失败回调
 * @param complete func 所有回调
 *
 * */
export const stCameraBankCard = (validBankName, validBankCardType, { success, fail, complete }) => {
  getSTBankCardModule({
      version: '2.0.0', // 区分版本 -- 主要兼容图片字段定义
      timeout: 10,        // 超时时间，string 单位秒
      orientation: 2,     // 方向 string 1 垂直 2 水平
      validBankName,
      validBankCardType,
      success: (res, msg) => {
        typeof success === 'function' && success(JSON.parse(res.data), msg);
      },
      fail: (res, msg) => {
        typeof fail === 'function' && fail(msg);
      },
      complete: (res) => {
        typeof complete === 'function' && complete(res);
      }
    }
  )
  // }
};

/**
 * 打开ST活体检测
 *
 * @param sequences string 扫描类型: 0 连续扫描  1 扫描正面 2 扫描反面
 * @param success func 成功回调
 * @param fail func 失败回调
 * @param complete func 所有回调
 *
 * */
export const stCameraLiveness = (sequences, { success, fail, complete }) => {
  getSTLivenessModule({
      version: '2.0.0', // 区分版本 -- 主要兼容图片字段定义
      difficulty: 1,      // 难易程度 1easy 2normal 3hard  4hell
      sequences,          // 动作序列  0 BLINK  1 MOUTH  2 HEADYAW 3 HEADNOD
      timeout: 10,        // 超时时间，string 单位秒
      success: (res, msg) => {
        typeof success === 'function' && success(JSON.parse(res.data), msg);
      },
      fail: (res, msg) => {
        typeof fail === 'function' && fail(msg);
      },
      complete: (res) => {
        typeof complete === 'function' && complete(res);
      }
    }
  )
};

export const stCamera = (type, params, callBack) => {
  if (type === SDK_TYPE.idCard) {
    const { scanType = STIDCardType.all } = params;
    stCameraIdCard(scanType, callBack)
  }
  if (type === SDK_TYPE.bankCard) {
    console.log('backCard：', params)
    const { validBankName, validBankCardType } = params;
    stCameraBankCard(validBankName, validBankCardType, callBack);
  }
  if (type === SDK_TYPE.liveNess) {
    const { sequences = '0|1|2|3' } = params;
    stCameraLiveness(sequences, callBack);
  }
};
