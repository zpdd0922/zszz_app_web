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
  const { user, deposit } = args

  // 基本信息
  const baseInfo = {
    currency: deposit.depositCurrency.value,                              // 入金币种
    bankType: deposit.depositBankType.value,                              // 入金银行卡类型
  }

  // 基本信息缺少 - 全必填
  const isExitBase = Object.values(baseInfo).every(item => item && String(item).length)
  if (!isExitBase) return false

  // 用户账号信息
  const accInfo = {
    clientId: user.accInfo.tradeAccount,                               // 交易账号
    depositAccount: formatNumber(user.accInfo.fundAccount[0]),         // 存入账号， 目前默认：现金账号
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
  let bankName = deposit.depositBankData.value === OTHER ? form.depositBankNameOther : deposit.depositBankData.title
  // 2.存在历史汇款银行数据
  if (deposit.depositBankHis) {
    // 是否同一个账号
    const isSomeAccount = formatNumber(deposit.depositBankHis.bankAccount) === formatNumber(form.depositBankAccount)
    if (isSomeAccount) {
      bankName = deposit.depositBankHis.bankName;
    }
  }
  const remitInfo = {
    remittanceBankName: bankName,                                           // 汇款银行名称 - 支票可空
    remittanceAccountNameEn: user.accInfo.clientNameEn,                     // 汇款银行户英文名 - 支票可空
    remittanceBankAccount: formatNumber(form.depositBankAccount),           // 汇款账号 - 支票可空
  }

  // 玖富收款信息
  let getInfo = {}
  const { bankInfoJF } = form
  switch (deposit.depositWay.value) {
    case CHECK:
      const getAccount_CHECK = deposit.depositWayInfo.depositToAccount[deposit.depositCurrency.code];
      getInfo = {
        bankName: deposit.depositWay.title,
        bankCode: deposit.depositWay.value,
        remittanceBankCorde : deposit.depositBankData.value,                                  // 入金银行真是代码
        getAccount: getAccount_CHECK.replace(/-/g, ''),                                           // 收款账户号码
        getAccountName: deposit.depositWayInfo.accountName,                                       // 收款人账户名
        getAddress: '',                                                                           // 收款人地址
        getBankCode: deposit.depositBankData.bankInfo.code,                                        // 收款银行编码
        getBankNameCn: deposit.depositBankData.bankInfo.bankName,                                  // 收款银行中文名
        getBankNameEn: deposit.depositBankData.bankInfo.bankNameEN,                                // 收款银行英文名
        getBankAddress: deposit.depositWayInfo.depositToBankAddress,                               // 收款银行地址
        swiftCode: deposit.depositWayInfo.swiftCode,                                               // SWIFT代码
      }
      break;
    case EBANK:
      // 网银-accountType 需区分大账户与子账户
      const { bankInfo: { accountType } } = deposit.depositBankData
      const getAccount = accountType === 2 ?
          formatNumber(deposit.depositSubAccount.subAccountNo) : deposit.depositBankData.bankInfo.depositToAccount[deposit.depositCurrency.code]
        const getAccountName = accountType === 2 ?
          deposit.depositSubAccount.accountName : deposit.depositBankData.bankInfo.accountName
      // 当用户可选择收款银行
      if (bankInfoJF && Object.keys(bankInfoJF).length) {
        getInfo = {
          bankName: deposit.depositBankData.title,                                                   // 入金选择银行名称
          bankCode: deposit.depositBankData.value,                                                   // 入金选择银行代码
          remittanceBankCorde : deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: bankInfoJF.depositToAccount[deposit.depositCurrency.code],                                                  // 收款账户号码
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
          bankName: deposit.depositBankData.title,                                                   // 入金选择银行名称
          bankCode: deposit.depositBankData.value,                                                   // 入金选择银行代码
          remittanceBankCorde : deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: getAccount.replace(/-/g, ''),                                                  // 收款账户号码
          getAccountName,                                                                            // 收款人账户名
          getAddress: deposit.depositWayInfo.bankInfo.depositUserAddress,                           // 收款人地址
          getBankCode: deposit.depositWayInfo.bankInfo.code,                                        // 收款银行编码
          getBankNameCn: deposit.depositWayInfo.bankInfo.bankName,                                  // 收款银行中文名
          getBankNameEn: deposit.depositWayInfo.bankInfo.bankNameEN,                                // 收款银行英文名
          getBankAddress: deposit.depositWayInfo.bankInfo.depositToBankAddress,                     // 收款银行地址
          swiftCode: deposit.depositWayInfo.bankInfo.swiftCode,                                     // SWIFT代码
        }
      }
      break;
    case FPS:
      // 处理不同币种 - 对应收款账号
      const getAccount_FPS = FPS_HK_INFO.depositToAccount[deposit.depositCurrency.code]
      // 当用户可选择收款银行
      if (bankInfoJF && Object.keys(bankInfoJF).length) {
        getInfo = {
          bankName: deposit.depositWay.title,                                                   // 入金选择银行名称
          bankCode: deposit.depositWay.value,                                                   // 入金选择银行代码
          remittanceBankCorde : deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: bankInfoJF.depositToAccount[deposit.depositCurrency.code],                                                     // 收款账户号码
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
          bankName: deposit.depositWay.title,                                                   // 入金选择银行名称
          bankCode: deposit.depositWay.value,                                                   // 入金选择银行代码
          remittanceBankCorde : deposit.depositBankData.value,                                  // 入金银行真是代码
          getAccount: getAccount_FPS.replace(/-/g, ''),                                                           // 收款账户号码
          getAccountName: deposit.depositWayInfo.accountName,                                   // 收款人账户名
          getAddress: '',                                                                      // 收款人地址
          getBankCode: deposit.depositWayInfo.bankCode,                                        // 收款银行编码
          getBankNameCn: deposit.depositWayInfo.bankName,                                    // 收款银行中文名
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
    ...accInfo,
    ...formInfo,
    ...getInfo,
    ...remitInfo,
    actId: sessionStorage.getItem('actId') // 活动id
  }

  return postData
}