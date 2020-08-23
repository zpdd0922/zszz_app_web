/*
 * @Author: Jim
 * @Date: 2019-12-24 10:57:34
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-24 14:12:05
 * @Description: 
 */
// 全年收入选择项
export const incomeOptions = [
  { value: 1, text: '20万以下' },
  { value: 2, text: '20万~50万' },
  { value: 3, text: '50万~100万' },
  { value: 4, text: '100万~500万' },
  { value: 5, text: '500万以上' }
];

// 淨資產選擇項
export const assetsOptions = [
  { value: 1, text: '50万以下' },
  { value: 2, text: '50万~250万' },
  { value: 3, text: '250万~500万' },
  { value: 4, text: '500万以上' }
];

// 资金来源
export const capitalOptions = [
  { value: 1, label: '薪酬' },
  { value: 2, label: '存款' },
  { value: 3, label: '租金' },
  { value: 4, label: '继承' },
  { value: 5, label: '投资回报' },
  { value: 6, label: '经营收入' },
  { value: 7, label: '借贷' },
  { value: 8, label: '退休金' },
  // { value: 9, label: '其他' }
];

export const capitalOptions2 = [
  { value: '0', label: '工资和奖金' },
  { value: 1, label: '投资回报' },
  { value: 2, label: '劳务报酬' },
  { value: 3, label: '租金' },
  { value: 4, label: '营业收入' },
  { value: 5, label: '退休金' },
  { value: 6, label: '家人给予' },
  { value: 7, label: '兼职收入' },
  { value: 8, label: '生产收入' }
];

// 投资目标选择项
export const investmentOptions = [
  { value: 3, text: '资本增值' },
  // { value: 1, text: '保本' },
  { value: 5, text: '对冲' },
  { value: 2, text: '股息收益' },
  { value: 4, text: '投机' },
  // { value: 6, text: '其他' }
];

// 年限选择项
export const yearOptions = [
  { value: 0, text: '没有经验', yearsOld: 0 }, // 18岁以下
  { value: 1, text: '少于一年', yearsOld: 18 }, // 18岁以上，19岁以下
  { value: 2, text: '一至三年', yearsOld: 19 }, // 19岁以上，21岁以下
  { value: 3, text: '三至五年', yearsOld: 21 }, // 21岁以上，23岁以下
  { value: 4, text: '五年以上', yearsOld: 23 } // 23岁以上
];
// 頻率選擇項
export const tradeOptions = [
  { value: 0, text: '沒有'}, 
  { value: 1, text: '少於10筆'}, 
  { value: 2, text: '10-40筆'}, 
  { value: 3, text: '多餘40筆'}, 
];
