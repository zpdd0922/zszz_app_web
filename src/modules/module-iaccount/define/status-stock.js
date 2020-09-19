/* eslint-disable */
// 股票兑换
import { MARKET_HK_VAL, MARKET_US_VAL } from './info';

const HK = MARKET_HK_VAL;
const US = MARKET_US_VAL;


export const TRANSFER_TYPE = {
  name: '股票转移历史',
  key: 'stockTransferHistory',
  options: {
    1: {
      title: 'iAccount.transferHistory.title.transferIn',
      label: '',
      key: 'intoStock',
      value: 1
    },
    2: {
      title: 'iAccount.transferHistory.title.transferOut',
      label: '',
      key: 'outStock',
      value: 2
    }
  }
}

export const STOCK_MARKET = {
  name: '市场',
  key: "marketType",
  options: {
    0: { text: 'iAccount.transferHistory.marketFilter.allMarket', value: 0, sort: 0},
    [HK]: { text: 'iAccount.transferHistory.marketFilter.hk', value: HK, sort: 1},
    [US]: { text: 'iAccount.transferHistory.marketFilter.us', value: US, sort: 2},
  },
};

export const STOCK_STATUS = {
  key: "status",
  options: {
    0: { text: 'iAccount.transferHistory.statusFilter.allStatus', value: 0, sort: 0 },
    1: { text: 'iAccount.transferHistory.statusFilter.committed', value: 1, sort: 1, color: '#FC724C'  },
    2: { text: 'iAccount.transferHistory.statusFilter.processed', value: 2, sort: 2, color: '#FC724C' },
    3: { text: 'iAccount.transferHistory.statusFilter.err', value: 3, sort: 3, color: '#E5425E' },
    4: { text: 'iAccount.transferHistory.statusFilter.finish', value: 4, sort: 4, color: '#60B782' }
    // 0: { text: "所有状态", code: 0 },
    // 1: { text: "已提交", code: 1 },
    // 2: { text: "已受理", code: 2 },
    // 3: { text: "办理异常", code: 3 },
    // 4: { text: "已完成", code: 4 },
  },
};

export const STOCK_INTO = "StockInto";
export const STOCK_OUT = "StockOut";
