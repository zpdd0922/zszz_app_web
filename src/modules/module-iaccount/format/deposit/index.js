/* eslint-disable */
/**
 * 入金银行卡数据转换字段
 */
import { formatNumber } from '@/modules/module-iaccount/utils/format'
import { CHECK, EBANK, FPS, OTHER, FPS_HK_INFO } from '@/modules/module-iaccount/define'

/**
 * 入金银行信息 - 数据转换
 */
export const format_DepositBank = (data = {}) => {
  const {
    name, key, appBanklogo,
    bankInfo, ...res
  } = data
  return {
    title: name,
    value: key,
    img: appBanklogo,
    bankInfo,
    ...res
  }
}


/**
 * 入金FPS信息 - 数据转换
 */
export const format_DepositFPS = (data = []) => {
  return data.map(item => {
    const {
      descTimeRemark, descFeeRemark,
      ...res
    } = item
    return {
      descTimeTips: descTimeRemark,
      descFeeTips: descFeeRemark,
      ...res
    }
  })
}

/**
 * 入金提交数据
 *
 * 并对字段做校验，若缺少。若有缺失返回 false
 */
export const format_CommitData = (args, form) => {
  console.log('format_CommitData', args, form)
  const { user, account, deposit } = args

  // 基本信息
  const baseInfo = {
    currency: iAccount.deposit.depositCurrency.value,                              // 入金币种
    bankType: iAccount.deposit.depositBankType.value,                              // 入金银行卡类型
  }

  // 基本信息缺少 - 全必填
  const isExitBase = Object.values(baseInfo).every(item => item && String(item).length)
  if (!isExitBase) return false

  // 用户账号信息
  const secAccountInfo = {
    clientId: account.secAccountInfo.tradeAccount,                               // 交易账号
    depositAccount: formatNumber(account.secAccountInfo.fundAccount[0]),         // 存入账号， 目前默认：现金账号
    depositAccountName: '现金账户',                                     // 存入账户名称，目前仅支持：现金账户
  }

  // 基本表单信息
  const formInfo = {
    depositMoney: form.depositMoney,                                     // 存入金额
    remarks: form.remarks,                                               // 入金备注
    accImgId: form.img.accImgId || form.img.accImgIdA,                   // 入金凭证图
    accImgIdA: form.img.accImgId ? form.img.accImgIdA : '',              // 入金凭证图
  }

  // 用户汇款信息
  // 1.注意选择其他银行
  let bankName = iAccount.deposit.depositBankData.value === OTHER ? form.depositBankNameOther : iAccount.deposit.depositBankData.title
  // 2.存在历史汇款银行数据
  if (iAccount.deposit.depositBankHis) {
    // 是否同一个账号
    const isSomeAccount = formatNumber(iAccount.deposit.depositBankHis.bankAccount) === formatNumber(form.depositBankAccount)
    if (isSomeAccount) {
      bankName = iAccount.deposit.depositBankHis.bankName;
    }
  }
  const remitInfo = {
    remittanceBankName: bankName,                                           // 汇款银行名称 - 支票可空
    remittanceAccountNameEn: account.secAccountInfo.clientNameEn,                     // 汇款银行户英文名 - 支票可空
    remittanceBankAccount: formatNumber(form.depositBankAccount),           // 汇款账号 - 支票可空
  }

  // 立桥收款信息
  let getInfo = {}
  const { bankInfoJF } = form
  switch (iAccount.deposit.depositWay.value) {
    case CHECK:
      const getAccount_CHECK = iAccount.deposit.depositWayInfo.depositToAccount[iAccount.deposit.depositCurrency.code];
      getInfo = {
        bankName: iAccount.deposit.depositWay.title,
        bankCode: iAccount.deposit.depositWay.value,
        remittanceBankCorde : iAccount.deposit.depositBankData.value,                                  // 入金银行真是代码
        getAccount: getAccount_CHECK.replace(/-/g, ''),                                           // 收款账户号码
        getAccountName: iAccount.deposit.depositWayInfo.accountName,                                       // 收款人账户名
        getAddress: '',                                                                           // 收款人地址
        getBankCode: iAccount.deposit.depositBankData.bankInfo.code,                                        // 收款银行编码
        getBankNameCn: iAccount.deposit.depositBankData.bankInfo.bankName,                                  // 收款银行中文名
        getBankNameEn: iAccount.deposit.depositBankData.bankInfo.bankNameEN,                                // 收款银行英文名
        getBankAddress: iAccount.deposit.depositWayInfo.depositToBankAddress,                               // 收款银行地址
        swiftCode: iAccount.deposit.depositWayInfo.swiftCode,                                               // SWIFT代码
      }
      break;
    case EBANK:
      // 网银-accountType 需区分大账户与子账户
      const { bankInfo: { accountType } } = iAccount.deposit.depositBankData
      const getAccount = accountType === 2 ?
          formatNumber(iAccount.deposit.depositSubAccount.subAccountNo) : iAccount.deposit.depositBankData.bankInfo.depositToAccount[iAccount.deposit.depositCurrency.code]
        const getAccountName = accountType === 2 ?
          iAccount.deposit.depositSubAccount.accountName : iAccount.deposit.depositBankData.bankInfo.accountName
      // 当用户可选择收款银行
      if (bankInfoJF && Object.keys(bankInfoJF).length) {
        getInfo = {
          bankName: iAccount.deposit.depositBankData.title,                                                   // 入金选择银行名称
          bankCode: iAccount.deposit.depositBankData.value,                                                   // 入金选择银行代码
          remittanceBankCorde : iAccount.deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: bankInfoJF.depositToAccount[iAccount.deposit.depositCurrency.code],                                                  // 收款账户号码
          getAccountName: bankInfoJF.getAccountName,                                                                            // 收款人账户名
          getAddress: bankInfoJF.getAddress,                           // 收款人地址
          getBankCode: bankInfoJF.getBankCode,                                        // 收款银行编码
          getBankNameCn: bankInfoJF.getBankNameCn,                                  // 收款银行中文名
          getBankNameEn: bankInfoJF.getBankNameEn,                                // 收款银行英文名
          getBankAddress: bankInfoJF.getBankAddress,                     // 收款银行地址
          swiftCode: bankInfoJF.swiftCode,                                     // SWIFT代码
        }
      } else {
        getInfo = {
          bankName: iAccount.deposit.depositBankData.title,                                                   // 入金选择银行名称
          bankCode: iAccount.deposit.depositBankData.value,                                                   // 入金选择银行代码
          remittanceBankCorde : iAccount.deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: getAccount.replace(/-/g, ''),                                                  // 收款账户号码
          getAccountName,                                                                            // 收款人账户名
          getAddress: iAccount.deposit.depositWayInfo.bankInfo.depositUserAddress,                           // 收款人地址
          getBankCode: iAccount.deposit.depositWayInfo.bankInfo.code,                                        // 收款银行编码
          getBankNameCn: iAccount.deposit.depositWayInfo.bankInfo.bankName,                                  // 收款银行中文名
          getBankNameEn: iAccount.deposit.depositWayInfo.bankInfo.bankNameEN,                                // 收款银行英文名
          getBankAddress: iAccount.deposit.depositWayInfo.bankInfo.depositToBankAddress,                     // 收款银行地址
          swiftCode: iAccount.deposit.depositWayInfo.bankInfo.swiftCode,                                     // SWIFT代码
        }
      }
      break;
    case FPS:
      // 处理不同币种 - 对应收款账号
      const getAccount_FPS = FPS_HK_INFO.depositToAccount[iAccount.deposit.depositCurrency.code]
      // 当用户可选择收款银行
      if (bankInfoJF && Object.keys(bankInfoJF).length) {
        getInfo = {
          bankName: iAccount.deposit.depositWay.title,                                                   // 入金选择银行名称
          bankCode: iAccount.deposit.depositWay.value,                                                   // 入金选择银行代码
          remittanceBankCorde : iAccount.deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: bankInfoJF.depositToAccount[iAccount.deposit.depositCurrency.code],                                                     // 收款账户号码
          getAccountName: bankInfoJF.getAccountName,                                                                            // 收款人账户名
          getAddress: bankInfoJF.getAddress,                                                                      // 收款人地址
          getBankCode: bankInfoJF.getBankCode,                                        // 收款银行编码
          getBankNameCn: bankInfoJF.getBankNameCn,                                    // 收款银行中文名
          getBankNameEn: bankInfoJF.getBankNameEn,                                                                 // 收款银行英文名
          getBankAddress: bankInfoJF.getBankAddress,                                   // 收款银行地址
          swiftCode: bankInfoJF.swiftCode,                                                           // SWIFT代码
        }
      } else {
        getInfo = {
          bankName: iAccount.deposit.depositWay.title,                                                   // 入金选择银行名称
          bankCode: iAccount.deposit.depositWay.value,                                                   // 入金选择银行代码
          remittanceBankCorde : iAccount.deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: getAccount_FPS.replace(/-/g, ''),                                                           // 收款账户号码
          getAccountName: iAccount.deposit.depositWayInfo.accountName,                                   // 收款人账户名
          getAddress: '',                                                                      // 收款人地址
          getBankCode: iAccount.deposit.depositWayInfo.bankCode,                                        // 收款银行编码
          getBankNameCn: iAccount.deposit.depositWayInfo.bankName,                                    // 收款银行中文名
          getBankNameEn: '',                                                                 // 收款银行英文名
          getBankAddress: FPS_HK_INFO.depositToBankAddress,                                   // 收款银行地址
          swiftCode: FPS_HK_INFO.swiftCode,                                                           // SWIFT代码
        }
      }
      break;
  }

  // 检测收款表单信息，不能为空
  const isExitGet = Object.values(getInfo).some(item => item && String(item).length)
  if (!isExitGet) return false

  const postData = {
    ...baseInfo,
    ...secAccountInfo,
    ...formInfo,
    ...getInfo,
    ...remitInfo,
    actId: sessionStorage.getItem('actId') // 活动id
  }

  return postData
}