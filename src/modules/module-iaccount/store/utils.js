/**
 * 出入金操作 - 缓存处理
 * sessionStorage
 */
const SECURITY_DEPOSIT = 'jf_data_deposit'
const SECURITY_WITHDRAW = 'jf_data_withdraw'
const COMPANY_ACT_STOCK = 'jf_data_company'

export default class FundsUtils {
  // 入金
  static clearDepositCache() {
    window.sessionStorage.removeItem(SECURITY_DEPOSIT)
  }

  static getDepositCache() {
    const val = window.sessionStorage.getItem(SECURITY_DEPOSIT) || '{}'
    return JSON.parse(val)
  }

  static setDepositCache(data) {
    const oldVal = FundsUtils.getDepositCache()
    const newVal = JSON.stringify({ ...oldVal, ...data })
    window.sessionStorage.setItem(SECURITY_DEPOSIT, newVal)
  }

  // 出金
  static clearWithdrawCache() {
    window.sessionStorage.removeItem(SECURITY_WITHDRAW)
  }

  static getWithdrawCache() {
    const val = window.sessionStorage.getItem(SECURITY_WITHDRAW) || '{}'
    return JSON.parse(val)
  }

  static setWithdrawCache(data) {
    const oldVal = FundsUtils.getWithdrawCache()
    const newVal = JSON.stringify({ ...oldVal, ...data })
    window.sessionStorage.setItem(SECURITY_WITHDRAW, newVal)
  }

  static clearCompanyCache() {
    window.sessionStorage.removeItem(COMPANY_ACT_STOCK)
  }

  static getCompanyCache() {
    const val = window.sessionStorage.getItem(COMPANY_ACT_STOCK) || '{}'
    return JSON.parse(val)
  }

  static setCompanyCache(data) {
    const oldVal = FundsUtils.getCompanyCache()
    const newVal = JSON.stringify({ ...oldVal, ...data })
    window.sessionStorage.setItem(COMPANY_ACT_STOCK, newVal)
  }
}