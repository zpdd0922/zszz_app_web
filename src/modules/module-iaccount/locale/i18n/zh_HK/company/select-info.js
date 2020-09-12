// 附選擇權的股息權益
export const SCRIP_OPTIONS = [
  { value: 'DSO1', text: '全部選擇股票' },
  { value: 'DSO2', text: '全部選擇現金' },
  { value: 'DSO3', text: '部分股票部分現金' }
]

// 附選擇權的股份轉換
export const SHARE_EXCHANGE_OPTIONS = [
  { value: 'OSE1', text: '全部轉換' },
  { value: 'OSE2', text: '部分轉換' }
]

// 供股
export const RIGHTS_SUBSCRIPTION_OPTIONS = [
  { value: 'RS1', text: '全數供股' },
  { value: 'RS2', text: '部分供股' }
  // { value: 'RS3', text: '額外供股的股數（如有）' }
]

// 公開配售
export const OPEN_OFFER_SUBSCRIPTION_OPTIONS = [
  { value: 'OOS1', text: '全部供股' },
  { value: 'OOS2', text: '部分供股' }
  // { value: 'OOS3', text: '額外供股的股數（如有）' }
]

// 現金收購
export const CASH_OFFER = [
  { value: 'CO1', text: '接受全部' },
  { value: 'CO2', text: '接受部分' }
]

// 認股權證的轉換
export const WARRANTS_CONVERSION_OPTIONS = [
  { value: 'WC1', text: '全部行使' },
  { value: 'WC2', text: '部分行使' }
]

// 優先認購
export const PREFERENTIAL_OFFER = [
  { value: 'PO1', text: '全部供股' },
  { value: 'PO2', text: '部分供股' }
  // { value: 'PO3', text: '額外供股的股數（如有）' }
]

// 交易所
export const BOURSE_OPTIONS = [{ value: 'HKEX', text: '香港聯合交易所' }]

// 公司行动名称
export const COMPANY_NAME_OPTIONS = [
  { value: 'DSO', text: '附選擇權的股息權益' },
  { value: 'OSE', text: '附選擇權的股份轉換' },
  { value: 'RS', text: '供股' },
  { value: 'OOS', text: '公開配售' },
  { value: 'CO', text: '現金收購' },
  { value: 'WC', text: '認股權證的轉換' },
  { value: 'PO', text: '優先認購' },
  { value: 'OTH', text: '其他公司行動' }
]