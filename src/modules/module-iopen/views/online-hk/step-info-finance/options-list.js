import { getStepI18nValue } from '../mixins/online-tools';

// 全年收入选择项
export const incomeOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "finance.income.options.a") },
  { value: 2, text: getStepI18nValue("infoFinance", "finance.income.options.b") },
  { value: 3, text: getStepI18nValue("infoFinance", "finance.income.options.c") },
  { value: 4, text: getStepI18nValue("infoFinance", "finance.income.options.d") },
  { value: 5, text: getStepI18nValue("infoFinance", "finance.income.options.e") },
];


// 年限选择项
export const investmentHorizonOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "finance.investmentHorizon.options.a") },
  { value: 2, text: getStepI18nValue("infoFinance", "finance.investmentHorizon.options.b") },
  { value: 3, text: getStepI18nValue("infoFinance", "finance.investmentHorizon.options.c") },
];

// 淨資產選擇項
export const assetsAllOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "assets.all.options.a") },
  { value: 2, text: getStepI18nValue("infoFinance", "assets.all.options.b") },
  { value: 3, text: getStepI18nValue("infoFinance", "assets.all.options.c") },
  { value: 4, text: getStepI18nValue("infoFinance", "assets.all.options.d") },
  { value: 5, text: getStepI18nValue("infoFinance", "assets.all.options.e") },
];

// 房屋產業選擇項
export const assetsRealOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "assets.real.options.a") },
  { value: 2, text: getStepI18nValue("infoFinance", "assets.real.options.b") },
  { value: 3, text: getStepI18nValue("infoFinance", "assets.real.options.c") },
  { value: 4, text: getStepI18nValue("infoFinance", "assets.real.options.d") },
];

export const capitalValue = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, oth: 7 };
// 资金来源
export const capitalOptions = () => [
  { value: capitalValue.a, label: getStepI18nValue("infoFinance", "finance.capital.options.a") },
  { value: capitalValue.b, label: getStepI18nValue("infoFinance", "finance.capital.options.b") },
  { value: capitalValue.c, label: getStepI18nValue("infoFinance", "finance.capital.options.c") },
  { value: capitalValue.d, label: getStepI18nValue("infoFinance", "finance.capital.options.d") },
  { value: capitalValue.e, label: getStepI18nValue("infoFinance", "finance.capital.options.e") },
  { value: capitalValue.f, label: getStepI18nValue("infoFinance", "finance.capital.options.f") },
  // { value: capitalValue.oth, label: getStepI18nValue("infoFinance", "finance.capital.options.oth") },
];

export const investmentValue = { a: 1, b: 2, c: 3, oth: 4 };
// 投资目标选择项
export const investmentOptions = () => [
  { value: investmentValue.a, text: getStepI18nValue("infoFinance", "finance.investTarget.options.a") },
  { value: investmentValue.b, text: getStepI18nValue("infoFinance", "finance.investTarget.options.b") },
  { value: investmentValue.c, text: getStepI18nValue("infoFinance", "finance.investTarget.options.c") },
  // { value: investmentValue.oth, text: getStepI18nValue("infoFinance", "finance.capital.options.oth") },
];