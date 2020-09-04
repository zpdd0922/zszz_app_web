import { getStepI18nValue } from '../mixins/online-tools';

// 年限选择项
export const yearOptions = () => [
  { value: 0, text: getStepI18nValue("infoExperience", "experience.yearOptions.noExperience")},
  { value: 1, text: '<1年' },
  { value: 2, text: '1~3年' }, 
  { value: 3, text: '3~5年' }, 
  { value: 4, text: '>5年' },
];
// 頻率選擇項
// export const tradeOptions =()=> [
//   { value: 0, text: getStepI18nValue("infoExperience", "experience.tradeOptions.a") },
//   { value: 1, text: getStepI18nValue("infoExperience", "experience.tradeOptions.b") },
//   { value: 2, text: getStepI18nValue("infoExperience", "experience.tradeOptions.c") },
//   { value: 3, text: getStepI18nValue("infoExperience", "experience.tradeOptions.d") },
// ];
