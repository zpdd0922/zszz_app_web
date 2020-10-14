/* eslint-disable */
import { DOLLAR_HK_VAL, DOLLAR_US_VAL } from './info';

const HK = DOLLAR_HK_VAL;
const US = DOLLAR_US_VAL;

export const CURRENCY_TYPE = {
  name: '币种',
  key: 'currencyType',
  options: {
    0: { text: 'iAccount.history.common.text_8', value: 0, sort: 0 },
    [HK]: { text: 'iAccount.deposit.currency_type.text_1', value: HK, sort: 1 },
    // [US]: { text: 'iAccount.deposit.currency_type.text_2', value: US, sort: 2 },
  },
};

// 入金状态
export const CURRENCY_STATUS = {
  name: '状态',
  key: 'currencyStatus',
  options: {
    99: { text: 'iAccount.history.common.text_9', value: 99, sort: 0 },
    0: { text: 'iAccount.history.common.text_10', value: 0, sort: 1, color: '#5A2AB8'  },
    1: { text: 'iAccount.history.common.text_11', value: 1, sort: 2, color: '#5A2AB8' },
    2: { text: 'iAccount.history.common.text_12', value: 2, sort: 3, color: '#E5425E' },
    3: { text: 'iAccount.history.common.text_13', value: 3, sort: 4, color: '#60B782' }
  },
};

// 出金状态
export const CURRENCY_OUT_STATUS = {
  name: '状态',
  key: 'currencyStatus',
  options: {
    99: { text: 'iAccount.history.common.text_9', value: 99, sort: 0 },
    0: { text: 'iAccount.history.common.text_10', value: 0, sort: 1, color: '#5A2AB8' },
    1: { text: 'iAccount.history.common.text_11', value: 1, sort: 2, color: '#5A2AB8' },
    2: { text: 'iAccount.history.common.text_12', value: 2, sort: 3, color: '#E5425E' },
    3: { text: 'iAccount.history.common.text_13', value: 3, sort: 4, color: '#60B782' },
    4: { text: 'iAccount.history.common.text_14', value: 4, sort: 5, color: '#999999' },
    5: { text: 'iAccount.history.common.text_16', value: 5, sort: 6, color: '#60B782' },
  },
};

export const CURRENCY_EXCHANGE_TYPE = {
  name: '币种兑换',
  key: 'exchangeType',
  options: {
    0: { text: 'iAccount.history.stock.text_1', value: 0, sort: 0 },
    1: { text: 'iAccount.history.stock.text_2', value: 1, sort: 1 },
    2: { text: 'iAccount.history.stock.text_3', value: 2, sort: 2 },
  },
};


export const CURRENCY_EXCHANGE_STATUS = {
  name: '状态',
  key: 'exchangeStatus',
  options: {
    0: { text: 'iAccount.history.common.text_9', value: 0, sort: 0 },
    1: { text: 'iAccount.history.common.text_10', value: 1, sort: 1 },
    2: { text: 'iAccount.history.common.text_11', value: 2, sort: 2 },
    3: { text: 'iAccount.history.common.text_12', value: 3, sort: 3 },
    4: { text: 'iAccount.history.common.text_13', value: 4, sort: 4 },
  },
};

export const FUNDS_TYPE = {
  name: '历史记录',
  key: 'history',
  options: {
    1: {
      title: 'iAccount.history.common.text_1',
      label: 'iAccount.history.funds.text_18',
      key: 'deposit',
      value: 1
    },
    2: {
      title: 'iAccount.history.common.text_2',
      label: '',
      key: 'withdraw',
      value: 2
    }
  }
}