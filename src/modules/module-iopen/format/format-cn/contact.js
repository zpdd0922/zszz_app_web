import { radioListValue } from '../../views/online-cn/step-info-contact/options-list'

/**
 * 公司地址拆分
 * @param {*} args
 */
export const companyNameSplit = (args, type) => {
  const { areaType, companyCity, companyOtherProvince, companyOtherCity, companyOtherArea } = args;
  if (areaType === 1 || areaType === 2) {
    return companyCity.length ? companyCity[type].text : '';
  } else if (areaType === 3) {
    switch (type) {
      case 0:
        return companyOtherProvince;
      case 1:
        return companyOtherCity;
      case 2:
        return companyOtherArea;
      default:
        return '';
    }
  }
  return '';
};

export const companyPhoneNumber = (args) => {
  const { areaType, companyTelePhone = "" } = args;
  return companyTelePhone.trim();
};



/**
 * 住宅地址拆分
 * @param {object} args
 * @param {number} homeRadio 1 大陆地址 | 2 香港地址 | 3 其他地区
 */
export const familyNameSplit = (args, type) => {
  const {
    homeRadio,
    homeCity,
    homeOtherProvince,
    homeOtherCity,
    homeOtherArea,

  } = args;
  if (homeRadio === radioListValue.cn || homeRadio === radioListValue.hk) {
    return homeCity.length ? homeCity[type].text : '';
  } else if (homeRadio === radioListValue.oth) {
    switch (type) {
      case 0:
        return homeOtherProvince;
      case 1:
        return homeOtherCity;
      case 2:
        return homeOtherArea;
      default:
        return '';
    }
  }
};


export const familyPhone = (args) => {
  const { homeTelePhone = "" } = args;
  return homeTelePhone.trim();
};

/**
 * 通讯地址
 * @param {object} args
 * @param {number} contactRadio 1 大陆地址 | 2 香港地址 | 3 其他地区 | 4 同公司地址 | 5 同住宅地址
 */
export const contactNameSplit = (args, type) => {
  const {
    contactRadio,
    contactCity,
    contactOtherProvince,
    contactOtherCity,
    contactOtherArea,
  } = args;
  if (contactRadio === radioListValue.cn || contactRadio === radioListValue.hk) {
    return contactCity.length ? contactCity[type].text : '';
  } else if (contactRadio === radioListValue.oth) {
    switch (type) {
      case 0:
        return contactOtherProvince;
      case 1:
        return contactOtherCity;
      case 2:
        return contactOtherArea;
      default:
        return '';
    }
  } else if (contactRadio === radioListValue.company) {
    return companyNameSplit(args, type);
  } else if (contactRadio === radioListValue.home) {
    return familyNameSplit(args, type);
  }
};

export const contactPhone = (args) => {
  const {
    contactRadio,
    contactTelePhone = "",
  } = args;
  if (contactRadio === radioListValue.company) {
    return companyPhoneNumber(args);
  } else if (contactRadio === radioListValue.home) {
    return familyPhone(args);
  }
  return contactTelePhone.trim();
};

/**
 * 公司地址
 * @param {object} args
 */
export const companyAddress = (args) => {
  const {
    areaType,
    companyCity,
    companyAddressDetail,
    companyOtherCountryLable,
    companyOtherCity,
    companyOtherCountry,
    otherCompanyRepublic,
    companyOtherProvince,
    companyOtherArea
  } = args;
  let address = '';
  if (areaType === 3) {
    return companyOtherCountry === 'OTH' ? otherCompanyRepublic + companyOtherProvince + companyOtherCity + companyOtherArea + companyAddressDetail : companyOtherCountryLable + companyOtherProvince + companyOtherCity + companyOtherArea + companyAddressDetail;
  }
  if (!companyCity.length) return '';
  // 直辖市判断
  if (companyCity[1].text.includes(companyCity[0].text)) {
    address = `${companyCity[1].text}${companyCity[2].text}`;
  } else {
    // 非直辖市
    companyCity.forEach(val => {
      address += val.text;
    });
  }
  return address + companyAddressDetail;
};

/**
 * 住宅地址
 * @param {object} args
 * @param {number} homeRadio 1 大陆地址 | 2 香港地址 | 3 其他地区 | 4 同身份证地址
 */
export const familyAddress = (args) => {
  const {
    homeRadio,
    homeCity,
    homeAddressDetail,
    homeAddressNumber,
    addressValue,
    homeOtherCountryLabel,
    homeOtherCity,
    homeOtherCountry,
    otherFamilyRepublic,
    homeOtherProvince,
    homeOtherArea
  } = args;
  let address = '';
  switch (homeRadio) {
    case radioListValue.cn:
    case radioListValue.hk:
      // 直辖市判断
      if (homeCity[1].text.includes(homeCity[0].text)) {
        address = `${homeCity[1].text}${homeCity[2].text}`;
      } else {
        // 非直辖市
        homeCity.forEach(val => {
          address += val.text;
        });
      }
      address = address + homeAddressDetail + homeAddressNumber;
      break;
    case radioListValue.oth:
      address = homeOtherCountry === 'OTH' ? otherFamilyRepublic + homeOtherProvince + homeOtherCity + homeOtherArea + homeAddressDetail : homeOtherCountryLabel + homeOtherProvince + homeOtherCity + homeOtherArea + homeAddressDetail;
      break;
    case radioListValue.company:
      address = addressValue;
      break;
  }
  return address;
};

/**
 * 通讯地址
 * @param {object} args
 * @param {number} contactRadio 1 大陆地址 | 2 香港地址 | 3 其他地区 | 4 同公司地址 | 5 同住宅地址
 */
export const contactAddress = (args) => {
  const {
    contactRadio,
    contactCity,
    contactAddressDetail,
    contactAddressNumber,
    contactOhterCountryLable,
    contactOtherCity,
    otherContactRepublic,
    contactOhterCountry,
    contactOtherProvince,
    contactOtherArea
  } = args;
  let address = '';
  switch (contactRadio) {
    case radioListValue.cn:
    case radioListValue.hk:
      // 直辖市判断
      if (contactCity[1].text.includes(contactCity[0].text)) {
        address = `${contactCity[1].text}${contactCity[2].text}`;
      } else {
        // 非直辖市
        contactCity.forEach(val => {
          address += val.text;
        });
      }
      address = address + contactAddressDetail + contactAddressNumber;
      break;
    case radioListValue.oth:
      address = contactOhterCountry === 'OTH' ? otherContactRepublic + contactOtherProvince + contactOtherCity + contactOtherArea + contactAddressDetail : contactOhterCountryLable + contactOtherProvince + contactOtherCity + contactOtherArea + contactAddressDetail;
      break;
    case radioListValue.company:
      address = companyAddress(args);
      break;
    case radioListValue.home:
      address = familyAddress(args);
  }
  return address;
};

/**
 * 联系地址的省份、城市、区域拆分
 * @param {object} args
 * @param {number} idx  0 省份 | 1 城市 | 2 区域
 * 1 省份
 */
export const contactNameType = (args, idx) => {
  const { contactRadio, companyCity, homeCity, contactCity } = args;
  let address = '';
  switch (contactRadio) {
    case radioListValue.cn:
    case radioListValue.hk:
      address = contactCity[idx] && contactCity[idx].text;
      break;
    case radioListValue.company:
      address = companyCity[idx] && companyCity[idx].text;
      break;
    case radioListValue.home:
      address = homeCity[idx] && homeCity[idx].text;
  }
  return address;
};

/**
 * 拆分直辖市 区分香港地区不拆分
 * @param {*} args
 */
export const contactProvinceName = (args) => {
  if (!contactNameType(args, 1)) {
    return '';
  }

  if (contactNameType(args, 1).includes('香港') || !contactNameType(args, 1).includes(contactNameType(args, 0))) {
    return contactNameType(args, 0);
  } else if (contactNameType(args, 1).includes(contactNameType(args, 0))) {
    return '';
  }
};

/**
 * 联系地址的详细地址拆分
 * @param {object} args
 * @param {number} idx  0 省份 | 1 城市 | 3 区域
 *
 */
export const contactDetailType = (args) => {
  const {
    contactRadio,
    companyAddressDetail,
    homeAddressDetail,
    homeAddressNumber,
    contactAddressDetail,
    contactAddressNumber
  } = args;
  let address = '';
  switch (contactRadio) {
    case radioListValue.cn:
    case radioListValue.hk:
    case radioListValue.oth:
      address = contactAddressDetail + contactAddressNumber;
      break;
    case radioListValue.company:
      address = companyAddressDetail;
      break;
    case radioListValue.home:
      address = homeAddressDetail + homeAddressNumber;
      break;
  }
  return address;
};

/**
 * 公司地址的国家(其它填写内容)
 */
export const otherCompanyRepublic = (args) => {
  const { areaType, companyOtherCountry, otherCompanyRepublic } = args;
  if (areaType === 3 && companyOtherCountry === 'OTH') {
    return otherCompanyRepublic;
  }
  return '';
};

/**
 * 住宅地址的国家(其它填写内容)
 * @param {*} args
 */
export const otherFamilyRepublic = (args) => {
  const { homeRadio, homeOtherCountry, otherFamilyRepublic } = args;
  if (homeRadio === radioListValue.oth && homeOtherCountry === 'OTH') {
    return otherFamilyRepublic;
  }
  return '';
};

/**
 * 联系地址的国家(其它填写内容)
 * @param {*} args
 */
export const otherContactRepublic = (args) => {
  const { contactRadio, contactOhterCountry, otherContactRepublic, companyOtherCountry, homeOtherCountry } = args;
  if (contactRadio === radioListValue.oth && contactOhterCountry === 'OTH') {
    return otherContactRepublic;
  }

  if (contactRadio === radioListValue.company && companyOtherCountry === 'OTH') {
    return otherCompanyRepublic(args);
  }

  if (contactRadio === radioListValue.home && homeOtherCountry === 'OTH') {
    return otherFamilyRepublic(args);
  }
  return '';
};

/**
 * 资金来源
 * @param {object} args
 * 1 受雇 | 2 自营/个体户 3 | 退休 4 8 10 学生 | 6 农林牧副渔
 */
export const capitalSource = (args) => {
  const {
    professionCode,
    byEmployerCapital,
    employerCapital,
    studentCapital,
    agricultureCapital,
    retireCapital
  } = args;
  let result = [];

  switch (professionCode) {
    case 1:
      result = byEmployerCapital;
      break;
    case 2:
      result = employerCapital;
      break;
    case 3:
    case 4:
    case 5:
      result = studentCapital;
      break;
    case 6:
      result = agricultureCapital;
      break;
    case 7:
      result = retireCapital;
      break;
    default:
      result = byEmployerCapital;
  }
  return JSON.parse(JSON.stringify(result)).sort((a, b) => a - b);
};

/**
 * 财产种类
 * @param {object} args
 */
export const propertyType = (args) => {
  const validArray = [
    { key: 'totalAssetsCheck', valueKey: 'totalAssets', type: 0 },
    // { key: 'realCheck', valueKey: 'realValue', type: 1 }
  ];
  let dataArray = [];
  validArray.forEach((val, idx) => {
  if (args[val.key]) {
      dataArray.push({ propertyType: val.type, propertyAmount: args[val.valueKey] });
    }
  });
  return dataArray;
};

/**
 * 资金来源（新）
 * @param {object} args
 * 1 受雇 | 2 自营/个体户 3 | 退休 4 8 10 学生 | 6 农林牧副渔
 */
export const capitalSourceNew = (args) => {
  let result = args.capital;

  return JSON.parse(JSON.stringify(result)).sort((a, b) => a - b);
};

/**
 * 财产种类-净资产（新）
 * @param {object} args
 */
export const propertyTypeNew = (args) => {
  let dataArray = [];
  dataArray.push({ propertyType: 0, propertyAmount: args.assets });
  return dataArray;
};
