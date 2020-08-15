import { toDBC } from '@/main/utils/format/formatter';

/**
 * 拼装个人税务列表
 * @param {object} args
 */
export const taxInformation = (args) => {
  const { infoCardCount, defaultPrivacyNum } = args;
  const num = Number(infoCardCount);
  let array = [
    {
      taxCountry: '中国大陆', taxNumber: toDBC(defaultPrivacyNum), hasTaxNumber: 1
    }
  ];

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
