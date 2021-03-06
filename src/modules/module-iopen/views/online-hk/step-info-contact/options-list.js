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
  selfEmployed: 1,
  employed: 2,
  retired: 3,
  housewife: 4,
  student: 5,
  umemployed: 6,
  other: 7
};

// 學歷
export const educationLevelOptions = () => [
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.primary"), value: 1 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.secondary"), value: 2 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.diploma"), value: 3 },
  { text: getStepI18nValue("infoContact", "contact.educationLevel.options.universtyOrAbove"), value: 4 },
];

// 婚姻状况
export const maritalStatusOptions = () => [
  { text: getStepI18nValue("infoContact", "contact.maritalStatus.options.single"), value: 1 },
  { text: getStepI18nValue("infoContact", "contact.maritalStatus.options.married"), value: 2 },
  { text: getStepI18nValue("infoContact", "contact.maritalStatus.options.divorced"), value: 3 },
  { text: getStepI18nValue("infoContact", "contact.maritalStatus.options.widowed"), value: 4 },
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
  }
];


// 职位级别
export const jobPositionOptions = () => [
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.topManagement"), value: 3 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.middleManagement"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.jobPosition.options.generalStaff"), value: 1 }
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
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.ltOne"), value: 4 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.oneToFive"), value: 1 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.fiveToTen"), value: 2 },
  { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.mtTen"), value: 3 }
];
// 從業年限
// export const workingSeniorityOptions = () => [
//   { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.ltOne"), value: 1 },
//   { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.oneToFive"), value: 2 },
//   { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.fiveToTen"), value: 3 },
//   { text: getStepI18nValue("infoContact", "profession.workingSeniority.options.mtTen"), value: 4 }
// ];

// 收取节点及书信方式
export const dStatementReceiveModeOptions = () => [
  { text: getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.email"), value: 1 },
  { text: getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.residentalAddress"), value: 2 },
  { text: getStepI18nValue("infoContact", "contact.dStatementReceiveMode.options.correspondenceAddress"), value: 3 },
]
