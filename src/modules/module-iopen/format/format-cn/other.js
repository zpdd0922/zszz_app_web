/**
 * 拼接组合其他信息披露
 * @param {object} args
 */

export const disclosureDefine = {
  isAccountOwner: { disclosureCode: '1', disclosureSize: 1, isCanFalse: false, valueKey: 'isAccountOwner', disclosure1Key: 'otherOwnerName', disclosure2Key: 'otherOwnerCardType', disclosure3Key: 'otherOwnerCardNum', disclosure4Key: 'otherOwnerAddress' },
  // isAccountManager: { disclosureCode: '2', disclosureSize: 1, isCanFalse: false, valueKey: 'isAccountManager', disclosure1Key: 'otherManagerName', disclosure2Key: 'otherManagerCardType', disclosure3Key: 'otherManagerCardNum', disclosure4Key: 'otherManagerAddress' },
  // isNotOurStaff: { disclosureCode: '21', disclosureSize: 1, isCanFalse: true, valueKey: 'isNotOurStaff', disclosure1Key: 'ourStaffJob', disclosure2Key: '', disclosure3Key: '', disclosure4Key: '' },
  isNotOurStaffKin: { disclosureCode: '22', disclosureSize: 1, isCanFalse: true, valueKey: 'isNotOurStaffKin', disclosure1Key: 'ourStaffKinName', disclosure2Key: 'ourStaffKinRelation', disclosure3Key: '', disclosure4Key: '' },
  isNotHkexParterStaff: { disclosureCode: '23', disclosureSize: 1, isCanFalse: true, valueKey: 'isNotHkexParterStaff', disclosure1Key: 'hkexParterName', disclosure2Key: 'hkexParterCENo', disclosure3Key: '', disclosure4Key: '' },
  isNotConsortWithMargin: { disclosureCode: '27', disclosureSize: 1, isCanFalse: true, valueKey: 'isNotConsortWithMargin', disclosure1Key: 'withMarginName', disclosure2Key: 'withMarginAccount', disclosure3Key: '', disclosure4Key: '' },
  isNotConsortWithOtherMargin: { disclosureCode: '28', disclosureSize: 1, isCanFalse: true, valueKey: 'isNotConsortWithOtherMargin', disclosure1Key: 'withOtherMarginName', disclosure2Key: 'withOtherMarginAccount', disclosure3Key: '', disclosure4Key: '' },
  // isNotExchangeParter: { disclosureCode: '24', disclosureSize: 0, isCanFalse: true, valueKey: 'isNotExchangeParter', disclosure1Key: 'exchangeParterName', disclosure2Key: 'exchangeParterNation', disclosure3Key: '', disclosure4Key: '' },
  // isNotCompanyController: { disclosureCode: '25', disclosureSize: 5, isCanFalse: true, valueKey: 'isNotCompanyController', disclosure1Key: 'companyControllerName', disclosure2Key: 'companyControllerJob', disclosure3Key: 'companyControllerExchange', disclosure4Key: 'companyControllerCode' },
  isNotUsGreenCardHolder: { disclosureCode: '26', disclosureSize: 0, isCanFalse: false, valueKey: 'isNotUsGreenCardHolder', disclosure1Key: 'usGreenCardCode', disclosure2Key: '', disclosure3Key: '', disclosure4Key: '' },
  isNotBOorPG: { disclosureCode: '29', disclosureSize: 1, isCanFalse: true, valueKey: 'isNorPBOorPG', disclosure1Key: 'otherPOorBGMarginName', disclosure2Key: 'otherPOorBGMarginAccount', disclosure3Key: '', disclosure4Key: '' }
  // isAllowProvidePrivacy: { disclosureCode: '15', disclosureSize: 0, isCanFalse: true, valueKey: 'isAllowProvidePrivacy', disclosure1Key: '', disclosure2Key: '', disclosure3Key: '', disclosure4Key: '' },
};

const formatDislosures = (args, val) => {
  const disclosures = {
    disclosure1: '',
    disclosure2: '',
    disclosure3: '',
    disclosure4: '',
  };

  // 未取消选择/子项目长度为0
  if (args[val.valueKey] || val.disclosureSize === 0) return disclosures;

  // 子项目长度为1，标识字段直接使用
  // TODO:可以循环
  if (val.disclosureSize === 1) {
    disclosures.disclosure1 = args[val.disclosure1Key] || '';
    disclosures.disclosure2 = args[val.disclosure2Key] || '';
    disclosures.disclosure3 = args[val.disclosure3Key] || '';
    disclosures.disclosure4 = args[val.disclosure4Key] || '';
    return disclosures;
  }

  if (val.disclosureSize > 1) {
    for (let i = 1; i <= 4; i++) {
      const key = `disclosure${i}`;
      const argsKeyBase = val[key];
      let disclosureArr = [];
      for (let j = 0; j < val.disclosureSize; j++) {
        const v = args[`${argsKeyBase}${j}`] ? args[`${argsKeyBase}${j}`] : '';
        disclosureArr.push(v);
      }
      disclosures[key] = disclosureArr.filter(val => val).join(',');
    };
    return disclosures;
  }

  return disclosures;
}
export const otherDisclosure = (args) => {
  return Object.values(disclosureDefine).map(val => {
    return {
      disclosureCode: val.disclosureCode,
      disclosureIsTrue: args[val.valueKey] ? 1 : 0,
      ...formatDislosures(args, val)
    };
  });
};
