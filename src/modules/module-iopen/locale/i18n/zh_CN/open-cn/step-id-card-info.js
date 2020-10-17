import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

export default {
  pageName: "基本信息",
  tips: "请确认您的身份信息，若有误请手动修改",
  name: {
    label: "中文姓名",
    familyNameLabel: "姓",
    givenNameLabel: "名",
    familyNamePlaceholder: "请输入中文姓",
    givenNamePlaceholder: "请输入中文名",
  },
  nameSpell: {
    label: "姓名拼音",
    familyNameLabel: "姓",
    givenNameLabel: "名",
    familyNamePlaceholder: "请输入拼音姓",
    givenNamePlaceholder: "请输入拼音名",
  },
  // nationality: {
  //     label: '国籍',
  //     placeholder: '请输入民族'
  // },
  nation: {
    label: "民族",
    placeholder: "请输入民族",
  },
  idCardValue: {
    label: "身份证号",
    placeholder: "请输入身份证号",
  },
  addressValue: {
    label: "证件地址",
    placeholder: "请输入身份证地址",
  },
  dateStartValue: {
    label: "有效期限",
    startPlaceholder: "起始日期",
    endPlaceholder: "结束日期",
    endForerver: "长期",
    edfFoerverTips: "为确保您资料的准确性，请确认您的身份证是否为长期身份证！",
  },
  authority: {
    label: "签发机关",
    placeholder: "请输入签发机关",
  },
  birthCountry: {
    label: "出生国家",
    placeholder: "请选择",
  },
  birthCountryTxt: {
    label: "出生国家",
    placeholder: "请输入",
  },
  birthArea: {
    label: "出生地区",
    placeholder: "选填",
  },
  warn: {
    warm: "温馨提示",
    wrongNum: "请输入正确身份证号码",
    mt70: "70岁以上暂不能开户，非常抱歉",
    address: '请输入正确的证件地址',
    authority: '请输入正确的签发机关',
    realIdCardInfo: '身份信息校验不通过',
  },
  longerConfirm: '为确保您资料的准确性，请确认您的身份证是否为长期身份证！',
};
