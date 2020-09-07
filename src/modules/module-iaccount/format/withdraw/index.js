/* eslint-disable */

import { OTHER } from '@/modules/module-iaccount/define'

/**
 * 出金提交数据 - 大陆卡开户
 */
export const format_CommitData_CN = (args, form) => {
  console.log('format_CommitData_CN', args, form)
  const { user, withdraw } = args;

  // 处理选择其他银行
  const bankName = withdraw.withdrawBankInfo.receiptBankCode === OTHER ?
    form.withdrawBankNameOther : withdraw.withdrawBankInfo.receiptBankName;
  const postData = {
    currency: form.currency,                 // 出金币种
    extMethod: withdraw.withdrawBankInfo.bankType,                // 出金银行卡类型
    bankName: bankName,            // 出金银行名称
    bankCode: withdraw.withdrawBankInfo.receiptBankCode,           // 出金银行编码
    bankAccount: form.withdrawBankAccount,       // 出金银行卡号

    payee: user.accInfo.clientNameEn,             // 账号英文名
    clientId: user.accInfo.tradeAccount,      // 交易账号
    extAccount: user.accInfo.fundAccount[0],     // 现金账号
    extAccountName: "现金账户",   // 账户名称 - 默认'现金账户'

    availableAmount: form.money, // 可提取资金
    tradePwd: form.trd,        // 交易密码密纹
    key: form.key,             // 交易密码Key
    tradeToken: form.tradeToken, // 指纹、面容解锁
    chargeMoney: form .chargeMoney, // 手续费
    extractionAmount: form.withdrawMoney,   // 提取金额
    swiftCode: form.swiftCode,               // swiftCode
    address: form.address                  // 地址
  }

  return postData
}

/**
 * 出金提交数据 - 香港卡开户
 */
export const format_CommitData_HK = (args, form) => {
  console.log('format_CommitData_HK', args, form)
  const { user } = args;

  const postData = {
    currency: form.currency,                 // 出金币种
    extMethod: form.bankInfo.bankType,                // 出金银行卡类型
    bankName: form.bankInfo.bankName,            // 出金银行名称
    bankCode: form.bankInfo.bankCode,           // 出金银行编码
    bankAccount: form.bankInfo.bankAccount,       // 出金银行卡号

    payee: user.accInfo.clientNameEn,             // 账号英文名
    clientId: user.accInfo.tradeAccount,      // 交易账号
    extAccount: user.accInfo.fundAccount[0],     // 现金账号
    extAccountName: "现金账户",   // 账户名称 - 默认'现金账户'

    availableAmount: form.money, // 可提取资金
    tradePwd: form.trd,        // 交易密码密纹
    key: form.key,             // 交易密码Key
    tradeToken: form.tradeToken, // 指纹、面容解锁
    chargeMoney: form .chargeMoney, // 手续费
    extractionAmount: form.withdrawMoney,   // 提取金额
    swiftCode: form.swiftCode,               // swiftCode
    address: form.address                  // 地址
  }

  return postData
}