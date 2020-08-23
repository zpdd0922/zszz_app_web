// 投资目标选择项
export const investmentOptions = [
  { value: 1, label: '保本' },
  { value: 2, label: '股息收入' },
  { value: 3, label: '资本增值' },
  { value: 4, label: '投机' },
  { value: 5, label: '对冲' },
  { value: 6, label: '其他' }
];

// 年限选择项
export const yearOptions = [
  { value: 0, text: '没有经验', yearsOld: 0 }, // 18岁以下
  { value: 1, text: '少于一年', yearsOld: 18 }, // 18岁以上，19岁以下
  { value: 2, text: '一至三年', yearsOld: 19 }, // 19岁以上，21岁以下
  { value: 3, text: '三至五年', yearsOld: 21 }, // 21岁以上，23岁以下
  { value: 4, text: '五年以上', yearsOld: 23 } // 23岁以上
];

// 年限选择项
export const derivativeOptions = [
  { value: 0, text: '我对衍生品没有认识' },
  { value: 1, text: '我对衍生品有认识' }
];

// 衍生品课程选择
export const derivativeTradeOptions = { value: true, label: '我在过去三年曾买卖过至少五次任何衍生产品的交易（不论是否在交易所买卖）' };
export const derivativeCourseOptions = { value: true, label: '我曾受过有关衍生产品的培训和课程' };
export const derivativeIndustryOptions = { value: true, label: '我具有与衍生产品相关的工作经验' };

// 衍生品学习途径选择项
export const derivativeWayOptions = [
  { value: 1, label: '金融机构' },
  { value: 2, label: '监管机构' },
  { value: 3, label: '交易所' },
  { value: 4, label: '大专院校' },
  { value: 5, label: '进修院校' },
  { value: 6, label: '线上课程' },
  { value: 7, label: '其他' }
];

// 衍生品工作经验选择项
export const financingOptions = [
  { value: 1, label: '受监管持牌人士' },
  { value: 2, label: '与衍生工具相关后勤' },
  { value: 3, label: '管理层' },
  { value: 4, label: '其他' }
];
