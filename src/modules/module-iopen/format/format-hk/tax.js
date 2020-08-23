import { toDBC } from '@/main/utils/format/formatter';

/**
 * 拼装个人税务列表
 * @param {object} args
 */
export const taxInformation = (args) => {
  const { infoCardCount, defaultPrivacyNum, idKindKey, defaultCountryCn, defaultCountryHk, defaultCountryOther } = args;
  const num = Number(infoCardCount);
  let array = [];

  if (idKindKey === 'idCardCn') {
    array.push({
      taxCountry: toDBC(defaultCountryCn), taxNumber: toDBC(defaultPrivacyNum), hasTaxNumber: 1
    });
  }
  if (idKindKey === 'idCardHk' || idKindKey === 'idCardHkTemp') {
    array.push({
      taxCountry: toDBC(defaultCountryHk), taxNumber: toDBC(defaultPrivacyNum), hasTaxNumber: 1
    });
  }
  if (idKindKey === 'passport') {
    array.push({
      taxCountry: toDBC(defaultCountryOther), taxNumber: toDBC(defaultPrivacyNum), hasTaxNumber: 1
    });
  }

  for (let i = 1; i <= num; i++) {
    array.push({
      taxCountry: toDBC(args[`country${i}`]),
      taxNumber: toDBC(args[`canPrivacyNum${i}`]),
      hasTaxNumber: args[`offerPrivacy${i}`] === 'can' ? 1 : 0,
      reasonType: args[`noOfferPrivacy${i}`],
      reasonDesc: toDBC(args[`reasonDesc${i}`])
    });
  }
  return array;
};
