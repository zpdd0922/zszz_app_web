/* eslint-disable */
// 银行卡信息 - 繁体

export const BANK_HK = {
  title: '香港銀行卡',
  symbol: '推薦',
  desc: '支持銀證轉賬，退回率低',
  code: 'hk',
  value: 2
};

export const BANK_CN = {
  title: '大陸銀行卡',
  code: 'cn',
  value: 1
};

export const BANK_OTHER = {
  title: '其他地区银行卡',
  code: 'other',
  value: 3
};

export const BANK_TYPE = [
  BANK_HK, BANK_CN, BANK_OTHER
]