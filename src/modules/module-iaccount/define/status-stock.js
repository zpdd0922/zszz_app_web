/* eslint-disable */
// 股票兑换

export const STOCK_MARKET = {
  key: 'market',
  options: {
    0: { label: '所有市场', code: 0 },
    1: { label: '港股', code: 1 },
    2: { label: '美股', code: 2 },
  },
};

export const STOCK_STATUS = {
  key: 'status',
  options: {
    0: { label: '所有状态', code: 0 },
    1: { label: '已提交', code: 1 },
    2: { label: '已受理', code: 2 },
    3: { label: '办理异常', code: 3 },
    4: { label: '已完成', code: 4 },
  },
};

export const STOCK_INTO = 'StockInto';
export const STOCK_OUT = 'StockOut';