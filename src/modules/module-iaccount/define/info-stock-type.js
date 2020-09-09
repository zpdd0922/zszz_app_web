/* eslint-disable */

// 定义股票类型code
export const HK_STOCK_TYPE_CODE = 'hk';
export const US_STOCK_TYPE_CODE = 'us';

export const HK_STOCK_TYPE = {
  label: '港股',
  code: HK_STOCK_TYPE_CODE,
  nameEn: 'Into HK stocks',
  nameCn: '转入港股股票',
  standard: '万分之5，最低50港币',
};

export const US_STOCK_TYPE = {
  label: '美股',
  code: US_STOCK_TYPE_CODE,
  nameEn: 'Into US stocks',
  nameCn: '转入美股股票',
  standard: '佣金0.01美元/股, 最低1.99美元/笔',
  isUSCommission: true

};

// isUSCommission 对应美股规则展示
export const US_COMMISSION_TYPE = {
  isUnKnow: -1,
  isUnSet: 0,
  isOne: 1,
  isTwo: 2
};

export const US_COMMISSION_FEE_TYPE = {
  5: US_COMMISSION_TYPE.isOne,
  1: US_COMMISSION_TYPE.isTwo,
};

export const US_STOCK_COMMISSION_LIST = {
  [US_COMMISSION_TYPE.isOne]: {
    key: US_COMMISSION_TYPE.isOne,
    name: '套餐一',
    standardTxt: '佣金0.01美元/股, 最低1.99美元/笔',
    standard: '$0.01/股，最低$1.99/笔'
  },
  [US_COMMISSION_TYPE.isTwo]: {
    key: US_COMMISSION_TYPE.isTwo,
    name: '套餐二',
    standardTxt: '5美元/笔',
    standard: '$5/笔'
  },
};