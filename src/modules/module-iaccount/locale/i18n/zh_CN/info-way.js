import { FPS, EBANK, CHECK, EDDA } from '@/modules/module-iaccount/define'

export const DEPOSIT_WAY = {
  [EDDA]: {
    title: '快捷入金',
    value: EDDA,
    code: '4',
    symbol: '推荐',
    tips: true
  },
  [FPS]: {
    title: 'FPS转数快',
    value: FPS,
    code: '1',
    symbol: '推荐',
    tips: true
  },
  [EBANK]: {
    title: 'E-banking网银转账',
    value: EBANK,
    code: '2'
  },
  [CHECK]: {
    title: '支票转账',
    value: CHECK,
    code: '3'
  }
}

// eDDA入金
export const EDDA_INFO = {
  descTime: '最快5分钟',
  descTimeTips: '港股交易时间段最快5分钟入账，非港股交易时间段将于下个港股交易日09:00前入账。',
  descFee: '免费'
}

// 支票入金 - 收款银行
export const CHECK_INFO = {
  descTime: '1-2个工作日',
  descFee: '请咨询银行',
  accountName: '9F Primasia Securities Limited',
  depositToAccount: {
    hkd: '012-884-0-012763-8',
    usd: '012-884-0-801758-0'
  },
  swiftCode: 'BKCHHKHHXXX',
  depositToBankAddress: 'Bank of China Tower, 1 Garden Road, Central, Hong Kong.'
}