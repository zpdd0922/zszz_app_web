/* eslint-disable */
// 定义币种 - 简体

import { HKD, USD, DOLLAR_HK_VAL, DOLLAR_US_VAL } from '@/modules/module-iaccount/define'

/**
 * -- gt字段标识    此字段为柜台数据
 * 获取可提取资金接口
  CNY("0", "人民币"),
	USD("1", "美元"),
	HKD("2", "港币"),
	EUR("M", "欧元"),
	FRF("P", "法国法郎"),
	GBP("Q", "英镑"),
	INR("U", "印度卢比"),
  JPY("W", "日元");
 *
 * --- value字段标识  此字段后台数据
 * 1--港币  2--美元
 */
export const DOLLAR_HK = {
  title: '港币 (HKD)',
  label: '港币',
  iconName: 'hk',
  code: HKD,
  value: DOLLAR_HK_VAL,
  gt: 2,
  fee: '0.00'
};

export const DOLLAR_US = {
  title: '美元 (USD)',
  label: '美元',
  iconName: 'us',
  code: USD,
  value: DOLLAR_US_VAL,
  gt: 1,
  fee: '0.00'
};

export const CURRENCY = [
  DOLLAR_HK, DOLLAR_US
];