import { getStepI18nValue } from '../mixins/online-tools';

// 年限选择项
export const yearOptions = () => [
  { value: 0, text: getStepI18nValue("infoExperience", "experience.yearOptions.noExperience")}, // 18岁以下
  { value: 1, text: formatExperience(1) },
  { value: 2, text: formatExperience(2) }, 
  { value: 3, text: formatExperience(3) }, 
  { value: 4, text: formatExperience(4) },
  { value: 5, text: formatExperience(5) }, 
  { value: 6, text: formatExperience(6) }, 
  { value: 7, text: formatExperience(7) },
  { value: 8, text: formatExperience(8) }, 
  { value: 9, text: formatExperience(9) }, 
  { value: 10, text: formatExperience(10) },
  { value: 11, text: getStepI18nValue("infoExperience", "experience.yearOptions.mtTenyears") }, 
];
const formatExperience = (num) => `${num}年`;
// 頻率選擇項
// export const tradeOptions =()=> [
//   { value: 0, text: getStepI18nValue("infoExperience", "experience.tradeOptions.a") },
//   { value: 1, text: getStepI18nValue("infoExperience", "experience.tradeOptions.b") },
//   { value: 2, text: getStepI18nValue("infoExperience", "experience.tradeOptions.c") },
//   { value: 3, text: getStepI18nValue("infoExperience", "experience.tradeOptions.d") },
// ];
