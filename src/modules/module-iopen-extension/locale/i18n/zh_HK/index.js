import customizeI18n from "@/customize/locale/i18n/zh_HK";
import commonI18n from "@/main/locale/i18n/zh_HK";

import main from "./main";

export default {
  iopenExt: {
    main,
    nextBtn: "下一步",
    openMargin: {
      isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保證金客戶。`,
      withMarginName: "姓名",
      withMarginAccount: "帳號",

      isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保證金帳戶的實際擁有人或擔保人`,
      otherBOorPGAccountName: "帳戶名稱",
      otherBOorPGAccountNumber: "帳戶號碼",
      isNotConsortWithOtherMargin: `本人及本人的配偶沒有${customizeI18n.customize.company.securityFullName}任何保證金客戶中控制其百分之三十五或以上股權或表決權。`,
      withOtherMarginName: "姓名",
      withOtherMarginAccount: "帳號",

      adjectiveAuth: `當升級為保證金（融資）帳戶後，${customizeI18n.customize.company.securityFullName}有權隨時運用本人的保證金（融資）帳戶內之證券，可進行抵押或其他處置。本人明白常設授權續期通知書將於常設授權屆滿前最少十四（14）天寄予本人。如${customizeI18n.customize.company.securityFullName}於常設授權有效期屆滿前未有接獲本人等書面反對，則本人之常設授權會在屆滿時按照常設授權的條款及細則視作為同意續期十二（12）個月。`,

      inputPlaceholder: "請輸入",

      declareTitle: "客戶聲明",

      isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶之配偶提供線上開戶業務。`,
      isNotBOorPGAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶實際擁有人或者擔保人提供線上開戶業務。`,
      isNotConsortWithOtherMarginAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶中控制其百分之三十五或以上股權或表決權之人士及其配偶提供線上開戶業務。`,
      adjectiveAuthAlert: `${customizeI18n.customize.company.securityName}要求簽署常設授權協議。`,
    },
    risk: {
      playMediaBtn: "開始播放風險披露錄音",
      media: {
        repNameLabel: "持牌代表：",
        repCodeLabel: "中央編號：",
      },
      desc: {
        title: "溫馨提示",
        content: [
          "1. 點擊開始後，將播放風險披露錄音並展示風險披露聲明",
          "2. 如若環境不便，請戴耳機進行收聽",
        ],
      },
      agreement: {
        linkStart: "本人已詳細閱讀並同意上述聲明",
        linkContent: `《${customizeI18n.customize.company.securityName}客戶協議書》`,
        linkEnd: "",
        dialogTitle: "客戶協議書",
        dialogBtn: "已閱讀並同意",
      },
      agreement: {
        linkStart: "本人已詳細閱讀並同意上述聲明",
        linkContent: `《${customizeI18n.customize.company.securityName}客戶協議書》`,
        linkEnd: "",
        dialogTitle: "客戶協議書",
        dialogBtn: "已閱讀並同意",
      },
    },
    common: {
      nextBtn: '下一步'
    }
  },
};
