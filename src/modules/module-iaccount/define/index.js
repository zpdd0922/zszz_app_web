/* eslint-disable */

import * as STATUS_ACCOUNT from './statuc-account';
import * as HELP_URL from '@/modules/module-iaccount/define/help-center-url'
import {
  HIS_DEPOSIT, HIS_WITHDRAW, HIS_EXCHANGE,
  LIMIT_BANK, EBANK, EDDA, FPS, CHECK, CMBC_HK, CMB_WLB,
  HKD, USD, DOLLAR_HK_VAL, DOLLAR_US_VAL,
  OTHER, FPS_HK_INFO
} from './info';
import {
  FUNDS_TYPE, CURRENCY_TYPE, CURRENCY_STATUS,
  CURRENCY_EXCHANGE_TYPE, CURRENCY_EXCHANGE_STATUS,
  CURRENCY_OUT_STATUS
} from './status-currency';
//股票转移
import {
  STOCK_MARKET,
  STOCK_STATUS,
  TRANSFER_TYPE,
} from './status-stock';


const EMPTY_LABEL = '--';

export {
  HKD, USD, DOLLAR_HK_VAL, DOLLAR_US_VAL,
  STATUS_ACCOUNT, EMPTY_LABEL, CMBC_HK, CMB_WLB,
  HIS_DEPOSIT, HIS_WITHDRAW, HIS_EXCHANGE,
  HELP_URL, LIMIT_BANK, EBANK, FPS, CHECK, EDDA,
  FUNDS_TYPE, CURRENCY_TYPE, CURRENCY_STATUS,
  CURRENCY_EXCHANGE_TYPE, CURRENCY_EXCHANGE_STATUS,
  CURRENCY_OUT_STATUS, OTHER, FPS_HK_INFO, STOCK_MARKET,
  STOCK_STATUS,TRANSFER_TYPE,
}