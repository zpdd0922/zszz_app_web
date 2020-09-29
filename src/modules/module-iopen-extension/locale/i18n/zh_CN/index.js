import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

import main from './main';

export default {
  iopenExt: {
    main,
    nextBtn: '下一步',
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

      adjectiveAuth: `当升级为保证金（融资）账户后，${customizeI18n.customize.company.securityFullName}有权随时运用本人的保证金（融资）账户内之证券，可进行抵押或其他处置。本人明白常设授权续期通知书将于常设授权届满前最少十四（14）天寄予本人。如${customizeI18n.customize.company.securityFullName}于常设授权有效期届满前未有接获本人等书面反对，则本人之常设授权会在届满时按照常设授权的条款及细则视作为同意续期十二（12）个月。`,

      inputPlaceholder: '请输入',

      declareTitle: '客户声明',

      isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户之配偶提供线上开户业务。`,
      isNotBOorPGAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户实际拥有人或者担保人提供线上开户业务。`,
      isNotConsortWithOtherMarginAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户中控制其百分之三十五或以上股权或表决权之人士及其配偶提供线上开户业务。`,
      adjectiveAuthAlert: `${customizeI18n.customize.company.securityName}要求签署常设授权协议。`,


    },
    risk: {
      playMediaBtn: '开始播放风险披露录音',
      media: {
          repNameLabel: '持牌代表：',
          repCodeLabel: '中央编号：',
      },
      desc: {
          title: '温馨提示',
          content: [
              '1. 点击开始后，将播放风险披露录音并展示风险披露声明',
              '2. 如若环境不便，请戴耳机进行收听'
          ]
      },
      agreement: {
          linkStart: '本人已详细阅读并同意上述声明',
          linkContent: `《${customizeI18n.customize.company.securityName}客户协议书》`,
          linkEnd: '',
          dialogTitle: '客户协议书',
          dialogBtn: '已阅读并同意'
      },
      agreement: {
        linkStart: '本人已详细阅读并同意上述声明',
        linkContent: `《${customizeI18n.customize.company.securityName}客户协议书》`,
        linkEnd: '',
        dialogTitle: '客户协议书',
        dialogBtn: '已阅读并同意',
      }
    },
    common: {
      nextBtn: '下一步'
    }
  }
};
