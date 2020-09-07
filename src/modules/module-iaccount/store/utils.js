/**
 * 出入金操作 - 缓存处理
 * sessionStorage
 */
const SECURITY_DEPOSIT = 'jf_data_deposit'
const SECURITY_WITHDRAW = 'jf_data_withdraw'

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
}