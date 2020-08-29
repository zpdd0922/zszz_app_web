import { getStepI18nValue } from '../mixins/online-tools';

// 學歷
export const educationLevelOptions = () => [
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.a"), value: 1 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.b"), value: 2 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.c"), value: 3 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.d"), value: 4 },
];

// 婚姻状况
export const maritalStatusOptions = () => [
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.a"), value: 1 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.b"), value: 2 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.c"), value: 3 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.d"), value: 4 },
];

