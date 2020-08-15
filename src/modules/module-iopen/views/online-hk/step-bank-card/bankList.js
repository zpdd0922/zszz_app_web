import { getStepI18nValue } from '../mixins/online-tools';

export const bankValue = {
  HSBCHK: 'HSBCHK',
  SCHK: 'SCHK',
  HSHK: 'HSHK',
  CMBWLB: 'CMBWLB',
  BOCHK: 'BOCHK',
  ICBCASIA: 'ICBCASIA',
  CMBHK: 'CMBHK',
  CMBCHK: 'CMBCHK',
  OTHERS: 'OTHERS',
};

// 银行列表
export const bankOptions = () => [
  { value: bankValue.HSBCHK, text: getStepI18nValue("bankCard", "bankId.options.HSBCHK") },
  { value: bankValue.SCHK, text: getStepI18nValue("bankCard", "bankId.options.SCHK") },
  { value: bankValue.HSHK, text: getStepI18nValue("bankCard", "bankId.options.HSHK") },
  { value: bankValue.CMBWLB, text: getStepI18nValue("bankCard", "bankId.options.CMBWLB") },
  { value: bankValue.BOCHK, text: getStepI18nValue("bankCard", "bankId.options.BOCHK") },
  { value: bankValue.ICBCASIA, text: getStepI18nValue("bankCard", "bankId.options.ICBCASIA") },
  { value: bankValue.CMBHK, text: getStepI18nValue("bankCard", "bankId.options.CMBHK") },
  { value: bankValue.CMBCHK, text: getStepI18nValue("bankCard", "bankId.options.CMBCHK") },
  { value: bankValue.OTHERS, text: getStepI18nValue("bankCard", "bankId.options.OTHERS") }
];