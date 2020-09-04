import { getStepI18nValue } from '../mixins/online-tools';

export const radioListValue = {
  cn: 1, // 大陆地址
  hk: 2, // 香港地址
  oth: 3, // 其他地区
  idCard: 4, // 同身份证地址
  company: 5, // 同公司地址
  home: 6, // 同现时住址
}
// 职业类型
export const professionCodeValue = {
  selfEmployed: 1,
  employed: 2,
  retired: 3,
  housewife: 4,
  student: 5,
  umemployed: 6,
  other: 'OTH'
};

// 學歷
// export const educationLevelOptions = () => [
//   { text: getStepI18nValue("infoContact", "contact.educationLevel.options.a"), value: 1 },
//   { text: getStepI18nValue("infoContact", "contact.educationLevel.options.b"), value: 2 },
//   { text: getStepI18nValue("infoContact", "contact.educationLevel.options.c"), value: 3 },
//   { text: getStepI18nValue("infoContact", "contact.educationLevel.options.d"), value: 4 },
// ];


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
    value: professionCodeValue.housewife,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.housewife"),
  },
  {
    value: professionCodeValue.student,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.student"),
  },
  {
    value: professionCodeValue.umemployed,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.umemployed"),
  },
  {
    value: professionCodeValue.other,
    text: getStepI18nValue("infoContact", "profession.professionCode.options.other"),
  },
];


// 职位级别
export const jobPositionOptions = () => [
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.topManagement"), value: 1 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.middleManagement"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.generalStaff"), value: 3 }
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
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.ltFive"), value: 1 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.fiveToTen"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.mtTen"), value: 3 }
];


// 收取节点及书信方式
export const dStatementReceiveModeOptions = () => [
  { text:  getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.email"), value: 1},
  { text:  getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.residentalAddress"), value: 2},
  { text:  getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.correspondenceAddress"), value: 3},
]