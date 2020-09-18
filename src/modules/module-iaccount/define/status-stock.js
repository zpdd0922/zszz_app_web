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
      title: '转入记录',
      label: '',
      key: 'intoStock',
      value: 1
    },
    2: {
      title: '转出记录',
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
    0: { text: "所有市场", value: 0, sort: 0},
    [HK]: { text: "港股", value: HK, sort: 1},
    [US]: { text: "美股", value: US, sort: 2},
  },
};

export const STOCK_STATUS = {
  key: "status",
  options: {
    0: { text: '所有状态', value: 0, sort: 0 },
    1: { text: '已提交', value: 1, sort: 1, color: '#FC724C'  },
    2: { text: '已受理', value: 2, sort: 2, color: '#FC724C' },
    3: { text: '办理异常', value: 3, sort: 3, color: '#E5425E' },
    4: { text: '已完成', value: 4, sort: 4, color: '#60B782' }
    // 0: { text: "所有状态", code: 0 },
    // 1: { text: "已提交", code: 1 },
    // 2: { text: "已受理", code: 2 },
    // 3: { text: "办理异常", code: 3 },
    // 4: { text: "已完成", code: 4 },
  },
};

export const STOCK_INTO = "StockInto";
export const STOCK_OUT = "StockOut";
