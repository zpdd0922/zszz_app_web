import { radioListValue } from '../../views/online-cn/step-info-contact/options-list'
/**
 * 公司地址国家
 * @param {*} args
 */
export const companyRepublicNameFunc = (args) => {
  const { professionCode, areaType, companyOtherCountry } = args;
  if (professionCode === 1 || professionCode === 2) {
    if (areaType === radioListValue.cn) {
      return 0;
    } else if (areaType === radioListValue.hk) {
      return 2;
    } else if (areaType === radioListValue.oth) {
      return companyOtherCountry;
    }
  }
  return '';
};

/**
 * 住宅地址国家
 * @param {*} args
 */
export const familyRepublicNameFunc = (args) => {
  const { homeRadio, homeOtherCountry } = args;
  if (homeRadio === radioListValue.cn) {
    return 0;
  } else if (homeRadio === radioListValue.hk) {
    return 2;
  } else if (homeRadio === radioListValue.oth) {
    return homeOtherCountry;
  }
  return '';
};

/**
 * 通讯地址
 * @param {*} args
 */
export const contactRepublicNameFunc = (args) => {
  const { contactRadio, contactOhterCountry } = args;
  if (contactRadio === radioListValue.cn) {
    return 0;
  } else if (contactRadio === radioListValue.hk) {
    return 2;
  } else if (contactRadio === radioListValue.oth) {
    return contactOhterCountry;
  } else if (contactRadio === radioListValue.company) {
    return companyRepublicNameFunc(args);
  } else if (contactRadio === radioListValue.home) {
    return familyRepublicNameFunc(args);
  }
  return '';
};
