import { getStepI18nValue } from '../mixins/online-tools';

// 年限选择项
export const yearOptions =()=>[
  { value: 0, text: getStepI18nValue("infoExperience", "experience.yearOptions.a"), yearsOld: 0 }, // 18岁以下
  { value: 1, text: getStepI18nValue("infoExperience", "experience.yearOptions.b"), yearsOld: 18 }, // 18岁以上，19岁以下
  { value: 2, text: getStepI18nValue("infoExperience", "experience.yearOptions.c"), yearsOld: 19 }, // 19岁以上，20岁以下
  { value: 3, text: getStepI18nValue("infoExperience", "experience.yearOptions.d"), yearsOld: 20 }, // 20岁以上
];
// 頻率選擇項
export const tradeOptions =()=> [
  { value: 0, text: getStepI18nValue("infoExperience", "experience.tradeOptions.a") },
  { value: 1, text: getStepI18nValue("infoExperience", "experience.tradeOptions.b") },
  { value: 2, text: getStepI18nValue("infoExperience", "experience.tradeOptions.c") },
  { value: 3, text: getStepI18nValue("infoExperience", "experience.tradeOptions.d") },
];
