// 存入账户类型
export const DEPOSIT_ACCOUNT_TYPE = [
  { value: 1, text: '港幣帳戶' },
  { value: 2, text: '綜合帳戶' }
]

// 银行开户证件类型
export const BANK_ID_KIND = [
  { value: 1, text: '中華人民共和國居民身份證' },
  { value: 2, text: '中華人民共和國往來港澳通行證' },
  { value: 3, text: '香港居民身份證' },
  { value: 4, text: '護照' }
]

// 授权状态
export const EDDA_STATUS = {
  0: {
    text: '未授權',
    value: 0
  },
  1: {
    text: '授權中',
    value: 1
  },
  2: {
    text: '授權失敗',
    value: 2
  },
  3: {
    text: '已授權',
    value: 3
  }
}