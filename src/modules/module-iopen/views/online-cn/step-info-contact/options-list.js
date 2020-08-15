import { getStepI18nValue } from '../mixins/online-tools';

export const radioListValue = {
  cn: 1, // 大陆地址
  hk: 2, // 香港地址
  oth: 3, // 其他地区
  idCard: 4, // 同身份证地址
  company: 5, // 同公司地址
  home: 6, // 同现时住址
}

export const professionCodeValue = {
  employed: 1,
  selfEmployed: 2,
  retired: 3,
  others: 4
};

// 學歷
export const educationLevelOptions = () => [
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.a"), value: 1 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.b"), value: 2 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.c"), value: 3 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.d"), value: 4 },
];


// 职业类型选项
export const professionCodeOptions = () => [
  {
    value: professionCodeValue.employed,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.employed"),
  },
  {
    value: professionCodeValue.selfEmployed,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.selfEmployed"),
  },
  {
    value: professionCodeValue.retired,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.retired"),
  },
  {
    value: professionCodeValue.others,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.others"),
  },
];


// 职位级别
export const jobPositionOptions = () => [
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.c"), value: 1 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.b"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.a"), value: 3 }
];



// 住址地址单选
export const homeRadioOptions = () => [
  {
    value: radioListValue.cn,
    text: getStepI18nValue("infoContact", "contact.radioOptions.cn"),
  },
  {
    value: radioListValue.hk,
    text: getStepI18nValue("infoContact", "contact.radioOptions.hk"),
  },
  {
    value: radioListValue.oth,
    text: getStepI18nValue("infoContact", "contact.radioOptions.oth"),
  },
  // { text: '同身份证地址', value: 4 }
];

// 住址地址单选
export const contactRadioOptions = () => [
  {
    value: radioListValue.cn,
    text: getStepI18nValue("infoContact", "contact.radioOptions.cn"),
  },
  {
    value: radioListValue.hk,
    text: getStepI18nValue("infoContact", "contact.radioOptions.hk"),
  },
  {
    value: radioListValue.oth,
    text: getStepI18nValue("infoContact", "contact.radioOptions.oth"),
  },
  // { text: '同公司地址', value: 4 },
  {
    value: radioListValue.home,
    text: getStepI18nValue("infoContact", "contact.radioOptions.home"),
  },
];

// 從業年限
export const workingSeniorityOptions = () => [
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.a"), value: 1 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.b"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.c"), value: 3 }
];