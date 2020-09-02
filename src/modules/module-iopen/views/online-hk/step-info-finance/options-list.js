import { getStepI18nValue } from '../mixins/online-tools';

// 全年收入选择项
export const incomeOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "finance.income.options.ltTwentyK") },
  { value: 2, text: getStepI18nValue("infoFinance", "finance.income.options.twentyToFiftyK") },
  { value: 3, text: getStepI18nValue("infoFinance", "finance.income.options.fiftyToOneHundredK") },
  { value: 4, text: getStepI18nValue("infoFinance", "finance.income.options.mtOneHundredK") },
];

//个人总资产净值
export const totalAssetsOptions = () => [
  { value: 1, text: getStepI18nValue("infoFinance", "finance.totalAssets.options.ltOneMillion") },
  { value: 2, text: getStepI18nValue("infoFinance", "finance.totalAssets.options.oneToFiveMillion") },
  { value: 3, text: getStepI18nValue("infoFinance", "finance.totalAssets.options.fiveToTenMillion") },
  { value: 4, text: getStepI18nValue("infoFinance", "finance.totalAssets.options.mtTenMillion") },
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
export const residenceOptions = () =>[
  { value: 1, text: getStepI18nValue("infoFinance", "finance.residence.options.rented") },
  { value: 2, text: getStepI18nValue("infoFinance", "finance.residence.options.selfOwned") },
  { value: 3, text: getStepI18nValue("infoFinance", "finance.residence.options.mortgage") },
  { value: 4, text: getStepI18nValue("infoFinance", "finance.residence.options.companyQuarter") },
  { value: 5, text: getStepI18nValue("infoFinance", "finance.residence.options.withFamily") },
  { value: 6, text: getStepI18nValue("infoFinance", "finance.residence.options.other") },
];

export const capitalValue = { 
  salary: 1, 
  profit: 2, 
  commission: 3, 
  saving: 4, 
  rent: 5, 
  pension: 6, 
  investment: 7,
  other: 8
};
// 资金来源
export const capitalOptions = () =>[
  { value: capitalValue.salary, label: getStepI18nValue("infoFinance", "finance.capital.options.salary") },
  { value: capitalValue.profit, label: getStepI18nValue("infoFinance", "finance.capital.options.profit") },
  { value: capitalValue.commission, label: getStepI18nValue("infoFinance", "finance.capital.options.commission") },
  { value: capitalValue.saving, label: getStepI18nValue("infoFinance", "finance.capital.options.saving") },
  { value: capitalValue.rent, label: getStepI18nValue("infoFinance", "finance.capital.options.rent") },
  { value: capitalValue.pension, label: getStepI18nValue("infoFinance", "finance.capital.options.pension") },
  { value: capitalValue.investment, label: getStepI18nValue("infoFinance", "finance.capital.options.investment") },
  { value: capitalValue.other, label: getStepI18nValue("infoFinance", "finance.capital.options.other") },
];

export const investmentValue = { shortTerm: 1, longTerm: 2, speculation: 3, hedging: 4, other: 5 };
// 投资目标选择项
export const investmentOptions = () =>[
  { value: investmentValue.shortTerm, text: getStepI18nValue("infoFinance", "finance.investTarget.options.shortTerm") },
  { value: investmentValue.longTerm, text: getStepI18nValue("infoFinance", "finance.investTarget.options.longTerm") },
  { value: investmentValue.speculation, text: getStepI18nValue("infoFinance", "finance.investTarget.options.speculation") },
  { value: investmentValue.hedging, text: getStepI18nValue("infoFinance", "finance.investTarget.options.hedging") },
  { value: investmentValue.other, text: getStepI18nValue("infoFinance", "finance.investTarget.options.other") },
];