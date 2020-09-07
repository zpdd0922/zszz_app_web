// 存入账户类型
export const DEPOSIT_ACCOUNT_TYPE = [
  { value: 1, text: '港币账户' },
  { value: 2, text: '综合账户' }
]

// 银行开户证件类型
export const BANK_ID_KIND = [
  { value: 1, text: '中华人民共和国居民身份证' },
  { value: 2, text: '中华人民共和国往来港澳通行证' },
  { value: 3, text: '香港居民身份证' },
  { value: 4, text: '护照' }
]

// 授权状态
export const EDDA_STATUS = {
  0: {
    text: '未授权',
    value: 0
  },
  1: {
    text: '授权中',
    value: 1
  },
  2: {
    text: '授权失败',
    value: 2
  },
  3: {
    text: '已授权',
    value: 3
  }
}