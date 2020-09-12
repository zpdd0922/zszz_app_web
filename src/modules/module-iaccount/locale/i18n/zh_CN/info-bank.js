/* eslint-disable */
// 银行卡信息 - 简体

export const BANK_HK = {
  title: '香港银行卡',
  symbol: '推荐',
  desc: '支持银证转账，退回率低',
  code: 'hk',
  value: 2
};

export const BANK_CN = {
  title: '大陆银行卡',
  code: 'cn',
  value: 1
};

export const BANK_OTHER = {
  title: '其他地区银行卡',
  code: 'other',
  value: 3
};

// export const BANK_TYPE = [
//   BANK_HK, BANK_CN, BANK_OTHER
// ]
export const BANK_TYPE = [
  BANK_HK, BANK_OTHER
]