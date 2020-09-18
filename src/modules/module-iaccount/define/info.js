/* eslint-disable */

// 出入金历史记录值cookie缓存
export const HIS_DEPOSIT = 'jf_His_Deposit';
export const HIS_WITHDRAW = 'jf_His_Withdraw';
export const HIS_EXCHANGE = 'jf_His_Exchange';

// 货币兑换类型
export const EXCHANGE_HK_TO_US_KEY = 1;
export const EXCHANGE_US_TO_HK_KEY = 2;

// 限制银行卡绑定数量
export const LIMIT_BANK = 3;

// 转账方式
export const FPS = 'FPS';
export const CHECK = 'CHECK';
export const EBANK = 'E-BANKING';
export const EDDA = 'EDDA';

// 其他银行
export const OTHER = 'OTHER'; 

// 定义币种
export const HKD = 'hkd';
export const USD = 'usd';

// 民生银行_香港
export const CMBC_HK = 'cmbchk'
// 招商永隆银行
export const CMB_WLB = 'cmbwlb'

export const DOLLAR_HK_VAL = 1
export const DOLLAR_US_VAL = 2

//股票市场
export const MARKET_HK_VAL = 1
export const MARKET_US_VAL = 2

// FPS收款账号信息 - 暂时前端固定，后续通过接口获取
export const FPS_HK_INFO = {
  depositToAccount: {
    hkd: '012-123456789',
    usd: '012-123456789'
  },
  swiftCode: 'BKCHHKHHXXX',
  depositToBankAddress: 'Bank of China Tower, 1 Garden Road, Central, Hong Kong.'
}