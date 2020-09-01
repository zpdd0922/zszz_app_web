import { getStepI18nValue } from '../mixins/online-tools';

// 學歷
export const educationLevelOptions = () => [
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.primary"), value: 1 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.secondary"), value: 2 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.diploma"), value: 3 },
  { text: getStepI18nValue("idCardInfo", "educationLevel.options.universtyOrAbove"), value: 4 },
];

// 婚姻状况
export const maritalStatusOptions = () => [
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.single"), value: 1 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.married"), value: 2 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.divorced"), value: 3 },
  { text: getStepI18nValue("idCardInfo", "maritalStatus.options.widowed"), value: 4 },
];

