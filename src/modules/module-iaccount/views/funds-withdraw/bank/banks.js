/* eslint-disable */
var DESC_FEE_HKBANK = '请咨询银行';
var DESC_TIEM_HKBANK = '1-2个工作日';

/* ======  港币 + 香港银行卡 START ====== */
/**
 * 银证转账
 * 香港银行
 * 其他方式
 */

// 港币香港银行卡银证转账
const HKD_HK_Banks_Transfer = [
  {
    code: 'cmb',
    name: '招商银行香港分行',
    fee: '0港币',
    time: '预计10分钟内',
  },
  {
    code: 'cmbc',
    name: '民生银行香港分行',
    fee: '0港币',
    time: '预计10分钟内',
  }
];

// 港币香港银行卡香港银行
const HKD_HK_Banks_HK = [
  {
    code: 'dbs',
    name: '星展银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'boc',
    name: '中国银行（香港）',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'hsbc',
    name: '汇丰银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'other',
    name: '其他银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
];

// 港币香港银行卡其他方式
const HKD_HK_Banks_Others = [
  // {
  //   code: 'check',
  //   name: '支票',
  //   fee: '请咨询银行',
  //   time: '1-2个工作日',
  // }
];

// 港币 + 香港银行卡 汇总
const HKD_HK_Banks_Family = [
  {
    key: 'transfer',
    name: '银证转账',
    banks: HKD_HK_Banks_Transfer
  },
  {
    key: 'hk',
    name: '香港银行',
    banks: HKD_HK_Banks_HK
  },
  {
    key: 'otherWay',
    name: '其他方式',
    banks: HKD_HK_Banks_Others
  }
];
/* ======  港币 + 香港银行卡 END ====== */

/* ======  港币 + 大陆银行卡 START ====== */
/**
 * 大陆银行
 * 其他方式
 */

// 港币大陆银行卡大陆银行
const HKD_CN_Banks_CN = [
  {
    code: 'cmb',
    name: '招商银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'ccb',
    name: '建设银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'boc',
    name: '中国银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'icbc',
    name: '工商银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'cmbc',
    name: '民生银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'ceb',
    name: '光大银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
  {
    code: 'other',
    name: '其他大陆银行',
    fee: '请咨询银行',
    time: '1-2个工作日',
  },
];

// 港币大陆银行卡其他方式
const HKD_CN_Banks_Others = [
  {
    code: 'alipay',
    name: '支付宝国际汇款',
    fee: '请咨询银行',
    time: '1-2个工作日',
  }
];

const HKD_CN_Banks_Family = [
  {
    key: 'cn',
    name: '大陆银行',
    banks: HKD_CN_Banks_CN
  },
  {
    key: 'otherWay',
    name: '其他方式',
    banks: HKD_CN_Banks_Others
  }
];
/* ======  港币 + 大陆银行卡 END ====== */

export { HKD_HK_Banks_Family, HKD_CN_Banks_Family };
