import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

import main from './main';

export default {
  iopenExt: {
    main,
    openMargin: {
      isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保证金客户。`,
      withMarginName: '姓名',
      withMarginAccount: '账号',

      isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保证金账户的实际拥有人或担保人`,
      otherBOorPGAccountName: '账户名称',
      otherBOorPGAccountNumber: '账户号码',
      
      isNotConsortWithOtherMargin: `本人及本人的配偶没有${customizeI18n.customize.company.securityFullName}任何保证金客户中控制其百分之三十五或以上股权或表决权。`,
      withOtherMarginName: '姓名',
      withOtherMarginAccount: '账号',

    }
  }
};
